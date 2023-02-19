/* eslint-disable */
import { createAuth } from "@keystone-6/auth";
import { config } from "@keystone-6/core";
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
import { TypeInfo } from ".keystone/types";

const databaseURL = process.env.DATABASE_URL;
const frontEndURL = process.env.FRONTEND_URL;
const cookieSecret = process.env.COOKIE_SECRET;

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // How long they stay signed in?
  secret: cookieSecret || "this secret should only be used in testing",
};

// createAuth configures sign in functionality based on the config below. Note this only implements
// authentication, i.e signing in as an item using identity and secret fields in a list. Session
// management and access control are controlled independently in the main keystone config.
const { withAuth } = createAuth({
  // This is the list that contains items people can sign in as
  listKey: "User",
  // The identity field is typically a username or email address
  identityField: "email",
  // The secret field must be a password type field
  secretField: "password",

  // initFirstItem turns on the "First User" experience, which prompts you to create a new user
  // when there are no items in the list yet
  initFirstItem: {
    fields: ["name", "email", "password"],
    // TODO: Add in initial roles here
    itemData: {
      /*
        This creates a related role with full permissions, so that when the first user signs in
        they have complete access to the system (without this, you couldn't do anything)
      */
      role: {
        create: {
          name: "Admin Role",
          canManageProducts: true,
          canOrder: true,
          canManageOrderItems: true,
          canManageCart: true,
          canReadProducts: true,
          canManageUsers: true,
        },
      },
    },
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
  config<TypeInfo>({
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
    // removed by keystone
    // ui: {
    //   // Show the UI only for people who pass this test
    //   isAccessAllowed: ({ session }) => !!session,
    // },
    session: statelessSessions(sessionConfig),
  })
);
