import { Pool, QueryResult } from "pg";
import { Request, Response } from "express";
import { nextTick } from "process";
import { resolveTxt } from "dns";

const pool: Pool = new Pool({
  user: "ulieutid",
  host: "mahmud.db.elephantsql.com",
  database: "ulieutid",
  password: "sADXf50qUYjfJ3jUTVrwtK6G5knFM_Q2",
  port: 5432,
});

pool.connect(() => console.log("Connected to DB"));

interface Controller {
  getAllUsers(req: Request, res: Response, next): void;
  signUp(req: Request, res: Response, next): void;
  login(req: Request, res: Response, next): void;
  googleSL(req: Request, res: Response, next): void;
}

const controller: Controller = {
  getAllUsers: (req: Request, res: Response, next) => {
    pool.query("SELECT * FROM users", (err: Error, result: QueryResult) => {
      if (err) {
        return next(err);
      }
      res.json(result.rows);
    });
  },

  signUp: async (req: Request, res: Response, next) => {
    const { username, password } = req.body;

    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      if (result.rows.length > 0) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const newUser = await pool.query(
        "INSERT INTO users (username, password, wins) VALUES ($1, $2, $3) RETURNING *",
        [username, password, 0]
      );

      res.status(201).json({
        message: "User created",
        data: newUser.rows[0],
      });
    } catch (err) {
      return next(err);
    }
  },

  login: async (req: Request, res: Response, next) => {
    try {
      const { username, password } = req.body;
      const userQuery = "SELECT * FROM users WHERE username=$1";
      const userResult = await pool.query(userQuery, [username]);

      if (userResult.rowCount === 0) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const user = userResult.rows[0];

      if (user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      res.status(200).json({ message: "Login success", data: user });
    } catch (err) {
      return next(err);
    }
  },

  googleSL: async (req: Request, res: Response, next) => {
    const { googleId, username } = req.body;

    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE googleid = $1",
        [googleId]
      );

      if (result.rows.length === 0) {
        const newUser = await pool.query(
          "INSERT INTO users (googleid, username, wins) VALUES ($1, $2, $3)",
          [googleId, username, 0]
        );
        res
          .status(201)
          .send({ message: "User created", data: newUser.rows[0] });
      } else {
        const user = result.rows[0];

        if (user.username !== username) {
          res.status(400).json({ message: "Username does not match" });
          return;
        }

        res.status(200).json({ message: "Login success", data: user });
      }
    } catch (err) {
      return next(err);
    }
  },
};

export default controller;
