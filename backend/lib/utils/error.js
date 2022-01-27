"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.BaseApiError = void 0;
const base_1 = require("./base");
class BaseApiError extends Error {
    constructor(statusCode, msg) {
        super(msg);
        this.statusCode = statusCode;
        this.msg = msg;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.BaseApiError = BaseApiError;
const errorHandler = (err, req, res, next) => {
    var _a, _b;
    if (err instanceof BaseApiError) {
        return (0, base_1.responseMsg)(res, {
            statusCode: err.statusCode,
            msg: err.msg,
            isError: true,
        });
    }
    console.log(err);
    const statusCode = ((_a = err) === null || _a === void 0 ? void 0 : _a.statusCode) || 500;
    const msg = ((_b = err) === null || _b === void 0 ? void 0 : _b.msg) || "Something went wrong, Please try again";
    return (0, base_1.responseMsg)(res, { statusCode, msg, isError: true });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map