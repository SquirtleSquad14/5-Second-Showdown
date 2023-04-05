import React, {MouseEvent} from "react";
import { useEffect, useState, useRef } from "react";
import {io} from "socket.io-client";
const socket = io('/');

const App = () => {
  const inputRef = useRef(null);
  const [activeRooms, setActiveRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);
  const [username, setUsername] = useState('DEFAULT');

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await fetch('/api');
      const rooms = await data.json();
      setActiveRooms(rooms);
    }
    fetchRooms();
    console.log('fetchrooms');
  }, [socket]);

  useEffect(() => {
    socket.on('receive_choice', (data) => {
      setOpponentChoice(data.choice);
    })
    socket.on('receive_new_rooms', (data) => {
      console.log('receive', data);
      setActiveRooms(data);
    })
  }, [socket]);

  const sendChoice = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.id);
    setPlayerChoice(e.currentTarget.id);
    socket.emit('send_choice', {choice: e.currentTarget.id, room: currentRoom});
  }

  const getRooms = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = await fetch('/api');
    const rooms = await data.json();
    console.log('rooms', rooms);
    setActiveRooms(rooms);
  }

  const setUsernameHandler = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setUsername(inputRef.current.value);
    inputRef.current.value = '';
  }

  const createRoom = async () => {
    const data = await fetch('/api', {method: 'POST', headers: {'Content-Type' : 'application/json'}, body: JSON.stringify({username})});
    console.log(data);
    setCurrentRoom(username);
    socket.emit('add_room', {username});
    socket.emit('join_room', username);
  }

  console.log('user', username);

  return <div>
    {currentRoom ?     <div>
    <div>me: {playerChoice ? `${playerChoice}` : 'N/A'}</div>
    <div>opponent: {opponentChoice ? `${opponentChoice}` : 'N/A'}</div>
    <button onClick={sendChoice} id='rock'>rock</button>
    <button onClick={sendChoice} id='paper'>paper</button>
    <button onClick={sendChoice} id='scissors'>scissors</button>
    </div> : <div>
      <input ref={inputRef}></input>
      <button onClick={setUsernameHandler}>set username</button>
      <button onClick={createRoom}>Find Opponent</button>
      <button onClick={getRooms}>Get rooms</button>
      <h1>{username}</h1>
      {activeRooms.map((room) => {
        return <div key={room} onClick={() => {
          socket.emit('join_room', room);
          setCurrentRoom(room);
        }}>{room}</div>
      })}
    </div>}

  </div>
}

export default App;