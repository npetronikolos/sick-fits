import { createAuth } from "@keystone-6/auth";
import { config } from "@keystone-6/core";
import dotenv from "dotenv";
import { statelessSessions } from "@keystone-6/core/session";
import { permissionsList } from "./schemas/fields";
import { Role } from "./schemas/Role";
import { OrderItem } from "./schemas/OrderItem";
import { Order } from "./schemas/Order";
import { CartItem } from "./schemas/CartItem";
import { ProductImage } from "./schemas/ProductImage";
import { Product } from "./schemas/Product";
import { User } from "./schemas/User";
import "dotenv/config";
import { insertSeedData } from "./seed-data";
import { sendPasswordResetEmail } from "./lib/mail";
import { extendGraphqlSchema } from "./mutations";

const databaseURL = process.env.DATABASE_URL;
const frontEndURL = process.env.FRONTEND_URL;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret:
    process.env.COOKIE_SECRET || "this secret should only be used in testing",
};

// createAuth configures signin functionality based on the config below. Note this only implements
// authentication, i.e signing in as an item using identity and secret fields in a list. Session
// management and access control are controlled independently in the main keystone config.
const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"],
    // TODO: Add in initial roles here
  },
  passwordResetLink: {
    async sendToken(args) {
      // send the email
      await sendPasswordResetEmail(args.token, args.identity);
    },
  },
  sessionData: `id name email role { ${permissionsList.join(" ")} }`,
});

export default withAuth(
  config({
    server: {
      cors: {
        origin: frontEndURL,
        credentials: true,
      },
      port: 4000,
      healthCheck: true,
    },
    db: databaseURL
      ? {
          provider: "postgresql",
          url: databaseURL,
          async onConnect(context) {
            console.log("Connected to the database!");
            if (process.argv.includes("--seed-data")) {
              await insertSeedData(context);
            }
          },
          // Optional advanced configuration for prisma
          enableLogging: true,
          useMigrations: true,
        }
      : {
          provider: "sqlite",
          url: databaseURL,
          async onConnect(context) {
            console.log("Connected to the database!");
            if (process.argv.includes("--seed-data")) {
              await insertSeedData(context);
            }
          },
        },
    lists: {
      // Schema items go in here
      User,
      Product,
      ProductImage,
      CartItem,
      OrderItem,
      Order,
      Role,
    },
    extendGraphqlSchema,
    ui: {
      // Show the UI only for poeple who pass this test
      isAccessAllowed: ({ session }) => !!session,
    },
    session: statelessSessions(sessionConfig),
  })
);
