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
const __1 = __importDefault(require("../../.."));
// import routes from "../../../routes";
describe("GET /api/images/full/:filename/:width/:height", () => {
    it("should return the file name of the resized image", () => __awaiter(void 0, void 0, void 0, function* () {
        // Set up the request parameters
        const filename = "fjord";
        const width = 400;
        const height = 300;
        console.log("we are sending the request");
        // Send the request
        const response = yield (0, supertest_1.default)(__1.default).get(`/api/images/full/${filename}/${width}/${height}`);
        console.log(`Here is the response ${response}`);
        // Verify the response
        expect(response.status).toBe(200);
    }));
});
