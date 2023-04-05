import React, {MouseEvent} from "react";
import { useEffect, useState } from "react";
import {io} from "socket.io-client";
const socket = io('/');

const App = () => {
  const [activeRooms, setActiveRooms] = useState([]);
  const [roomIsJoined, setRoomIsJoined] = useState(false);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [opponentChoice, setOpponentChoice] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await fetch('/api');
      const rooms = await data.json();
      setActiveRooms(rooms);
    }
    fetchRooms();
  }, [socket]);

  useEffect(() => {
    socket.on('receive_choice', (data) => {
      setOpponentChoice(data.choice);
    })
  }, [socket]);

  const sendChoice = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(e.currentTarget.id);
    setPlayerChoice(e.currentTarget.id);
    socket.emit('send_choice', {choice: e.currentTarget.id});
  }

  const getRooms = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const data = await fetch('/api');
    const rooms = await data.json();
    setActiveRooms(rooms);
  }

  return <div>
    {roomIsJoined ?     <div>
    <div>me: {playerChoice ? `${playerChoice}` : 'N/A'}</div>
    <div>opponent: {opponentChoice ? `${opponentChoice}` : 'N/A'}</div>
    <button onClick={sendChoice} id='rock'>rock</button>
    <button onClick={sendChoice} id='paper'>paper</button>
    <button onClick={sendChoice} id='scissors'>scissors</button>
    </div> : <div>
      <button>Find Opponent</button>
      <button onClick={getRooms}>Get rooms</button>
      {activeRooms.map((room) => {
        return <div key={room.id}>{room.id}</div>
      })}
    </div>}

  </div>
}

export default App;