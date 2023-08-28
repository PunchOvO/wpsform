"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const dataCheck_1 = require("../middlewares/dataCheck");
const auth_check_1 = require("./auth.check");
const check_1 = require("../libs/check");
const userKit = require("../kits/user");
const router = new Router({
    prefix: "/api/auth",
});
router.post("/register", (0, dataCheck_1.checkBody)(auth_check_1.checkRegisterBody), async (ctx) => {
    try {
        const { account, pwd } = ctx.request.body;
        const id = await userKit.createUser(account, pwd);
        ctx.body = (0, check_1.generateOk)({ id });
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
router.post("/login", (0, dataCheck_1.checkBody)(auth_check_1.checkLoginBody), async (ctx) => {
    try {
        const { account, pwd } = ctx.request.body;
        const token = await userKit.login(account, pwd);
        ctx.cookies.set("token", token);
        ctx.body = (0, check_1.generateOk)();
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
router.post("/logout", (0, dataCheck_1.checkToken)(userKit.checkToken), (ctx) => {
    try {
        const token = ctx.cookies.get('token');
        userKit.logout(token);
        ctx.cookies.set("token", "");
        ctx.body = (0, check_1.generateOk)();
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
exports.default = router;
//# sourceMappingURL=auth.js.map