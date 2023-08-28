"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const check_1 = require("../libs/check");
const dataCheck_1 = require("../middlewares/dataCheck");
const kits_1 = require("../kits");
const form_check_1 = require("./form.check");
const models_1 = require("../types/models");
const router = new Router({
    prefix: '/api/form',
});
// form 列表
router.post('/list', (0, dataCheck_1.checkToken)(kits_1.userKit.checkToken), (0, dataCheck_1.checkBody)(form_check_1.checkListFormBody), async (ctx) => {
    try {
        const token = ctx.cookies.get('token');
        const { offset = 0, limit = 10, isStar = undefined, } = ctx.request.body;
        const [items, total] = kits_1.formKit.listForm(token, isStar, offset, limit);
        ctx.body = (0, check_1.generateOk)({ items, total });
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
// 表单创建
router.post('/create', (0, dataCheck_1.checkToken)(kits_1.userKit.checkToken), (0, dataCheck_1.checkBody)(form_check_1.checkCreateFormBody), async (ctx) => {
    try {
        const token = ctx.cookies.get('token');
        const { title, subTitle, problems } = ctx.request.body;
        const id = await kits_1.formKit.createForm(token, title, subTitle, problems);
        ctx.body = (0, check_1.generateOk)({ id });
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
// 开始收集
router.post('/start', (0, dataCheck_1.checkToken)(kits_1.userKit.checkToken), (0, dataCheck_1.checkBody)(form_check_1.checkStartBody), async (ctx) => {
    const token = ctx.cookies.get('token');
    const { id } = ctx.request.body;
    kits_1.formKit.setFormStatus(token, id, models_1.EFormStatus.ing);
    ctx.body = (0, check_1.generateOk)();
});
// 结束收集
router.post('/end', (0, dataCheck_1.checkToken)(kits_1.userKit.checkToken), (0, dataCheck_1.checkBody)(form_check_1.checkStartBody), async (ctx) => {
    const token = ctx.cookies.get('token');
    const { id } = ctx.request.body;
    kits_1.formKit.setFormStatus(token, id, models_1.EFormStatus.end);
    ctx.body = (0, check_1.generateOk)();
});
// 表单获取
router.post('/get', (ctx) => {
    try {
        const { id } = ctx.request.body;
        const item = kits_1.formKit.getForm(id);
        ctx.body = (0, check_1.generateOk)({ item });
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
// 表单删除
router.post('/delete', (0, dataCheck_1.checkToken)(kits_1.userKit.checkToken), (0, dataCheck_1.checkBody)(form_check_1.checkDelReq), async (ctx) => {
    try {
        const token = ctx.cookies.get('token');
        const { id } = ctx.request.body;
        await kits_1.formKit.delForm(token, id);
        ctx.body = (0, check_1.generateOk)();
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
// 表单标星
router.post('/star', (0, dataCheck_1.checkToken)(kits_1.userKit.checkToken), (0, dataCheck_1.checkBody)(form_check_1.checkStarBody), async (ctx) => {
    try {
        const token = ctx.cookies.get('token');
        const { id } = ctx.request.body;
        await kits_1.formKit.starForm(token, id, true);
        ctx.body = (0, check_1.generateOk)();
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
// 表单取消标星
router.post('/cancelStar', (0, dataCheck_1.checkToken)(kits_1.userKit.checkToken), (0, dataCheck_1.checkBody)(form_check_1.checkStarBody), async (ctx) => {
    try {
        const token = ctx.cookies.get('token');
        const { id } = ctx.request.body;
        await kits_1.formKit.starForm(token, id, false);
        ctx.body = (0, check_1.generateOk)();
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
// 填写表单
router.post('/input', (0, dataCheck_1.checkBody)(form_check_1.checkFormInputReq), async (ctx) => {
    try {
        const { formId, problems } = ctx.request.body;
        await kits_1.formResultKit.create(formId, problems);
        ctx.body = (0, check_1.generateOk)();
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
// 获取表单填写详情
router.get('/formResult/:formId', (0, dataCheck_1.checkToken)(kits_1.userKit.checkToken), async (ctx) => {
    try {
        const token = ctx.cookies.get('token');
        const { formId } = ctx.params;
        const info = kits_1.formKit.getForm(formId);
        const items = kits_1.formResultKit.getFormResult(token, formId);
        ctx.body = (0, check_1.generateOk)({
            info,
            items,
        });
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
// 获取表单单个填写详情
router.post('/detail/:id', (0, dataCheck_1.checkToken)(kits_1.userKit.checkToken), async (ctx) => {
    try {
        const token = ctx.cookies.get('token');
        const { id } = ctx.params;
        const item = kits_1.formResultKit.getDetail(token, id);
        ctx.body = (0, check_1.generateOk)({
            item,
        });
    }
    catch (err) {
        (0, check_1.catchError)(err, ctx);
    }
});
exports.default = router;
//# sourceMappingURL=form.js.map