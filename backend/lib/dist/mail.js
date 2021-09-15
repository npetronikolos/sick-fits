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
exports.sendPasswordResetEmail = void 0;
var nodemailer_1 = require("nodemailer");
var transport = nodemailer_1.createTransport({
    // @ts-ignore
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});
function makeANiceEmail(text) {
    return "\n    <div className=\"email\" style=\"\n      border: 1px solid black;\n      padding: 20px;\n      font-family: sans-serif;\n      line-height: 2;\n      font-size: 20px;\n    \">\n      <h2>Hello There!</h2>\n      <p>" + text + "</p>\n\n      <p>\u00F0\u0178\u02DC\u02DC, Wes Bos</p>\n    </div>\n  ";
}
function sendPasswordResetEmail(resetToken, to) {
    var _a;
    return __awaiter(this, void 0, Promise, function () {
        var info;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, transport.sendMail({
                        to: to,
                        from: 'wes@wesbos.com',
                        subject: 'Your password reset token!',
                        html: makeANiceEmail("Your Password Reset Token is here!\n      <a href=\"" + process.env.FRONTEND_URL + "/reset?token=" + resetToken + "\">Click Here to reset</a>\n    ")
                    })];
                case 1:
                    info = _b.sent();
                    if ((_a = process.env.MAIL_USER) === null || _a === void 0 ? void 0 : _a.includes('ethereal.email')) {
                        console.log("\u00EF\u00BF\u00BD Message Sent!  Preview it at " + nodemailer_1.getTestMessageUrl(info));
                    }
                    return [2 /*return*/];
            }
        });
    });
}
exports.sendPasswordResetEmail = sendPasswordResetEmail;
