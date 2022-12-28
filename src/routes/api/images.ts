import express from "express";

const images = express.Router();

images.get('/', (req: express.Request, res: express.Response) => {
    res.send('images api route');
});

export default images;