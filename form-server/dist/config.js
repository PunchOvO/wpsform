"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = require("dotenv");
env.config();
exports.default = {
    port: Number(process.env.PORT) || 3000,
    secret: process.env.SECRET || "form",
};
//# sourceMappingURL=config.js.map