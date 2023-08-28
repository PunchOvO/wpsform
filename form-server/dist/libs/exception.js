"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
const stat_1 = require("../stat");
const __stat = new Map();
class Exception {
    stat;
    msg;
    constructor(stat, msg) {
        this.stat = stat;
        this.msg = msg;
    }
    static updates(stats) {
        for (const key in stats) {
            __stat.set(key, stats[key]);
        }
    }
    static get(stat) {
        return __stat.get(stat);
    }
    static set(key, stat) {
        __stat.set(key, stat);
    }
}
exports.Exception = Exception;
Exception.updates(stat_1.default);
Exception.set("Internel_Server_Error", "服务端异常");
//# sourceMappingURL=exception.js.map