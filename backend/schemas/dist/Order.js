"use strict";
exports.__esModule = true;
exports.Order = void 0;
var fields_1 = require("@keystone-next/fields");
var schema_1 = require("@keystone-next/keystone/schema");
var types_1 = require("@keystone-next/keystone/types");
var access_1 = require("../access");
var formatMoney_1 = require("../lib/formatMoney");
exports.Order = schema_1.list({
    access: {
        create: access_1.isSignedIn,
        read: access_1.rules.canOrder,
        update: function () { return false; },
        "delete": function () { return false; }
    },
    fields: {
        label: fields_1.virtual({
            field: types_1.graphql.field({
                type: types_1.graphql.String,
                resolve: function (item) {
                    return "" + formatMoney_1["default"](item.total);
                }
            })
        }),
        total: fields_1.integer(),
        items: fields_1.relationship({ ref: "OrderItem.order", many: true }),
        user: fields_1.relationship({ ref: "User.orders" }),
        charge: fields_1.text()
    }
});
