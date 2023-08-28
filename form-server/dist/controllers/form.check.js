"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProblemResult = exports.checkFormInputReq = exports.checkStarBody = exports.checkStartBody = exports.checkDelReq = exports.checkCreateFormBody = exports.checkListFormBody = void 0;
const check_1 = require("../libs/check");
const problem_check_1 = require("./problem.check");
function checkListFormBody({ offset, limit }) {
    (0, check_1.check)(typeof offset === "number" || typeof offset === "undefined", "ERR_PARAMS_TYPE_NOT_CORRECT");
    (0, check_1.check)(typeof limit === "number" || typeof offset === "undefined", "ERR_PARAMS_TYPE_NOT_CORRECT");
}
exports.checkListFormBody = checkListFormBody;
function checkCreateFormBody({ title, subTitle, problems, }) {
    (0, check_1.check)(!!title, "ERR_PARAMS_LOST");
    (0, check_1.check)(!!subTitle, "ERR_PARAMS_LOST");
    (0, check_1.check)(!!problems, "ERR_PARAMS_LOST");
    (0, check_1.check)(problems.length > 0, "ERR_FORM_DATA");
    problems.map((p) => {
        (0, check_1.check)(!!p.title, "ERR_PROBLEM_DATA");
        (0, problem_check_1.checkProblem)(p);
    });
}
exports.checkCreateFormBody = checkCreateFormBody;
function checkDelReq({ id }) {
    (0, check_1.check)(!!id, "ERR_PARAMS_LOST");
}
exports.checkDelReq = checkDelReq;
function checkStartBody({ id }) {
    (0, check_1.check)(!!id, "ERR_PARAMS_LOST");
}
exports.checkStartBody = checkStartBody;
function checkStarBody({ id }) {
    (0, check_1.check)(!!id, "ERR_PARAMS_LOST");
}
exports.checkStarBody = checkStarBody;
function checkFormInputReq({ formId, problems }) {
    (0, check_1.check)(!!formId, "ERR_PARAMS_LOST");
    problems.map((p) => {
        (0, check_1.check)(!!p.title, "ERR_PROBLEM_DATA");
        (0, check_1.check)(!!p.id, "ERR_PROBLEM_DATA");
        (0, problem_check_1.checkProblem)(p);
        if (p.required)
            checkProblemResult(p);
    });
}
exports.checkFormInputReq = checkFormInputReq;
function checkProblemResult(problem) {
    switch (problem.type) {
        case "multiSelect": {
            problem.result.value.map((v) => checkOption(v));
            break;
        }
        case "pullSelect":
        case "singleSelect": {
            checkOption(problem.result.value);
            break;
        }
        case "date":
        case "input":
        case "time": {
            (0, check_1.check)(!!problem.result.value, "ERR_FORM_RESULT");
            break;
        }
        case "score": {
            (0, check_1.check)(!!problem.result.value, "ERR_FORM_RESULT");
            (0, check_1.check)(typeof problem.result.value === "number", "ERR_FORM_RESULT");
            break;
        }
        default:
            (0, check_1.check)(false, "ERR_TYPE_NOT_FOUND");
    }
}
exports.checkProblemResult = checkProblemResult;
function checkOption({ id, title }) {
    (0, check_1.check)(!!id, "ERR_FORM_RESULT");
    (0, check_1.check)(!!title, "ERR_FORM_RESULT");
}
//# sourceMappingURL=form.check.js.map