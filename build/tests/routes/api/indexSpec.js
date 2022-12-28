"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("../../../routes/api"));
const app = (0, express_1.default)();
app.use(api_1.default);
describe("Test the main route", () => {
    it("should return a 200 status code and 'main api route' as the response", (done) => {
        (0, supertest_1.default)(app).get("/").then((response) => {
            expect(response.status).toEqual(200);
            expect(response.text).toEqual("main api route");
            done();
        });
    });
});
