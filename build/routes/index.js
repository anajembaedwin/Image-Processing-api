"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const images_1 = __importDefault(require("./api/images"));
// import logger from "../utilities/logger";
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.send('main api route');
});
routes.use('/images', images_1.default);
exports.default = routes;
