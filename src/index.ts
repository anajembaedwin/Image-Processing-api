import express from "express";
import routes from "./routes/api";

const app = express();
const port = 3000;

app.use("/api", routes);
// app.get('/api', (req: express.Request, res: express.Response) => {
//   res.send('server working');
// });

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}/api`);
});
export default app;
    