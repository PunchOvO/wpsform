"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkChangePwdBody = exports.checkSetInfoBody = void 0;
const check_1 = require("../libs/check");
function checkSetInfoBody({ nickname, avatar }) {
    (0, check_1.check)(!!nickname, "ERR_PARAMS_LOST");
    (0, check_1.check)(!!avatar, "ERR_PARAMS_LOST");
}
exports.checkSetInfoBody = checkSetInfoBody;
function checkChangePwdBody({ pwd, oldPwd, confirmPwd }) {
    (0, check_1.check)(!!pwd, "ERR_PARAMS_LOST");
    (0, check_1.check)(!!oldPwd, "ERR_PARAMS_LOST");
    (0, check_1.check)(!!confirmPwd, "ERR_PARAMS_LOST");
    (0, check_1.check)(pwd === confirmPwd, "ERR_TWO_PWD_NOT_CORRECT");
}
exports.checkChangePwdBody = checkChangePwdBody;
//# sourceMappingURL=user.check.js.map