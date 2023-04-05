import React, {useState, useEffect, useRef} from "react";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import Battle from "./Battle";
import Login from "../components/Login";
import '../styles/home.css';
interface props {
  username: any
  googleID: any
  socket: any
}

const Home: React.FC<props> = ({username, googleID, socket}: props): JSX.Element => {

  const [userData, setUserData] = useState()

  // const {socket} = props;

  const roomRef = useRef(null);
  const [activeRooms, setActiveRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const data = await fetch('/api');
      const rooms = await data.json();
      setActiveRooms(rooms);
    }
    fetchRooms();
  }, []);

  useEffect(() => {
    socket.on('receive_new_rooms', (data) => {
      setActiveRooms(data);
    })
  }, [socket]);

  const createRoomHandler = async () => {
    if (activeRooms.includes(roomRef.current.value)) return;
    const data = await fetch('/api', {method: 'POST', headers: {'Content-Type' : 'application/json'}, body: JSON.stringify({room: roomRef.current.value})});
    socket.emit('add_room');
    socket.emit('join_room', roomRef.current.value);
    setSelectedRoom(roomRef.current.value);
  }

  const joinRoomButtonHandler = (e) => {
    socket.emit('join_room', e.currentTarget.id);
    setSelectedRoom(e.currentTarget.id);
  }

  // const getGoogleInfo = async () => {
  //   try {
  //     const response = await fetch('/getUser', {
  //       method: "GET",
  //       headers: {
  //         'Content-Type' : 'application/json',
  //       },
  //       body: JSON.stringify({googleID})
  //     })
  //     .then((res) => res.json())
  //     .then((data) => setUserData(data))
  //   }catch (err) {
  //     console.log("error");
  //   }
  // }
 
  return (
    <div>
      {selectedRoom ? <Battle socket={socket} activeRoom={selectedRoom}/> : 
      <div>
        <input ref={roomRef}></input>
        <button onClick={createRoomHandler}>Create Room</button>
        <br></br>
        <div className='room-container'>
          {activeRooms.map((room): JSX.Element => {
            return <button className='room-button' onClick={joinRoomButtonHandler} key={room} id={room}>{room}</button>
          })}
        </div>
      </div>}
    </div>
  )
    
}


export default Home;