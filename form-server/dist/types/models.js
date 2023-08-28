"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EStatus = exports.EFormStatus = exports.ESelectOptionStatus = void 0;
// 选项状态
var ESelectOptionStatus;
(function (ESelectOptionStatus) {
    ESelectOptionStatus[ESelectOptionStatus["delete"] = 1] = "delete";
    ESelectOptionStatus[ESelectOptionStatus["normal"] = 2] = "normal";
})(ESelectOptionStatus = exports.ESelectOptionStatus || (exports.ESelectOptionStatus = {}));
// 表单状态
var EFormStatus;
(function (EFormStatus) {
    EFormStatus[EFormStatus["delete"] = 1] = "delete";
    EFormStatus[EFormStatus["normal"] = 2] = "normal";
    EFormStatus[EFormStatus["ing"] = 3] = "ing";
    EFormStatus[EFormStatus["end"] = 4] = "end";
})(EFormStatus = exports.EFormStatus || (exports.EFormStatus = {}));
var EStatus;
(function (EStatus) {
    EStatus[EStatus["delete"] = 1] = "delete";
    EStatus[EStatus["normal"] = 2] = "normal";
})(EStatus = exports.EStatus || (exports.EStatus = {}));
//# sourceMappingURL=models.js.map