"use strict";
exports.__esModule = true;
exports.permissionsList = exports.permissionFields = void 0;
var fields_1 = require("@keystone-next/fields");
exports.permissionFields = {
    canManageProducts: fields_1.checkbox({
        defaultValue: false,
        label: "User can Update and delete any product"
    }),
    canSeeOtherUsers: fields_1.checkbox({
        defaultValue: false,
        label: "User can query other users"
    }),
    canManageUsers: fields_1.checkbox({
        defaultValue: false,
        label: "User can Edit other users"
    }),
    canManageRoles: fields_1.checkbox({
        defaultValue: false,
        label: "User can CRUD roles"
    }),
    canManageCart: fields_1.checkbox({
        defaultValue: false,
        label: "User can see and manage cart and cart items"
    }),
    canManageOrders: fields_1.checkbox({
        defaultValue: false,
        label: "User can see and manage orders"
    })
};
exports.permissionsList = Object.keys(exports.permissionFields);
