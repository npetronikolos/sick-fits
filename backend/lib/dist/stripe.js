"use strict";
exports.__esModule = true;
var stripe_1 = require("stripe");
var stripeConfig = new stripe_1["default"](process.env.STRIPE_SECRET || '', {
    apiVersion: '2020-08-27'
});
exports["default"] = stripeConfig;
