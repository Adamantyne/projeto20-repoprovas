var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import testRepository from "../repositories/testsRepository.js";
import { throwErr } from "../utils/suportFunctions.js";
function validateTestData(_a) {
    var teacher = _a.teacher, discipline = _a.discipline, category = _a.category;
    return __awaiter(this, void 0, void 0, function () {
        var categoryId, teacherId, disciplineId, teacherDisciplineId;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, categoryValidate(category)];
                case 1:
                    categoryId = _b.sent();
                    return [4 /*yield*/, teacherValidate(teacher)];
                case 2:
                    teacherId = _b.sent();
                    return [4 /*yield*/, disciplineValidate(discipline)];
                case 3:
                    disciplineId = _b.sent();
                    return [4 /*yield*/, teacherDisciplineValidate({ teacherId: teacherId, disciplineId: disciplineId }, teacher, discipline)];
                case 4:
                    teacherDisciplineId = _b.sent();
                    return [2 /*return*/, { categoryId: categoryId, teacherDisciplineId: teacherDisciplineId }];
            }
        });
    });
}
function categoryValidate(categoryName) {
    return __awaiter(this, void 0, void 0, function () {
        var category;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testRepository.findCategoryByName(categoryName)];
                case 1:
                    category = _a.sent();
                    if (!category) {
                        throwErr("unprocessable_entity", "category not registred");
                    }
                    return [2 /*return*/, category.id];
            }
        });
    });
}
function teacherValidate(teacherName) {
    return __awaiter(this, void 0, void 0, function () {
        var teacher;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testRepository.findTeacherByName(teacherName)];
                case 1:
                    teacher = _a.sent();
                    if (!teacher) {
                        throwErr("unprocessable_entity", "teacher not registred");
                    }
                    return [2 /*return*/, teacher.id];
            }
        });
    });
}
function disciplineValidate(disciplineName) {
    return __awaiter(this, void 0, void 0, function () {
        var discipline;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testRepository.findDisciplineByName(disciplineName)];
                case 1:
                    discipline = _a.sent();
                    if (!discipline) {
                        throwErr("unprocessable_entity", "discipline not registred");
                    }
                    return [2 /*return*/, discipline.id];
            }
        });
    });
}
function teacherDisciplineValidate(_a, teacherName, disciplineName) {
    var teacherId = _a.teacherId, disciplineId = _a.disciplineId;
    return __awaiter(this, void 0, void 0, function () {
        var teacherDiscipline;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, testRepository.findTeacherDiscipline({
                        teacherId: teacherId,
                        disciplineId: disciplineId
                    })];
                case 1:
                    teacherDiscipline = _b.sent();
                    if (!teacherDiscipline) {
                        throwErr("unprocessable_entity", "discipline \"".concat(disciplineName, "\" doesn't belong to the teacher \"").concat(teacherName, "\""));
                    }
                    return [2 /*return*/, teacherDiscipline.id];
            }
        });
    });
}
function getTests(groupByReference) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (groupByReference === "disciplines") {
                return [2 /*return*/, getTestsByDisciplines()];
            }
            else if (groupByReference === "teachers") {
                return [2 /*return*/, getTestsByTeachers()];
            }
            else {
                throwErr("unprocessable_entity", "value of querystring \"groupBy\" must be \"disciplines\" or \"teachers\"");
            }
            return [2 /*return*/];
        });
    });
}
function getTestsByDisciplines() {
    return __awaiter(this, void 0, void 0, function () {
        var tests, terms, i, disciplines;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tests = [];
                    return [4 /*yield*/, testRepository.findTerms()];
                case 1:
                    terms = _a.sent();
                    i = 0;
                    _a.label = 2;
                case 2:
                    if (!(i < terms.length)) return [3 /*break*/, 5];
                    return [4 /*yield*/, testRepository.findDisciplinesByTermId(terms[i].number)];
                case 3:
                    disciplines = _a.sent();
                    tests.push({ id: terms[i].id, number: terms[i].number, disciplines: disciplines });
                    _a.label = 4;
                case 4:
                    i++;
                    return [3 /*break*/, 2];
                case 5: return [2 /*return*/, tests];
            }
        });
    });
}
function getTestsByTeachers() {
    return __awaiter(this, void 0, void 0, function () {
        var teacherDisciplines;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testRepository.findTeacherDisciplines()];
                case 1:
                    teacherDisciplines = _a.sent();
                    return [2 /*return*/, teacherDisciplines];
            }
        });
    });
}
var testService = { validateTestData: validateTestData, getTests: getTests };
export default testService;
