"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const dataCheck_1 = require("../middlewares/dataCheck");
const check_1 = require("../libs/check");
const user_check_1 = require("./user.check");
const userKit = require("../kits/user");
const router = new Router({
    prefix: "/api/user",
});
router.get("/getInfo", (0, dataCheck_1.checkToken)(userKit.checkToken), async (ctx) => {
    try {
        const token = ctx.cookies.get("token");
        const user = await userKit.getUserInfo(token);
        ctx.body = (0, check_1.generateOk)({ user });
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
router.post("/setInfo", (0, dataCheck_1.checkToken)(userKit.checkToken), (0, dataCheck_1.checkBody)(user_check_1.checkSetInfoBody), async (ctx) => {
    try {
        const { nickname, avatar } = ctx.request.body;
        const token = ctx.cookies.get("token");
        await userKit.setUserInfo(token, nickname, avatar);
        ctx.body = (0, check_1.generateOk)();
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
router.post("/changePwd", (0, dataCheck_1.checkToken)(userKit.checkToken), (0, dataCheck_1.checkBody)(user_check_1.checkChangePwdBody), async (ctx) => {
    try {
        const { pwd, oldPwd } = ctx.request.body;
        const token = ctx.cookies.get("token");
        await userKit.changePwd(token, pwd, oldPwd);
        ctx.cookies.set("token", "");
        ctx.body = (0, check_1.generateOk)();
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
router.get("/ping/:id", (ctx) => {
    console.log(ctx.params, ctx.request);
    ctx.body = "pong";
});
exports.default = router;
//# sourceMappingURL=user.js.map