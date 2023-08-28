"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormResult = exports.create = exports.getDetail = void 0;
const db_1 = require("../db");
const crypto = require("crypto");
const check_1 = require("../libs/check");
const _1 = require(".");
function getDetail(token, id) {
    const item = db_1.default
        .get("formResults")
        .find((formResult) => formResult.id === id && formResult.formAuthor === token)
        .value();
    (0, check_1.check)(!!item, "ERR_FORM_RESULT_NOT_FOUND");
    return item;
}
exports.getDetail = getDetail;
async function create(formId, problems) {
    const id = crypto.randomUUID();
    const form = await _1.formKit.getIngForm(formId);
    await db_1.default
        .get("formResults")
        .push({ id, formAuthor: form.author, formId, result: problems })
        .write();
}
exports.create = create;
function getFormResult(token, formId) {
    const items = db_1.default
        .get("formResults")
        .filter((f) => f.formId === formId && f.formAuthor === token)
        .value();
    return items;
}
exports.getFormResult = getFormResult;
//# sourceMappingURL=formResult.js.map