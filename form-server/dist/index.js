"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const koaBody = require("koa-body");
const config_1 = require("./config");
const router_1 = require("./router");
const app = new Koa();
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const time = Date.now() - start;
    ctx.set("X-Response-Time", time + "ms");
});
app.use(koaBody());
app.use(router_1.default.routes());
app.listen(config_1.default.port, () => {
    console.log(`正在监听${config_1.default.port}端口...`);
});
//# sourceMappingURL=index.js.map