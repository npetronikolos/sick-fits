"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
// import stripeConfig from '../lib/stripe';
var graphql = String.raw;
function checkout(root, _a, context) {
    var token = _a.token;
    return __awaiter(this, void 0, Promise, function () {
        var userId, user, cartItems, amount, charge, orderItems, order, cartItemIds;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    userId = context.session.itemId;
                    if (!userId) {
                        throw new Error('Sorry! You must be signed in to create an order!');
                    }
                    return [4 /*yield*/, context.lists.User.findOne({
                            where: { id: userId },
                            query: graphql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n      id\n      name\n      email\n      cart {\n        id\n        quantity\n        product {\n          name\n          price\n          description\n          id\n          photo {\n            id\n            image {\n              id\n              publicUrlTransformed\n            }\n          }\n        }\n      }\n    "], ["\n      id\n      name\n      email\n      cart {\n        id\n        quantity\n        product {\n          name\n          price\n          description\n          id\n          photo {\n            id\n            image {\n              id\n              publicUrlTransformed\n            }\n          }\n        }\n      }\n    "])))
                        })];
                case 1:
                    user = _b.sent();
                    console.dir(user, { depth: null });
                    cartItems = user.cart.filter(function (cartItem) { return cartItem.product; });
                    amount = cartItems.reduce(function (tally, cartItem) {
                        return tally + cartItem.quantity * cartItem.product.price;
                    }, 0);
                    console.log(amount);
                    // 3. create the charge with the stripe library
                    // const charge = await stripeConfig.paymentIntents
                    //   .create({
                    //     amount,
                    //     currency: 'USD',
                    //     confirm: true,
                    //     payment_method: token,
                    //   })
                    //   .catch(err => {
                    //     console.log(err);
                    //     throw new Error(err.message);
                    //   });
                    console.log({ token: token }); // Use the "unused" variable
                    charge = { amount: amount, id: 'MADE UP' };
                    console.log(charge);
                    orderItems = cartItems.map(function (cartItem) {
                        var orderItem = {
                            name: cartItem.product.name,
                            description: cartItem.product.description,
                            price: cartItem.product.price,
                            quantity: cartItem.quantity,
                            photo: { connect: { id: cartItem.product.photo.id } }
                        };
                        return orderItem;
                    });
                    console.log('gonna create the order');
                    return [4 /*yield*/, context.db.lists.Order.createOne({
                            data: {
                                total: charge.amount,
                                charge: charge.id,
                                items: { create: orderItems },
                                user: { connect: { id: userId } }
                            }
                        })];
                case 2:
                    order = _b.sent();
                    console.log({ order: order });
                    cartItemIds = user.cart.map(function (cartItem) { return cartItem.id; });
                    console.log('gonna create delete cartItems');
                    return [4 /*yield*/, context.lists.CartItem.deleteMany({
                            where: cartItemIds.map(function (id) { return ({ id: id }); })
                        })];
                case 3:
                    _b.sent();
                    return [2 /*return*/, order];
            }
        });
    });
}
exports["default"] = checkout;
var templateObject_1;
