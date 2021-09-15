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
exports.insertSeedData = void 0;
var data_1 = require("./data");
function insertSeedData(_a) {
    var prisma = _a.prisma;
    return __awaiter(this, void 0, void 0, function () {
        var _i, products_1, product, id;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("\u00F0\u0178\u0152\u00B1 Inserting Seed Data: " + data_1.products.length + " Products");
                    _i = 0, products_1 = data_1.products;
                    _b.label = 1;
                case 1:
                    if (!(_i < products_1.length)) return [3 /*break*/, 5];
                    product = products_1[_i];
                    console.log("  \u00F0\u0178\u203A\u008D\u00EF\u00B8\u008F Adding Product: " + product.name);
                    return [4 /*yield*/, prisma.productImage.create({
                            data: { image: JSON.stringify(product.photo), altText: product.description }
                        })];
                case 2:
                    id = (_b.sent()).id;
                    // @ts-ignore
                    delete product.photo;
                    // @ts-ignore
                    product.photoId = id;
                    return [4 /*yield*/, prisma.product.create({ data: product })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4:
                    _i++;
                    return [3 /*break*/, 1];
                case 5:
                    console.log("\u00E2\u0153\u2026 Seed Data Inserted: " + data_1.products.length + " Products");
                    console.log("\u00F0\u0178\u2018\u2039 Please start the process with `yarn dev` or `npm run dev`");
                    process.exit();
                    return [2 /*return*/];
            }
        });
    });
}
exports.insertSeedData = insertSeedData;
