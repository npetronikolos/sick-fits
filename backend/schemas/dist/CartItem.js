"use strict";
exports.__esModule = true;
exports.CartItem = void 0;
var fields_1 = require("@keystone-next/fields");
var schema_1 = require("@keystone-next/keystone/schema");
var access_1 = require("../access");
exports.CartItem = schema_1.list({
    access: {
        create: access_1.isSignedIn,
        read: access_1.rules.canOrder,
        update: access_1.rules.canOrder,
        "delete": access_1.rules.canOrder
    },
    ui: {
        listView: {
            initialColumns: ["product", "quantity", "user"]
        }
    },
    fields: {
        // TODO: Custom Label in here
        quantity: fields_1.integer({
            defaultValue: 1,
            isRequired: true
        }),
        product: fields_1.relationship({ ref: "Product", isFilterable: true }),
        user: fields_1.relationship({ ref: "User.cart", isFilterable: true })
    }
});
