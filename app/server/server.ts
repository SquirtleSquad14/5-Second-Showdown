import express, { Request, Response, NextFunction } from "express";
import path from "path";
import cookieParser from "cookie-parser";
import controller from "../server/controller";

const app: express.Express = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const port: number = 3000;
const cors = require('cors');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

app.use(express.static(path.resolve(__dirname, "../client")));

app.get("/", (req, res) => res.redirect("/login"));

app.get("/users", controller.getAllUsers, (req, res) => res.status(200));

app.post("/getUser", controller.getUser, (req, res) => res.status(200))

app.post("/signup", controller.signUp, (req, res) => res.status(200).json(res.locals.urlExtension));

app.post("/login", controller.login, (req, res) => res.status(200).json(res.locals.urlExtension));

app.post("/google", controller.googleSL, (req, res) => res.status(200));

const rooms = [{id: 'room1'}, {id: 'room2'}];

app.get('/api', (req, res) => {
  console.log('sdjdkdja');
  res.status(200).json(rooms);
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send({ error: err });
});

const server = app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
})

// ------------------SOCKET---------------------------

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:8080',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`user connected ${socket.id}`);
  
  socket.on('send_choice', (data) => {
    socket.broadcast.emit('receive_choice', data);
  });
})