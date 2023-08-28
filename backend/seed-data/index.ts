import { Keystone, KeystoneContext } from "@keystone-6/core";
import { getContext } from "@keystone-6/core/context";
import { products } from "./data";
import config from "../keystone";
import type { PrismaClient } from "@prisma/client";

export async function insertSeedData() {
  const context = getContext(config, {
    prisma: new PrismaClient(),
  });

  console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
  for (const product of products) {
    console.log(`  🛍️ Adding Product: ${product.name}`);
    const { id } = await context.prisma.productImage.create({
      data: {
        image: JSON.stringify(product.photo),
        altText: product.description,
      },
    });
    delete (product as any).photo;
    (product as any).photoId = id;
    await context.prisma.product.create({ data: product });
  }
  console.log(`✅ Seed Data Inserted: ${products.length} Products`);
  console.log(
    `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
  );
  process.exit();
}

// import { getContext } from "@keystone-6/core/context";
// import { products } from "./data";
// import config from "../keystone";
// import * as PrismaModule from "@prisma/client";

// export async function insertSeedData() {
//   const context = getContext(config, PrismaModule);

//   console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
//   for (const product of products) {
//     console.log(`  🛍️ Adding Product: ${product.name}`);
//     const { id } = await context.db.ProductImage.createOne({
//       data: {
//         image: JSON.stringify(product.photo),
//         altText: product.description,
//       },
//     });
//     delete product.photo;
//     product.photoId = id;
//     await context.db.Product.createOne({ data: product });
//   }
//   console.log(`✅ Seed Data Inserted: ${products.length} Products`);
//   console.log(
//     `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
//   );
//   process.exit();
// }

// import { KeystoneContext } from "@keystone-6/core/types";
// import { getContext } from "@keystone-6/core/context";
// import "dotenv/config";
// import { products } from "./data";
// import config from "../keystone";
// import * as PrismaModule from "@prisma/client";

// // export async function insertSeedData({ prisma }: KeystoneContext) {
// export async function insertSeedData() {
//   const context = getContext(config, PrismaModule);

//   console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
//   for (const product of products) {
//     console.log(`  🛍️ Adding Product: ${product.name}`);
//     const { id } = await context.db.ProductImage.createOne({
//       data: {
//         image: JSON.stringify(product.photo),
//         altText: product.description,
//       },
//     });
//     // @ts-ignore
//     delete product.photo;
//     // @ts-ignore
//     product.photoId = id;
//     await context.db.Product.createOne({ data: product });
//   }
//   console.log(`✅ Seed Data Inserted: ${products.length} Products`);
//   console.log(
//     `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
//   );
//   process.exit();
// }

// import { Keystone, KeystoneContext } from "@keystone-6/core";
// import { createSchema } from "./schema";
// import { products } from "./data";

// async function insertSeedData(context: KeystoneContext) {
//   const { prisma } = context;
//   console.log(`🌱 Inserting Seed Data: ${products.length} Products`);
//   for (const product of products) {
//     console.log(`  🛍️ Adding Product: ${product.name}`);
//     const { id } = await prisma.productImage.create({
//       data: {
//         image: JSON.stringify(product.photo),
//         altText: product.description,
//       },
//     });
//     delete (product as any).photo;
//     (product as any).photoId = id;
//     await prisma.product.create({ data: product });
//   }
//   console.log(`✅ Seed Data Inserted: ${products.length} Products`);
//   console.log(
//     `👋 Please start the process with \`yarn dev\` or \`npm run dev\``
//   );
//   process.exit();
// }

// const keystone = new Keystone({
//   adapter: //...,
//   schema: createSchema(),
// });

// async function createTables() {
//   console.log("🚀 Creating database tables...");
//   await keystone.connect();
//   await keystone.createDatabase();
//   await keystone.createTable();
//   await keystone.disconnect();
//   console.log("✅ Tables created");
// }

// createTables()
//   .then(() => insertSeedData(keystone.createContext()))
//   .catch((error) => console.error(error));
