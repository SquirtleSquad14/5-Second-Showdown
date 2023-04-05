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
  homepage(req: Request, res: Response, next): void;
  signUp(req: Request, res: Response, next): void;
  login(req: Request, res: Response, next): void;
  googleSL(req: Request, res: Response, next): void;
  getUser(req: Request, res: Response, next): void;
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

  homepage: async (req: Request, res: Response, next) => {
    console.log('in homepage controller?');
    try {

    }catch{

    }
  },

  signUp: async (req: Request, res: Response, next) => {
    console.log('in signup controller?')
    const { username, password } = req.body;
    console.log(req.body);
    try {
      const result = await pool.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );

      if (result.rows.length > 0) {
        return res.status(400).json({ error: "Username already exists" });
      }

      const newUser = await pool.query(
        "INSERT INTO users (username, password, wins, losses) VALUES ($1, $2, $3, $4) RETURNING *",
        [username, password, 0, 0]
      );

      res.redirect('/home')
    } catch (err) {
      console.log('signup error: ', err)
      return next(err);
    }
  },

  login: async (req: Request, res: Response, next) => {
    console.log('in login controller?')
    const { username, password } = req.body;
    console.log(req.body);
    try {
      const userQuery = "SELECT * FROM users WHERE username=$1";
      const userResult = await pool.query(userQuery, [username]);

      if (userResult.rowCount === 0) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const user = userResult.rows[0];

      if (user.password !== password) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      res.redirect('/home')
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
          "INSERT INTO users (googleid, username, wins, losses) VALUES ($1, $2, $3, $4)",
          [googleId, username, 0, 0]
        );
        res.redirect('/home')
      } else {
        res.redirect('/home')
      }
    } catch (err) {
      return next(err);
    }
  },

  getUser: async (req: Request, res: Response, next) => {
    const {username, googleID} = req.body;

    try {
      if (username) {
        const result = await pool.query(
          "SELECT * FROM users WHERE username = $1",
          [username]
        );
        res.status(200).json(result.rows[0])
      } else if (googleID){
        const result = await pool.query(
          "SELECT * FROM users WHERE googleid = $1",
          [googleID]
          )
          res.status(200).json(result.rows[0])
      }
    } catch (err) {
      return next(err)
    }
  },
};

export default controller;
