var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
import supertest from "supertest";
import app from "../src/app.js";
import db from "../src/config/database.js";
import authFactory from "./factories/authFactory.js";
import testFactory from "./factories/testFactory.js";
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["TRUNCATE TABLE users;"], ["TRUNCATE TABLE users;"])))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe("geral tests", function () {
    it("(non-existent page) should answer with status 404", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, supertest(app).get("/not_found")];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("sign up tests", function () {
    it("should answer with status 422 when trying to create an invalid user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authFactory.signUp(authFactory.invalidSignUpData)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should answer with status 201 when trying to create a valid user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authFactory.signUp(authFactory.defaultSignUpData)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should answer with status 409 when trying to create a already existing user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authFactory.signUp(authFactory.defaultSignUpData)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authFactory.signUp(authFactory.defaultSignUpData)];
                case 2:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(409);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("sign in tests", function () {
    it("should answer with status 422 when trying to sign in with invalid input values", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authFactory.signIn(authFactory.invalidSignInData)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should answer with status 401 when trying to sign in with not existing user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authFactory.signIn(authFactory.defaultSignInData)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should answer with status 201 when trying to sign in with a valid user", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authFactory.signUp(authFactory.defaultSignUpData)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authFactory.signIn(authFactory.defaultSignInData)];
                case 2:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("get/post tests", function () {
    it("should answer with status 401 when trying to get categories without a valid token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var invalidToken, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    invalidToken = "response.body.token";
                    return [4 /*yield*/, testFactory.getCategories(invalidToken)];
                case 1:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(401);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should answer with status 200 when trying to get categories with a valid token", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authFactory.signUp(authFactory.defaultSignUpData)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authFactory.signIn(authFactory.defaultSignInData)];
                case 2:
                    response = _a.sent();
                    token = response.body.token;
                    return [4 /*yield*/, testFactory.getCategories(token)];
                case 3:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should answer with status 422 when trying to post a test with invalid input values", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authFactory.signUp(authFactory.defaultSignUpData)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authFactory.signIn(authFactory.defaultSignInData)];
                case 2:
                    response = _a.sent();
                    token = response.body.token;
                    return [4 /*yield*/, testFactory.postTest(token)];
                case 3:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should answer with status 201 when trying to post a test with valid input values", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authFactory.signUp(authFactory.defaultSignUpData)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authFactory.signIn(authFactory.defaultSignInData)];
                case 2:
                    response = _a.sent();
                    token = response.body.token;
                    return [4 /*yield*/, testFactory.postTest(token, testFactory.defaultTestData)];
                case 3:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(201);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should answer with status 200 when trying to get tests group by disciplines", function () { return __awaiter(void 0, void 0, void 0, function () {
        var groupBy, response, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    groupBy = "disciplines";
                    return [4 /*yield*/, authFactory.signUp(authFactory.defaultSignUpData)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authFactory.signIn(authFactory.defaultSignInData)];
                case 2:
                    response = _a.sent();
                    token = response.body.token;
                    return [4 /*yield*/, testFactory.getTests(token, groupBy)];
                case 3:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should answer with status 200 when trying to get tests group by teachers", function () { return __awaiter(void 0, void 0, void 0, function () {
        var groupBy, response, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    groupBy = "teachers";
                    return [4 /*yield*/, authFactory.signUp(authFactory.defaultSignUpData)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authFactory.signIn(authFactory.defaultSignInData)];
                case 2:
                    response = _a.sent();
                    token = response.body.token;
                    return [4 /*yield*/, testFactory.getTests(token, groupBy)];
                case 3:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should answer with status 422 when trying to get tests with invalid 'groupBy' value", function () { return __awaiter(void 0, void 0, void 0, function () {
        var groupBy, response, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    groupBy = "invalid";
                    return [4 /*yield*/, authFactory.signUp(authFactory.defaultSignUpData)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authFactory.signIn(authFactory.defaultSignInData)];
                case 2:
                    response = _a.sent();
                    token = response.body.token;
                    return [4 /*yield*/, testFactory.getTests(token, groupBy)];
                case 3:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("should answer with status 422 when trying to get tests without 'groupBy' value", function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, authFactory.signUp(authFactory.defaultSignUpData)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, authFactory.signIn(authFactory.defaultSignInData)];
                case 2:
                    response = _a.sent();
                    token = response.body.token;
                    return [4 /*yield*/, testFactory.getTests(token)];
                case 3:
                    response = _a.sent();
                    expect(response.statusCode).toEqual(422);
                    return [2 /*return*/];
            }
        });
    }); });
});
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, db.$executeRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["DROP TABLE IF EXISTS users,categories,disciplines,teachers,\"teachersDisciplines\",terms,tests,\"_prisma_migrations\";"], ["DROP TABLE IF EXISTS users,categories,disciplines,teachers,\"teachersDisciplines\",terms,tests,\"_prisma_migrations\";"])))];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
var templateObject_1, templateObject_2;
