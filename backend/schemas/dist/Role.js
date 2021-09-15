"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.Role = void 0;
var fields_1 = require("@keystone-next/fields");
var schema_1 = require("@keystone-next/keystone/schema");
var access_1 = require("../access");
var fields_2 = require("./fields");
exports.Role = schema_1.list({
    access: {
        create: access_1.permissions.canManageRoles,
        read: access_1.permissions.canManageRoles,
        update: access_1.permissions.canManageRoles,
        "delete": access_1.permissions.canManageRoles
    },
    ui: {
        hideCreate: function (args) { return !access_1.permissions.canManageRoles(args); },
        hideDelete: function (args) { return !access_1.permissions.canManageRoles(args); },
        isHidden: function (args) { return !access_1.permissions.canManageRoles(args); }
    },
    fields: __assign(__assign({ name: fields_1.text({ isRequired: true }) }, fields_2.permissionFields), { assignedTo: fields_1.relationship({
            ref: "User.role",
            many: true,
            ui: {
                itemView: { fieldMode: "read" }
            }
        }) })
});
