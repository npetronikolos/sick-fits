"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.extendGraphqlSchema = void 0;
var keystone_1 = require("@keystone-next/keystone");
var addToCart_1 = require("./addToCart");
var checkout_1 = require("./checkout");
// make a fake graphql tagged template literal
var graphql = String.raw;
exports.extendGraphqlSchema = keystone_1.graphQLSchemaExtension({
    typeDefs: graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    type Mutation {\n      addToCart(productId: ID): CartItem\n      checkout(token: String!): Order\n    }\n  "], ["\n    type Mutation {\n      addToCart(productId: ID): CartItem\n      checkout(token: String!): Order\n    }\n  "]))),
    resolvers: {
        Mutation: {
            addToCart: addToCart_1["default"],
            checkout: checkout_1["default"]
        }
    }
});
var templateObject_1;
