"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const auth_1 = require("./controllers/auth");
const user_1 = require("./controllers/user");
const form_1 = require("./controllers/form");
const problem_1 = require("./controllers/problem");
const router = new Router();
router.use(auth_1.default.routes());
router.use(user_1.default.routes());
router.use(form_1.default.routes());
router.use(problem_1.default.routes());
exports.default = router;
//# sourceMappingURL=router.js.map