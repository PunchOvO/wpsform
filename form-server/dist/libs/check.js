"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOk = exports.catchError = exports.check = exports.Error = void 0;
const exception_1 = require("./exception");
class Error {
    stat;
    msg;
    constructor(stat) {
        this.stat = stat || "Internel_Server_Error";
        this.msg = exception_1.Exception.get(stat);
    }
}
exports.Error = Error;
function check(bool, stat) {
    if (!bool) {
        throw new Error(stat);
    }
}
exports.check = check;
function catchError(err, ctx) {
    console.log("error: ", err);
    ctx.status = 500;
    ctx.body = { ...err };
}
exports.catchError = catchError;
function generateOk(data) {
    return data
        ? {
            stat: "ok",
            data,
        }
        : { stat: "ok" };
}
exports.generateOk = generateOk;
//# sourceMappingURL=check.js.map