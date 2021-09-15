"use strict";
exports.__esModule = true;
exports.Product = void 0;
var fields_1 = require("@keystone-next/fields");
var schema_1 = require("@keystone-next/keystone/schema");
var access_1 = require("../access");
exports.Product = schema_1.list({
    access: {
        create: access_1.isSignedIn,
        read: access_1.rules.canReadProducts,
        update: access_1.rules.canManageProducts,
        "delete": access_1.rules.canManageProducts
    },
    fields: {
        name: fields_1.text({ isRequired: true }),
        description: fields_1.text({
            ui: {
                displayMode: "textarea"
            }
        }),
        photo: fields_1.relationship({
            ref: "ProductImage.product",
            ui: {
                displayMode: "cards",
                cardFields: ["image", "altText"],
                inlineCreate: { fields: ["image", "altText"] },
                inlineEdit: { fields: ["image", "altText"] }
            }
        }),
        status: fields_1.select({
            options: [
                { label: "Draft", value: "DRAFT" },
                { label: "Available", value: "AVAILABLE" },
                { label: "Unavailable", value: "UNAVAILABLE" },
            ],
            defaultValue: "DRAFT",
            ui: {
                displayMode: "segmented-control",
                createView: { fieldMode: "hidden" }
            }
        }),
        price: fields_1.integer(),
        user: fields_1.relationship({
            ref: "User.products",
            defaultValue: function (_a) {
                var _b, _c;
                var context = _a.context;
                return ((_b = context.session) === null || _b === void 0 ? void 0 : _b.itemId) ? { connect: { id: (_c = context.session) === null || _c === void 0 ? void 0 : _c.itemId } }
                    : null;
            }
        })
    }
});
