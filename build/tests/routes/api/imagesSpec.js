"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("../../../routes"));
const app = (0, express_1.default)();
app.use(routes_1.default);
describe("Test the images route", () => {
    it("should return a 200 status code and 'images api route' as the response", (done) => {
        (0, supertest_1.default)(app).get("/images").then((response) => {
            expect(response.status).toEqual(200);
            expect(response.text).toEqual("images api route");
            done();
        });
    });
});
