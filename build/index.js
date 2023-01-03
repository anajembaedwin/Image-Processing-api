"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const logger_1 = __importDefault(require("./utilities/logger"));
const cors_1 = __importDefault(require("cors"));
// Create the Express app
const app = (0, express_1.default)();
// Set the port for the API to listen on
const port = 3000;
// Enable CORS for all routes
app.use((0, cors_1.default)());
// Enable routes
app.use('/api', logger_1.default, routes_1.default);
// Start the server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/api`);
});
exports.default = app;
