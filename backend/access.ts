import { Permission, permissionsList } from "./schemas/fields";
import { ListAccessArgs } from "./types";

// At its simplest, the access control returns a boolean value depending on whether the user is signed in
export function isSignedIn({ session }: ListAccessArgs): boolean {
  return !!session;
}

// Generate permissions for each item in `permissionsList` array
const generatedPermissions = Object.fromEntries(
  permissionsList.map((permission) => [
    permission,
    function ({ session }: ListAccessArgs): boolean {
      return !!session?.data.role?.[permission];
    },
  ])
) as Record<Permission, ({ session }: ListAccessArgs) => boolean>;

// Permissions check if someone meets a criteria - yes or no.
export const permissions = {
  ...generatedPermissions,
};

// Rule-based function
// Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
export const rules = {
  canManageProducts({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageProducts?
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: { equals: session?.itemId } } };
  },
  canOrder({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageCart?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: { equals: session?.itemId } } };
  },
  canReadCart({ session }: ListAccessArgs) {
    // 1. Do they have the permission of canManageCart?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { user: { id: { equals: session?.itemId } } };
  },
  canManageOrderItems({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageCart?
    if (permissions.canManageCart({ session })) {
      return true;
    }
    // 2. If not, do they own this item?
    return { order: { user: { id: { equals: session?.itemId } } } };
  },
  canReadProducts({ session }: ListAccessArgs) {
    // 1. If not signed in, can only read available products
    if (!isSignedIn({ session })) {
      return { status: { equals: "AVAILABLE" } };
    }
    // 2. If signed in and can manage products, can read everything
    if (permissions.canManageProducts({ session })) {
      return true;
    }
    // 3. If signed in and can't manage products, can only read available products
    return { status: { equals: "AVAILABLE" } };
  },
  canManageUsers({ session }: ListAccessArgs) {
    if (!isSignedIn({ session })) {
      return false;
    }
    // 1. Do they have the permission of canManageUsers?
    if (permissions.canManageUsers({ session })) {
      return true;
    }
    // 2. If not, can only update themselves
    return { id: { equals: session?.itemId } };
  },
};

// /* eslint-disable */
// import { Permission, permissionsList } from "./schemas/fields";
// import { ListAccessArgs } from "./types";
// // At it's simplest, the access control returns a yes or no value depending on the users session

// export function isSignedIn({ session }: ListAccessArgs) {
//   return !!session;
// }

// // export const isSignedIn = ({ session }: ListAccessArgs): boolean => {
// //   return !!session;
// // };

// const generatedPermissions = Object.fromEntries(
//   permissionsList.map((permission) => [
//     permission,
//     function ({ session }: ListAccessArgs) {
//       return !!session?.data.role?.[permission];
//     },
//   ])
// ) as Record<Permission, ({ session }: ListAccessArgs) => boolean>;

// // Permissions check if someone meets a criteria - yes or no.
// export const permissions = {
//   ...generatedPermissions,
//   // isAwesome({ session }: ListAccessArgs): boolean {
//   //   return !!session?.data.role?.includes("Nikos");
//   // },
// };

// // Rule based function
// // Rules can return a boolean - yes or no - or a filter which limits which products they can CRUD.
// export const rules = {
//   canManageProducts({ session }: ListAccessArgs) {
//     if (!isSignedIn({ session })) {
//       return false;
//     }
//     // 1. Do they have the permission of canManageProducts
//     if (permissions.canManageProducts({ session })) {
//       return true;
//     }
//     // 2. If not, do they own this item?
//     return { user: { id: { equals: session?.itemId } } };
//   },
//   canOrder({ session }: ListAccessArgs) {
//     if (!isSignedIn({ session })) {
//       return false;
//     }
//     // 1. Do they have the permission of canManageProducts
//     if (permissions.canManageCart({ session })) {
//       return true;
//     }
//     // 2. If not, do they own this item?
//     return { user: { id: { equals: session?.itemId } } };
//   },
//   canReadCart({ session }: ListAccessArgs) {
//     // 1. Do they have the permission of canManageProducts
//     if (permissions.canManageCart({ session })) {
//       return true;
//     }
//     // 2. If not, do they own this item?
//     return { user: { id: { equals: session?.itemId } } };
//   },
//   canManageOrderItems({ session }: ListAccessArgs) {
//     if (!isSignedIn({ session })) {
//       return false;
//     }
//     // 1. Do they have the permission of canManageProducts
//     if (permissions.canManageCart({ session })) {
//       return true;
//     }
//     // 2. If not, do they own this item?
//     return { order: { user: { id: { equals: session?.itemId } } } };
//   },
//   canReadProducts({ session }: ListAccessArgs) {
//     if (!isSignedIn({ session })) {
//       return true;
//     }
//     if (permissions.canManageProducts({ session })) {
//       return true; // They can read everything!
//     }
//     // They should only see available products (based on the status field)
//     return { status: { equals: "AVAILABLE" } };
//   },
//   canManageUsers({ session }: ListAccessArgs) {
//     if (!isSignedIn({ session })) {
//       return false;
//     }
//     if (permissions.canManageUsers({ session })) {
//       return true;
//     }
//     // Otherwise they may only update themselves!
//     return { id: { equals: session?.itemId } };
//   },
// };
