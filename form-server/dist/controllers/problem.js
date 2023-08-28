"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const check_1 = require("../libs/check");
const db_1 = require("../db");
const dataCheck_1 = require("../middlewares/dataCheck");
const userKit = require("../kits/user");
const problemKit = require("../kits/problem");
const problem_check_1 = require("./problem.check");
const router = new Router({
    prefix: "/api/problem",
});
router.get("/listType", (ctx) => {
    try {
        ctx.body = (0, check_1.generateOk)({ problemTypes: db_1.problemTypes });
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
router.get("/listBasic", (0, dataCheck_1.checkToken)(userKit.checkToken), (ctx) => {
    try {
        ctx.body = (0, check_1.generateOk)({ basicProblems: db_1.basicProblems });
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
router.post("/listStar", (0, dataCheck_1.checkToken)(userKit.checkToken), async (ctx) => {
    try {
        const token = ctx.cookies.get("token");
        const items = await problemKit.listStar(token);
        ctx.body = (0, check_1.generateOk)({ items });
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
router.post("/star", (0, dataCheck_1.checkToken)(userKit.checkToken), (0, dataCheck_1.checkBody)(problem_check_1.checkStarBody), async (ctx) => {
    try {
        const token = ctx.cookies.get("token");
        const { problem } = ctx.request.body;
        const id = await problemKit.star(token, problem);
        ctx.body = (0, check_1.generateOk)({ id });
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
router.post("/cancelStar", (0, dataCheck_1.checkToken)(userKit.checkToken), (0, dataCheck_1.checkBody)(problem_check_1.checkCancelProblemBody), async (ctx) => {
    try {
        const token = ctx.cookies.get("token");
        const { id } = ctx.request.body;
        const item = await problemKit.cancelStar(token, id);
        (0, check_1.check)(!!item, "ERR_STAR_NOT_FOUND");
        ctx.body = (0, check_1.generateOk)();
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
exports.default = router;
//# sourceMappingURL=problem.js.map