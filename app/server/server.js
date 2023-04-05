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

let rooms = [];

app.get('/api', (req, res) => {
  console.log('sdjdkdja');
  res.status(200).json(rooms);
})

app.post('/api', (req, res) => {
  rooms.push(req.body.username);
  res.status(200).send('success');
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
})
