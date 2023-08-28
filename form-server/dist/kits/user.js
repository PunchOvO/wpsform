"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePwd = exports.getUserInfo = exports.checkToken = exports.logout = exports.login = exports.setUserInfo = exports.createUser = void 0;
const db_1 = require("../db");
const crypto = require("crypto");
const config_1 = require("../config");
const models_1 = require("../types/models");
const check_1 = require("../libs/check");
const session = [];
async function createUser(account, pwd) {
    const user = db_1.default
        .get("users")
        .find((x) => x.account === account)
        .value();
    (0, check_1.check)(!user, "ERR_ACCOUNT_EXIST");
    const id = crypto.randomUUID();
    const hashPwd = crypto
        .createHmac("sha256", config_1.default.secret)
        .update(pwd)
        .digest("hex");
    const now = Date.now();
    await db_1.default
        .get("users")
        .push({
        id,
        account,
        pwd: hashPwd,
        status: models_1.EStatus.normal,
        ctime: now,
        utime: now,
        nickname: account,
        avatar: "",
    })
        .write();
    return id;
}
exports.createUser = createUser;
async function setUserInfo(id, nickname, avatar) {
    const user = await db_1.default
        .get("users")
        .filter((x) => x.status === models_1.EStatus.normal)
        .find((x) => x.id === id)
        .value();
    (0, check_1.check)(!!user, "ERR_USER_NOT_FOUND");
    await db_1.default
        .get("users")
        .find((x) => x.id === id)
        .assign({ nickname, avatar })
        .write();
}
exports.setUserInfo = setUserInfo;
async function login(account, pwd) {
    const user = db_1.default
        .get("users")
        .find((x) => x.account === account)
        .value();
    (0, check_1.check)(!!user, "ERR_ACCOUNT_NOT_FOUND");
    const hashPwd = crypto
        .createHmac("sha256", config_1.default.secret)
        .update(pwd)
        .digest("hex");
    (0, check_1.check)(hashPwd === user.pwd, "ERR_PWD_NOT_CORRECT");
    if (!session.includes(user.id)) {
        session.push(user.id);
    }
    return user.id;
}
exports.login = login;
function logout(token) {
    const index = session.indexOf(token);
    session.splice(index, 1);
}
exports.logout = logout;
function checkToken(token) {
    const isLogin = session.includes(token);
    (0, check_1.check)(isLogin, "ERR_USER_NOT_LOGIN");
}
exports.checkToken = checkToken;
async function getUserInfo(token) {
    const user = await db_1.default
        .get("users")
        .filter((x) => x.status === models_1.EStatus.normal)
        .find((x) => x.id === token)
        .value();
    (0, check_1.check)(!!user, "ERR_USER_NOT_FOUND");
    return user;
}
exports.getUserInfo = getUserInfo;
async function changePwd(token, pwd, oldPwd) {
    const user = await db_1.default
        .get("users")
        .filter((x) => x.status === models_1.EStatus.normal)
        .find((x) => x.id === token)
        .value();
    (0, check_1.check)(!!user, "ERR_USER_NOT_FOUND");
    const hashOldPwd = crypto
        .createHmac("sha256", config_1.default.secret)
        .update(oldPwd)
        .digest("hex");
    (0, check_1.check)(hashOldPwd === user.pwd, "ERR_OLD_PWD_NOT_CORRECT");
    const hashPwd = crypto
        .createHmac("sha256", config_1.default.secret)
        .update(pwd)
        .digest("hex");
    await db_1.default
        .get("users")
        .find((x) => x.id === token)
        .assign({ pwd: hashPwd })
        .write();
    logout(token);
}
exports.changePwd = changePwd;
//# sourceMappingURL=user.js.map