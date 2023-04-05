import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import controller from "./controller";

const app: express.Express = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "../client")));

app.get("/users", controller.getAllUsers, (req, res) => res.status(200));

app.post("/signup", controller.signUp, (req, res) => res.status(200));

app.post("/login", controller.login, (req, res) => res.status(200));

app.post("/google", controller.googleSL, (req, res) => res.status(200));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
