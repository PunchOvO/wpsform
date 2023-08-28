"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.problemTypes = exports.basicProblems = void 0;
const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const models_1 = require("./types/models");
const adapter = new FileSync(path.join(__dirname, "../db.json"));
const db = low(adapter);
db.defaults({
    forms: [],
    users: [],
    starProblems: [],
    formModules: [],
    formResults: [],
}).write();
exports.basicProblems = [
    {
        id: "basicInputName",
        type: "input",
        title: "姓名",
        required: true,
        setting: null,
    },
    {
        id: "basicSingSelectGender",
        type: "singleSelect",
        title: "性别",
        required: true,
        setting: {
            options: [
                {
                    id: "",
                    title: "男",
                    status: models_1.ESelectOptionStatus.normal,
                },
                {
                    id: "",
                    title: "女",
                    status: models_1.ESelectOptionStatus.normal,
                },
            ],
        },
    },
];
exports.problemTypes = [
    {
        title: "填空题",
        type: "input",
    },
    {
        title: "单选题",
        type: "singleSelect",
    },
    {
        title: "多选题",
        type: "multiSelect",
    },
    {
        title: "下拉选择题",
        type: "pullSelect",
    },
    {
        title: "日期题",
        type: "date",
    },
    {
        title: "时间题",
        type: "time",
    },
    {
        title: "打分题",
        type: "score",
    },
];
exports.default = db;
//# sourceMappingURL=db.js.map