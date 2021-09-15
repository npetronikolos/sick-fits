"use strict";
exports.__esModule = true;
exports.OrderItem = void 0;
var fields_1 = require("@keystone-next/fields");
var schema_1 = require("@keystone-next/keystone/schema");
var access_1 = require("../access");
exports.OrderItem = schema_1.list({
    access: {
        create: access_1.isSignedIn,
        read: access_1.rules.canManageOrderItems,
        update: function () { return false; },
        "delete": function () { return false; }
    },
    fields: {
        name: fields_1.text({ isRequired: true, isOrderable: true }),
        description: fields_1.text({
            ui: {
                displayMode: "textarea"
            }
        }),
        photo: fields_1.relationship({
            ref: "ProductImage",
            ui: {
                displayMode: "cards",
                cardFields: ["image", "altText"],
                inlineCreate: { fields: ["image", "altText"] },
                inlineEdit: { fields: ["image", "altText"] }
            }
        }),
        price: fields_1.integer(),
        quantity: fields_1.integer(),
        order: fields_1.relationship({ ref: "Order.items" })
    }
});
