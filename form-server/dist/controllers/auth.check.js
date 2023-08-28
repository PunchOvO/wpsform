"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkLoginBody = exports.checkRegisterBody = void 0;
const check_1 = require("../libs/check");
function checkRegisterBody({ account, pwd, confirmPwd }) {
    (0, check_1.check)(!!account, "ERR_PARAMS_LOST");
    (0, check_1.check)(!!pwd, "ERR_PARAMS_LOST");
    (0, check_1.check)(!!confirmPwd, "ERR_PARAMS_LOST");
    (0, check_1.check)(pwd === confirmPwd, "ERR_TWO_PWD_NOT_CORRECT");
}
exports.checkRegisterBody = checkRegisterBody;
function checkLoginBody({ account, pwd }) {
    (0, check_1.check)(!!account, "ERR_PARAMS_LOST");
    (0, check_1.check)(!!pwd, "ERR_PARAMS_LOST");
}
exports.checkLoginBody = checkLoginBody;
//# sourceMappingURL=auth.check.js.map