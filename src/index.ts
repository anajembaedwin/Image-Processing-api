import express from "express";

const app = express();
const port = 3000;

app.get('/api', (req: express.Request, res: express.Response) => {
  res.send('server working');
});

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
});
export default app;
