"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var testing_1 = require("@keystone-next/keystone/testing");
var keystone_1 = require("../keystone");
var FAKE_ID = 'cinjfgbkjnfg';
var asUser = function (context, itemId) {
    return context.withSession({ itemId: itemId, data: {} });
};
var runner = testing_1.setupTestRunner({ config: keystone_1["default"] });
describe("Custom mutations", function () {
    describe('checkout(token)', function () {
        var token = 'TOKEN'; // This is not currently used by the mutation
        var query = "mutation m($token: String!){ checkout(token: $token) {\n            id\n            label\n            total\n            items(orderBy: { name: asc }) { name description price quantity photo { id } }\n            user { id }\n            charge\n          } }";
        test('Not logged in should throw', runner(function (_a) {
            var context = _a.context;
            return __awaiter(void 0, void 0, void 0, function () {
                var _context, _b, data, errors;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _context = asUser(context, undefined);
                            return [4 /*yield*/, _context.graphql.raw({
                                    query: query,
                                    variables: { token: token }
                                })];
                        case 1:
                            _b = _c.sent(), data = _b.data, errors = _b.errors;
                            expect(data).toEqual({ checkout: null });
                            expect(errors).toHaveLength(1);
                            expect(errors[0].message).toEqual('Sorry! You must be signed in to create an order!');
                            return [2 /*return*/];
                    }
                });
            });
        }));
        test('A users cart should correctly convert into an order', runner(function (_a) {
            var context = _a.context;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, Product, User, product1, product2, user1, user2, q1, q, q2, result1, result2;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = context.sudo().lists, Product = _b.Product, User = _b.User;
                            return [4 /*yield*/, Product.createOne({
                                    data: {
                                        name: 'test product 1',
                                        description: 'TEST 1',
                                        status: 'AVAILABLE',
                                        price: 5,
                                        photo: { create: { altText: 'product 1' } }
                                    },
                                    query: 'id name description price photo { id }'
                                })];
                        case 1:
                            product1 = _c.sent();
                            return [4 /*yield*/, Product.createOne({
                                    data: {
                                        name: 'test product 2',
                                        description: 'TEST 2',
                                        status: 'AVAILABLE',
                                        price: 7,
                                        photo: { create: { altText: 'product 2' } }
                                    },
                                    query: 'id name description price photo { id }'
                                })];
                        case 2:
                            product2 = _c.sent();
                            return [4 /*yield*/, User.createOne({
                                    data: { name: 'Test User 1', email: 'test1@example.com' }
                                })];
                        case 3:
                            user1 = _c.sent();
                            return [4 /*yield*/, User.createOne({
                                    data: { name: 'Test User 2', email: 'test2@example.com' }
                                })];
                        case 4:
                            user2 = _c.sent();
                            q1 = asUser(context, user1.id).graphql.raw;
                            q = 'mutation m($productId: ID!){ addToCart(productId: $productId) { id quantity product { id } user { id } } }';
                            return [4 /*yield*/, q1({ query: q, variables: { productId: product1.id } })];
                        case 5:
                            _c.sent();
                            return [4 /*yield*/, q1({ query: q, variables: { productId: product2.id } })];
                        case 6:
                            _c.sent();
                            return [4 /*yield*/, q1({ query: q, variables: { productId: product1.id } })];
                        case 7:
                            _c.sent();
                            return [4 /*yield*/, q1({ query: q, variables: { productId: product2.id } })];
                        case 8:
                            _c.sent();
                            return [4 /*yield*/, q1({ query: q, variables: { productId: product1.id } })];
                        case 9:
                            _c.sent();
                            q2 = asUser(context, user2.id).graphql.raw;
                            return [4 /*yield*/, q2({ query: q, variables: { productId: product2.id } })];
                        case 10:
                            _c.sent();
                            return [4 /*yield*/, q2({ query: q, variables: { productId: product1.id } })];
                        case 11:
                            _c.sent();
                            return [4 /*yield*/, q2({ query: q, variables: { productId: product2.id } })];
                        case 12:
                            _c.sent();
                            return [4 /*yield*/, q2({ query: q, variables: { productId: product1.id } })];
                        case 13:
                            _c.sent();
                            return [4 /*yield*/, q2({ query: q, variables: { productId: product2.id } })];
                        case 14:
                            _c.sent();
                            return [4 /*yield*/, asUser(context, user1.id).graphql.raw({
                                    query: query,
                                    variables: { token: token }
                                })];
                        case 15:
                            result1 = _c.sent();
                            // Confirm that the checkout has worked
                            expect(result1.errors).toBe(undefined);
                            expect(result1.data.checkout.charge).toEqual('MADE UP');
                            expect(result1.data.checkout.total).toEqual(3 * 5 + 2 * 7);
                            expect(result1.data.checkout.user.id).toEqual(user1.id);
                            expect(result1.data.checkout.items).toHaveLength(2);
                            expect(result1.data.checkout.items[0].name).toEqual(product1.name);
                            expect(result1.data.checkout.items[0].description).toEqual(product1.description);
                            expect(result1.data.checkout.items[0].price).toEqual(product1.price);
                            expect(result1.data.checkout.items[0].quantity).toEqual(3);
                            expect(result1.data.checkout.items[0].photo.id).toEqual(product1.photo.id);
                            expect(result1.data.checkout.items[1].name).toEqual(product2.name);
                            expect(result1.data.checkout.items[1].description).toEqual(product2.description);
                            expect(result1.data.checkout.items[1].price).toEqual(product2.price);
                            expect(result1.data.checkout.items[1].quantity).toEqual(2);
                            expect(result1.data.checkout.items[1].photo.id).toEqual(product2.photo.id);
                            return [4 /*yield*/, asUser(context, user2.id).graphql.raw({
                                    query: query,
                                    variables: { token: token }
                                })];
                        case 16:
                            result2 = _c.sent();
                            // Confirm that the checkout has worked
                            expect(result2.errors).toBe(undefined);
                            expect(result2.data.checkout.charge).toEqual('MADE UP');
                            expect(result2.data.checkout.total).toEqual(2 * 5 + 3 * 7);
                            expect(result2.data.checkout.user.id).toEqual(user2.id);
                            expect(result2.data.checkout.items).toHaveLength(2);
                            expect(result2.data.checkout.items[0].name).toEqual(product1.name);
                            expect(result2.data.checkout.items[0].description).toEqual(product1.description);
                            expect(result2.data.checkout.items[0].price).toEqual(product1.price);
                            expect(result2.data.checkout.items[0].quantity).toEqual(2);
                            expect(result2.data.checkout.items[0].photo.id).toEqual(product1.photo.id);
                            expect(result2.data.checkout.items[1].name).toEqual(product2.name);
                            expect(result2.data.checkout.items[1].description).toEqual(product2.description);
                            expect(result2.data.checkout.items[1].price).toEqual(product2.price);
                            expect(result2.data.checkout.items[1].quantity).toEqual(3);
                            expect(result2.data.checkout.items[1].photo.id).toEqual(product2.photo.id);
                            return [2 /*return*/];
                    }
                });
            });
        }));
    });
    describe('addToCart(productId)', function () {
        var query = 'mutation m($productId: ID!){ addToCart(productId: $productId) { id quantity product { id } user { id } } }';
        test('Not logged in should throw', runner(function (_a) {
            var context = _a.context;
            return __awaiter(void 0, void 0, void 0, function () {
                var graphql, productId, _b, data, errors;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            graphql = asUser(context, undefined).graphql;
                            productId = FAKE_ID;
                            return [4 /*yield*/, graphql.raw({ query: query, variables: { productId: productId } })];
                        case 1:
                            _b = _c.sent(), data = _b.data, errors = _b.errors;
                            expect(data).toEqual({ addToCart: null });
                            expect(errors).toHaveLength(1);
                            expect(errors[0].message).toEqual('You must be logged in to do this!');
                            return [2 /*return*/];
                    }
                });
            });
        }));
        test('Adding a non-existant product should throw', runner(function (_a) {
            var context = _a.context;
            return __awaiter(void 0, void 0, void 0, function () {
                var graphql, productId, _b, data, errors;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            graphql = asUser(context, FAKE_ID).graphql;
                            productId = FAKE_ID;
                            return [4 /*yield*/, graphql.raw({ query: query, variables: { productId: productId } })];
                        case 1:
                            _b = _c.sent(), data = _b.data, errors = _b.errors;
                            expect(data).toEqual({ addToCart: null });
                            expect(errors).toHaveLength(1);
                            expect(errors[0].message).toEqual('Unable to connect a CartItem.product<Product>');
                            return [2 /*return*/];
                    }
                });
            });
        }));
        test('Adding a null product should throw', runner(function (_a) {
            var context = _a.context;
            return __awaiter(void 0, void 0, void 0, function () {
                var graphql, _b, data, errors;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            graphql = asUser(context, FAKE_ID).graphql;
                            return [4 /*yield*/, graphql.raw({
                                    // Note: $pid can be null as we need to check the behaviour of addToCart
                                    query: 'mutation m($pid: ID){ addToCart(productId: $pid) { id } }',
                                    variables: { pid: null }
                                })];
                        case 1:
                            _b = _c.sent(), data = _b.data, errors = _b.errors;
                            expect(data).toEqual({ addToCart: null });
                            expect(errors).toHaveLength(1);
                            expect(errors[0].message).toEqual('Only a cuid can be passed to id filters');
                            return [2 /*return*/];
                    }
                });
            });
        }));
        test('Adding DRAFT product should throw', runner(function (_a) {
            var context = _a.context;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, User, Product, user, product, _c, data, errors;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = context.sudo().lists, User = _b.User, Product = _b.Product;
                            return [4 /*yield*/, User.createOne({
                                    data: { name: 'Test User', email: 'test@example.com' }
                                })];
                        case 1:
                            user = _d.sent();
                            return [4 /*yield*/, Product.createOne({
                                    data: { name: 'test product', status: 'DRAFT' }
                                })];
                        case 2:
                            product = _d.sent();
                            return [4 /*yield*/, asUser(context, user.id).graphql.raw({
                                    query: query,
                                    variables: { productId: product.id }
                                })];
                        case 3:
                            _c = _d.sent(), data = _c.data, errors = _c.errors;
                            expect(data).toEqual({ addToCart: null });
                            expect(errors).toHaveLength(1);
                            expect(errors[0].message).toEqual('Unable to connect a CartItem.product<Product>');
                            return [2 /*return*/];
                    }
                });
            });
        }));
        test('Adding UNAVAILABLE product should throw', runner(function (_a) {
            var context = _a.context;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, User, Product, user, product, _c, data, errors;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = context.sudo().lists, User = _b.User, Product = _b.Product;
                            return [4 /*yield*/, User.createOne({
                                    data: { name: 'Test User', email: 'test@example.com' }
                                })];
                        case 1:
                            user = _d.sent();
                            return [4 /*yield*/, Product.createOne({
                                    data: { name: 'test product', status: 'UNAVAILABLE' }
                                })];
                        case 2:
                            product = _d.sent();
                            return [4 /*yield*/, asUser(context, user.id).graphql.raw({
                                    query: query,
                                    variables: { productId: product.id }
                                })];
                        case 3:
                            _c = _d.sent(), data = _c.data, errors = _c.errors;
                            expect(data).toEqual({ addToCart: null });
                            expect(errors).toHaveLength(1);
                            expect(errors[0].message).toEqual('Unable to connect a CartItem.product<Product>');
                            return [2 /*return*/];
                    }
                });
            });
        }));
        test('Adding AVAILABLE product should return a cart item with a quantity of 1', runner(function (_a) {
            var context = _a.context;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, User, Product, user, product, _c, data, errors;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = context.sudo().lists, User = _b.User, Product = _b.Product;
                            return [4 /*yield*/, User.createOne({
                                    data: { name: 'Test User', email: 'test@example.com' }
                                })];
                        case 1:
                            user = _d.sent();
                            return [4 /*yield*/, Product.createOne({
                                    data: { name: 'test product', status: 'AVAILABLE' }
                                })];
                        case 2:
                            product = _d.sent();
                            return [4 /*yield*/, asUser(context, user.id).graphql.raw({
                                    query: query,
                                    variables: { productId: product.id }
                                })];
                        case 3:
                            _c = _d.sent(), data = _c.data, errors = _c.errors;
                            console.log(errors);
                            expect(errors).toBe(undefined);
                            expect(data.addToCart.quantity).toEqual(1);
                            expect(data.addToCart.product.id).toEqual(product.id);
                            expect(data.addToCart.user.id).toEqual(user.id);
                            return [2 /*return*/];
                    }
                });
            });
        }));
        test('Adding a product multiple times should return a cart item with the correct quantity', runner(function (_a) {
            var context = _a.context;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, User, Product, user, product, _c, data, errors;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = context.sudo().lists, User = _b.User, Product = _b.Product;
                            return [4 /*yield*/, User.createOne({
                                    data: { name: 'Test User', email: 'test@example.com' }
                                })];
                        case 1:
                            user = _d.sent();
                            return [4 /*yield*/, Product.createOne({
                                    data: { name: 'test product', status: 'AVAILABLE' }
                                })];
                        case 2:
                            product = _d.sent();
                            // Add product to cart
                            return [4 /*yield*/, asUser(context, user.id).graphql.raw({
                                    query: query,
                                    variables: { productId: product.id }
                                })];
                        case 3:
                            // Add product to cart
                            _d.sent();
                            return [4 /*yield*/, asUser(context, user.id).graphql.raw({
                                    query: query,
                                    variables: { productId: product.id }
                                })];
                        case 4:
                            _d.sent();
                            return [4 /*yield*/, asUser(context, user.id).graphql.raw({
                                    query: query,
                                    variables: { productId: product.id }
                                })];
                        case 5:
                            _c = _d.sent(), data = _c.data, errors = _c.errors;
                            expect(errors).toBe(undefined);
                            expect(data.addToCart.quantity).toEqual(3);
                            expect(data.addToCart.product.id).toEqual(product.id);
                            expect(data.addToCart.user.id).toEqual(user.id);
                            return [2 /*return*/];
                    }
                });
            });
        }));
        test('Adding different products multiple times should return cart items with the correct quantity', runner(function (_a) {
            var context = _a.context;
            return __awaiter(void 0, void 0, void 0, function () {
                var _b, User, Product, user, product1, product2, q, result1, result2;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = context.sudo().lists, User = _b.User, Product = _b.Product;
                            return [4 /*yield*/, User.createOne({
                                    data: { name: 'Test User', email: 'test@example.com' }
                                })];
                        case 1:
                            user = _c.sent();
                            return [4 /*yield*/, Product.createOne({
                                    data: { name: 'test product 1', status: 'AVAILABLE' }
                                })];
                        case 2:
                            product1 = _c.sent();
                            return [4 /*yield*/, Product.createOne({
                                    data: { name: 'test product 2', status: 'AVAILABLE' }
                                })];
                        case 3:
                            product2 = _c.sent();
                            q = asUser(context, user.id).graphql.raw;
                            return [4 /*yield*/, q({ query: query, variables: { productId: product1.id } })];
                        case 4:
                            _c.sent();
                            return [4 /*yield*/, q({ query: query, variables: { productId: product2.id } })];
                        case 5:
                            _c.sent();
                            return [4 /*yield*/, q({ query: query, variables: { productId: product1.id } })];
                        case 6:
                            _c.sent();
                            return [4 /*yield*/, q({ query: query, variables: { productId: product2.id } })];
                        case 7:
                            _c.sent();
                            return [4 /*yield*/, q({ query: query, variables: { productId: product1.id } })];
                        case 8:
                            _c.sent();
                            return [4 /*yield*/, context.sudo().lists.CartItem.findMany({
                                    where: { product: { id: { equals: product1.id } } },
                                    query: 'quantity'
                                })];
                        case 9:
                            result1 = _c.sent();
                            expect(result1).toHaveLength(1);
                            expect(result1[0].quantity).toEqual(3);
                            return [4 /*yield*/, context.sudo().lists.CartItem.findMany({
                                    where: { product: { id: { equals: product2.id } } },
                                    query: 'quantity'
                                })];
                        case 10:
                            result2 = _c.sent();
                            expect(result2).toHaveLength(1);
                            expect(result2[0].quantity).toEqual(2);
                            return [2 /*return*/];
                    }
                });
            });
        }));
    });
});
