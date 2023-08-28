"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.star = exports.cancelStar = exports.listStar = void 0;
const db_1 = require("../db");
const models_1 = require("../types/models");
const crypto = require("crypto");
async function listStar(token) {
    const items = await db_1.default
        .get("starProblems")
        .filter((p) => p.uId === token && p.status === models_1.EStatus.normal)
        .value();
    return items;
}
exports.listStar = listStar;
async function cancelStar(token, id) {
    const item = await db_1.default
        .get("starProblems")
        .find((p) => p.id === id && p.uId === token && p.status === models_1.EStatus.normal)
        .assign({ status: models_1.EStatus.delete })
        .write();
    return item;
}
exports.cancelStar = cancelStar;
async function star(token, problem) {
    const id = crypto.randomUUID();
    await db_1.default
        .get("starProblems")
        .push({ id, uId: token, status: models_1.EStatus.normal, problem })
        .write();
    return id;
}
exports.star = star;
//# sourceMappingURL=problem.js.map