"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateForm = exports.starForm = exports.setFormStatus = exports.delForm = exports.getIngForm = exports.getForm = exports.createForm = exports.listForm = void 0;
const db_1 = require("../db");
const models_1 = require("../types/models");
const crypto = require("crypto");
const check_1 = require("../libs/check");
function listForm(token, isStar = undefined, offset = 0, limit = 10) {
    let items = isStar === undefined
        ? db_1.default
            .get("forms")
            .filter((form) => form.author === token && form.status !== models_1.EFormStatus.delete)
            .value()
        : db_1.default
            .get("forms")
            .filter((form) => form.author === token &&
            form.status !== models_1.EFormStatus.delete &&
            form.isStar === !!isStar)
            .value();
    const total = items.length;
    items = items.filter((_item, index) => index >= offset * limit && index < offset * limit + limit);
    return [items, total];
}
exports.listForm = listForm;
async function createForm(token, title, subTitle, problems) {
    const now = Date.now();
    const id = crypto.randomUUID();
    problems = problems.map((p) => {
        const id = crypto.randomUUID();
        p.id = id;
        if (p.type === "multiSelect" ||
            p.type === "pullSelect" ||
            p.type === "singleSelect") {
            p.setting.options.map((o) => {
                const id = crypto.randomUUID();
                o.id = id;
            });
        }
        return p;
    });
    await db_1.default
        .get("forms")
        .push({
        id,
        ctime: now,
        utime: now,
        status: models_1.EFormStatus.normal,
        author: token,
        isStar: false,
        title,
        subTitle,
        problems,
    })
        .write();
    return id;
}
exports.createForm = createForm;
function getForm(id) {
    const form = db_1.default
        .get("forms")
        .find((form) => form.id === id && form.status !== models_1.EFormStatus.delete)
        .value();
    (0, check_1.check)(!!form, "ERR_FORM_NOT_FOUND");
    return form;
}
exports.getForm = getForm;
function getIngForm(id) {
    const form = db_1.default
        .get("forms")
        .find((form) => form.id === id && form.status === models_1.EFormStatus.ing)
        .value();
    (0, check_1.check)(!!form, "ERR_FORM_NOT_FOUND");
    return form;
}
exports.getIngForm = getIngForm;
async function delForm(token, id) {
    const form = await db_1.default
        .get("forms")
        .find((form) => form.author === token &&
        form.id === id &&
        form.status !== models_1.EFormStatus.delete)
        .assign({
        status: models_1.EFormStatus.delete,
    })
        .write();
    (0, check_1.check)(!!form, "ERR_FORM_NOT_FOUND");
    return form;
}
exports.delForm = delForm;
async function setFormStatus(token, id, status) {
    const form = await db_1.default
        .get("forms")
        .find((form) => form.author === token &&
        form.id === id &&
        form.status !== models_1.EFormStatus.delete)
        .assign({
        status: status
    })
        .write();
    (0, check_1.check)(!!form, "ERR_FORM_NOT_FOUND");
    return form;
}
exports.setFormStatus = setFormStatus;
async function starForm(token, id, isStar) {
    const form = await db_1.default
        .get("forms")
        .find((form) => form.author === token &&
        form.id === id &&
        form.status !== models_1.EFormStatus.delete)
        .assign({
        isStar: isStar,
    })
        .write();
    (0, check_1.check)(!!form, "ERR_FORM_NOT_FOUND");
    return form;
}
exports.starForm = starForm;
async function updateForm(token, form) {
    const item = await db_1.default
        .get("forms")
        .find((form) => form.author === token && form.status === models_1.EFormStatus.normal)
        .assign({ ...form })
        .write();
    (0, check_1.check)(!!form, "ERR_FORM_NOT_FOUND");
    return item;
}
exports.updateForm = updateForm;
//# sourceMappingURL=form.js.map