// const express = require("express");
// const path = require("path");
// const app = express();
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const { Pool } = require("pg");
// const port = 3000;

// app.use(express.json());
// app.use(express.urlencoded());
// app.use(cookieParser());

// app.use(express.static(path.resolve(__dirname, "../client")));

// const pool = new Pool({
//   user: "ulieutid",
//   host: "mahmud.db.elephantsql.com",
//   database: "ulieutid",
//   password: "sADXf50qUYjfJ3jUTVrwtK6G5knFM_Q2",
//   port: 5432,
// });

// pool.connect(() => console.log("Connected to DB"));

// // ---------------------ROUTES---------------------

// app.get("/", (req, res) => {
//   res.send("What's up doc ?!");
// });

// app.get("/users", (req, res) => {
//   pool.query("SELECT * FROM users", (err, result) => {
//     if (err) {
//       console.error(err);
//       res.status(500).json({ message: "Internal server error" });
//       return;
//     }
//     console.log("yay");
//     res.send(result.rows);
//   });
// });

// // error handler
// app.use((err, req, res, next) => {
//   console.log(err);
//   res.status(500).send({ error: err });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { Pool, QueryResult } from "pg";

const app: express.Express = express();
const port: number = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static(path.resolve(__dirname, "../client")));

app.use(express.static(path.resolve(__dirname, "../client")));

const pool: Pool = new Pool({
  user: "ulieutid",
  host: "mahmud.db.elephantsql.com",
  database: "ulieutid",
  password: "sADXf50qUYjfJ3jUTVrwtK6G5knFM_Q2",
  port: 5432,
});

pool.connect(() => console.log("Connected to DB"));

app.get("/users", (req: Request, res: Response) => {
  pool.query("SELECT * FROM users", (err: Error, result: QueryResult) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    console.log("yay");
    res.send(result.rows);
  });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send({ error: err });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
