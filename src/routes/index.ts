import express from "express";
import images from "./api/images";
import logger from "../utilities/logger";

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response) => {
    res.send('main api route');
});

routes.use('/images/full/:filename/:width/:height', logger, images);

export default routes;