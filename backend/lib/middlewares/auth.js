"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoggedIn = void 0;
const error_1 = require("../utils/error");
const isLoggedIn = async (req, res, next) => {
    console.log(req.user);
    if (req.user)
        return next();
    return next(new error_1.BaseApiError(401, "You are not logged in"));
};
exports.isLoggedIn = isLoggedIn;
//# sourceMappingURL=auth.js.map