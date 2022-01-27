"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMsg = exports.runAsync = void 0;
// Catching Errors in Async Functions
const runAsync = (fn) => {
    return (req, res, next) => {
        return fn(req, res, next).catch(next);
    };
};
exports.runAsync = runAsync;
// All of the responses should be send using this function
// Middlewares shouldn't use this as this send response to the client
const responseMsg = (res, options) => {
    const { statusCode, isError, msg, data } = options;
    res.status(statusCode).json({ isError, msg, data });
};
exports.responseMsg = responseMsg;
//# sourceMappingURL=base.js.map