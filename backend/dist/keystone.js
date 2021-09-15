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
var auth_1 = require("@keystone-next/auth");
var keystone_1 = require("@keystone-next/keystone");
var session_1 = require("@keystone-next/keystone/session");
var fields_1 = require("./schemas/fields");
var Role_1 = require("./schemas/Role");
var OrderItem_1 = require("./schemas/OrderItem");
var Order_1 = require("./schemas/Order");
var CartItem_1 = require("./schemas/CartItem");
var ProductImage_1 = require("./schemas/ProductImage");
var Product_1 = require("./schemas/Product");
var User_1 = require("./schemas/User");
require("dotenv/config");
var seed_data_1 = require("./seed-data");
var mail_1 = require("./lib/mail");
var mutations_1 = require("./mutations");
var databaseURL = process.env.DATABASE_URL;
var sessionConfig = {
    maxAge: 60 * 60 * 24 * 360,
    secret: process.env.COOKIE_SECRET || "this secret should only be used in testing"
};
var withAuth = auth_1.createAuth({
    listKey: "User",
    identityField: "email",
    secretField: "password",
    initFirstItem: {
        fields: ["name", "email", "password"]
    },
    passwordResetLink: {
        sendToken: function (args) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: 
                        // send the email
                        return [4 /*yield*/, mail_1.sendPasswordResetEmail(args.token, args.identity)];
                        case 1:
                            // send the email
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
    },
    sessionData: "id name email role { " + fields_1.permissionsList.join(" ") + " }"
}).withAuth;
exports["default"] = withAuth(keystone_1.config({
    // @ts-ignore
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true
        }
    },
    db: process.env.DATABASE_URL
        ? { provider: "postgresql", url: process.env.DATABASE_URL }
        : {
            provider: "sqlite",
            url: databaseURL,
            onConnect: function (context) {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                console.log("Connected to the database!");
                                if (!process.argv.includes("--seed-data")) return [3 /*break*/, 2];
                                return [4 /*yield*/, seed_data_1.insertSeedData(context)];
                            case 1:
                                _a.sent();
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                });
            }
        },
    lists: keystone_1.createSchema({
        // Schema items go in here
        User: User_1.User,
        Product: Product_1.Product,
        ProductImage: ProductImage_1.ProductImage,
        CartItem: CartItem_1.CartItem,
        OrderItem: OrderItem_1.OrderItem,
        Order: Order_1.Order,
        Role: Role_1.Role
    }),
    extendGraphqlSchema: mutations_1.extendGraphqlSchema,
    ui: {
        // Show the UI only for poeple who pass this test
        isAccessAllowed: function (_a) {
            var session = _a.session;
            // console.log(session);
            return !!(session === null || session === void 0 ? void 0 : session.data);
        }
    },
    session: session_1.statelessSessions(sessionConfig)
}));
