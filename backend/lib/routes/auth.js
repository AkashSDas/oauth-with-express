"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const auth_1 = require("../middlewares/auth");
const base_1 = require("../utils/base");
exports.router = (0, express_1.Router)();
exports.router.get("/login/google", passport_1.default.authenticate("google", { scope: ["profile", "email"] }), (req, res) => {
    return (0, base_1.responseMsg)(res, {
        statusCode: 200,
        isError: false,
        msg: "Google OAuth initialized",
    });
});
exports.router.get("/google/callback", passport_1.default.authenticate("google", {
    failureMessage: "Cannot login to Google, Please try again",
    successRedirect: "http://localhost:3000/login/success",
    failureRedirect: "http://localhost:3000/login/error",
}), (req, res) => {
    return (0, base_1.responseMsg)(res, {
        statusCode: 200,
        isError: false,
        msg: "Google callback",
        data: { user: req.user },
    });
});
exports.router.get("/user", auth_1.isLoggedIn, (req, res) => {
    return (0, base_1.responseMsg)(res, {
        statusCode: 200,
        isError: false,
        msg: "Logged in user info",
        data: { user: req.user },
    });
});
exports.router.get("/logout", (req, res) => {
    req.logout();
    return (0, base_1.responseMsg)(res, {
        statusCode: 200,
        isError: false,
        msg: "Successfully logged out",
    });
});
//# sourceMappingURL=auth.js.map