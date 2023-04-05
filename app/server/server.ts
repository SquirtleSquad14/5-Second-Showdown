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

let rooms = [];

app.get('/api', (req, res) => {
  res.status(200).json(rooms);
})

app.post('/api', (req, res) => {
  rooms.push(req.body.room);
  res.status(200).send('success');
})

app.post('/api', (req, res) => {
  rooms.push(req.body.room);
  res.status(200).send('success');
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

  socket.on('join_room', (data) => {
    socket.join(data);
    const roomSize = io.sockets.adapter.rooms.get(data).size;
    if (roomSize === 2) {
      console.log('capacity hit');
      rooms = rooms.filter((room) => room !== data);
      console.log(rooms);
      socket.broadcast.emit('receive_new_rooms', rooms);
    }
  })
  
  socket.on('send_choice', (data) => {
    socket.to(data.room).emit('receive_choice', data);
  });

  socket.on('add_room', (data) => {
    console.log('add room');
    socket.broadcast.emit('receive_new_rooms', rooms);
  })

  socket.on('player_ready', (data) => {
    socket.to(data.room).emit('opponent_ready', data.numPlayers);
  })
})
