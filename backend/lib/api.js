"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const base_1 = require("./utils/base");
const passport_1 = __importDefault(require("passport"));
const cookie_session_1 = __importDefault(require("cookie-session"));
require("./passport");
const auth_1 = require("./routes/auth");
// App
exports.app = (0, express_1.default)();
// Middlewares
exports.app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
exports.app.use(express_1.default.json());
exports.app.use(passport_1.default.initialize());
exports.app.use((0, cookie_session_1.default)({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SESSION_SECRET],
}));
exports.app.use(passport_1.default.session());
// Test api route
exports.app.get("/api/test", (_, res) => res.status(200).send("Hello mom"));
// Routes
exports.app.use("/api/auth", auth_1.router);
exports.app.all("*", (req, res) => {
    (0, base_1.responseMsg)(res, {
        statusCode: 404,
        isError: true,
        msg: `Cannot find ${req.originalUrl} on this server!`,
    });
});
//# sourceMappingURL=api.js.map