const express = require('express');
const app = express();
const { createServer } = require('http');
const { Server } = require('socket.io');
const port = 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(cors());

// ---------------------ROUTES---------------------

const rooms = [{id: 'room1'}, {id: 'room2'}];

app.get('/api', (req, res) => {
  console.log('sdjdkdja');
  res.status(200).json(rooms);
})

app.use((err, req, res, next) => {
  console.log('err', err);
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
