import express from "express";
import routes from "./routes";
import logger from "./utilities/logger";
import cors from "cors";

// Create the Express app
const app = express();

// Set the port for the API to listen on
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Enable routes
app.use("/api", logger, routes);

// Start the server
app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/api`);
});

export default app;
