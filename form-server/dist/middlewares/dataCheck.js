"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = exports.checkBody = void 0;
const check_1 = require("../libs/check");
function checkBody(check) {
    return async function (ctx, next) {
        try {
            console.log(`path: ${ctx.path}`);
            check(ctx.request.body);
            await next();
        }
        catch (err) {
            (0, check_1.catchError)(err, ctx);
        }
    };
}
exports.checkBody = checkBody;
function checkToken(check) {
    return async function (ctx, next) {
        try {
            console.log(`path: ${ctx.path}`);
            const token = ctx.cookies.get("token");
            check(token);
            await next();
        }
        catch (err) {
            (0, check_1.catchError)(err, ctx);
        }
    };
}
exports.checkToken = checkToken;
//# sourceMappingURL=dataCheck.js.map