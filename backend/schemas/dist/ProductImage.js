"use strict";
exports.__esModule = true;
exports.ProductImage = exports.cloudinary = void 0;
require("dotenv/config");
var fields_1 = require("@keystone-next/fields");
var schema_1 = require("@keystone-next/keystone/schema");
var cloudinary_1 = require("@keystone-next/cloudinary");
var access_1 = require("../access");
exports.cloudinary = {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || "fake",
    apiKey: process.env.CLOUDINARY_KEY || "fake",
    apiSecret: process.env.CLOUDINARY_SECRET || "fake",
    folder: "sickfits"
};
exports.ProductImage = schema_1.list({
    access: {
        create: access_1.isSignedIn,
        read: function () { return true; },
        update: access_1.permissions.canManageProducts,
        "delete": access_1.permissions.canManageProducts
    },
    fields: {
        image: cloudinary_1.cloudinaryImage({
            cloudinary: exports.cloudinary,
            label: "Source"
        }),
        altText: fields_1.text(),
        product: fields_1.relationship({ ref: "Product.photo" })
    },
    ui: {
        listView: {
            initialColumns: ["image", "altText", "product"]
        }
    }
});
