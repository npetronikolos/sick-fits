import { relationship, text } from "@keystone-6/core/fields";
import { list } from "@keystone-6/core";
import { allOperations } from "@keystone-6/core/access";
import { permissions, rules, isSignedIn } from "../access";
import { permissionFields } from "./fields";

export const Role = list({
  access: {
    operation: {
      // create: isSignedIn,
      // query: isSignedIn,
      // update: isSignedIn,
      // delete: isSignedIn,
      create: permissions.canManageRoles,
      query: permissions.canManageRoles,
      update: permissions.canManageRoles,
      delete: permissions.canManageRoles,
    },
  },
  ui: {
    hideCreate: (args) => !permissions.canManageRoles(args),
    hideDelete: (args) => !permissions.canManageRoles(args),
    isHidden: (args) => !permissions.canManageRoles(args),
  },
  fields: {
    name: text({ validation: { isRequired: true } }),
    ...permissionFields,
    assignedTo: relationship({
      ref: "User.role", // TODO: Add this to the User
      many: true,
      ui: {
        itemView: { fieldMode: "read" },
      },
    }),
  },
});
