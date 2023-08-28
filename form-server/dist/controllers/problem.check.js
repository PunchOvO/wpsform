"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProblem = exports.checkStarBody = exports.checkCancelProblemBody = void 0;
const check_1 = require("../libs/check");
function checkCancelProblemBody({ id }) {
    (0, check_1.check)(!!id, "ERR_PARAMS_LOST");
}
exports.checkCancelProblemBody = checkCancelProblemBody;
function checkStarBody({ problem }) {
    (0, check_1.check)(!!problem, "ERR_PARAMS_LOST");
    (0, check_1.check)(!!problem.title, "ERR_PROBLEM_DATA");
    checkProblem(problem);
}
exports.checkStarBody = checkStarBody;
function checkProblem(problem) {
    switch (problem.type) {
        case "singleSelect":
        case "multiSelect":
        case "pullSelect": {
            (0, check_1.check)(!!problem.setting, "ERR_PROBLEM_DATA");
            (0, check_1.check)(!!problem.setting.options, "ERR_PROBLEM_DATA");
            (0, check_1.check)(problem.setting.options.length > 0, "ERR_PROBLEM_DATA");
            problem.setting.options.map((op) => {
                // check(!!op.id, "ERR_PROBLEM_DATA");
                (0, check_1.check)(!!op.title, "ERR_PROBLEM_DATA");
                (0, check_1.check)(!!op.status, "ERR_PROBLEM_DATA");
            });
            break;
        }
        case "input":
        case "time":
        case "date":
        case "score": {
            break;
        }
        default: {
            (0, check_1.check)(false, "ERR_TYPE_NOT_FOUND");
        }
    }
}
exports.checkProblem = checkProblem;
//# sourceMappingURL=problem.check.js.map