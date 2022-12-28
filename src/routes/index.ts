import express from "express";

const routes = express.Router();

routes.get('/', (req: express.Request, res: express.Response) => {
    res.send('main api route');
});

export default routes;