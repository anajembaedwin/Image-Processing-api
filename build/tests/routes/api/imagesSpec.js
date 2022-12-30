"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const routes_1 = __importDefault(require("../../../routes"));
describe("GET /images/:filename/:width/:height", () => {
    it("should return the file name of the resized image", () => __awaiter(void 0, void 0, void 0, function* () {
        // Set up the request parameters
        const filename = "fjord.jpg";
        const width = 400;
        const height = 300;
        // Send the request
        const response = yield (0, supertest_1.default)(routes_1.default).get(`/images/${filename}/${width}/${height}`);
        // Verify the response
        expect(response.status).toBe(200);
        expect(response.text).toBe(filename);
    }));
});
