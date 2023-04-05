import React, { MouseEvent, useEffect, useState } from "react";
import {io} from "socket.io-client";


const socket = io('/');

const Battle = (): JSX.Element => {
  // const [activeRooms, setActiveRooms] = useState([]);
  // const [roomIsJoined, setRoomIsJoined] = useState(false);
  const [playerChoice, setPlayerChoice] = useState('');
  const [opponentChoice, setOpponentChoice] = useState('');

  // when socket changes (meaning we received data from the web socket, ie our opponent choose an attack) we  update our Opponent's choice
  useEffect(() => {
    console.log('socket', socket);
    socket.on('receive_choice', (data) => {
      setOpponentChoice(data.choice);
    })
  }, [socket]);

  // when socket changes we will check if we have an answer then render a gif dependent on the choices
  useEffect(() => {
    console.log();
    if (playerChoice && opponentChoice) {
      switch(true) {
        case (playerChoice === 'laser' && opponentChoice === 'punch'):
          console.log('shot the bro');
          break;

        case (playerChoice === 'laser' && opponentChoice === 'laser'):
          console.log('oof we shot eachother');
          break;

        case (playerChoice === 'laser' && opponentChoice === 'teleport'):
          console.log('dang hes fast');
          break;

        case (playerChoice === 'teleport' && opponentChoice === 'laser'):
          console.log('dodged and got the bro');
          break;

        case (playerChoice === 'teleport' && opponentChoice === 'punch'):
          console.log('oof he predicted my tp');
          break;

        case (playerChoice === 'teleport' && opponentChoice === 'teleport'):
          console.log('lol we switched places');
          break;

        case (playerChoice === 'punch' && opponentChoice === 'punch'):
          console.log('dang we punched eachother');
          break;

        case (playerChoice === 'punch' && opponentChoice === 'laser'):
          console.log('oh yea he has a gun');
          break;

        case (playerChoice === 'punch' && opponentChoice === 'teleport'):
          console.log('fist go brrrrr');
          break;
      };
    }
  }, [playerChoice, opponentChoice])

  const sendChoice = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const myChoice = e.currentTarget.id;
    console.log(myChoice, typeof myChoice);
    setPlayerChoice(e.currentTarget.id);
    socket.emit('send_choice', {choice: myChoice});
  }
  

  return (
    <div id="battle-container">
      <div id="attacks-display">
        <div>
          My Attack: {playerChoice ? `${playerChoice}` : 'N/A'}
        </div>

        <div>
          Their Attack: {opponentChoice ? `${opponentChoice}` : 'N/A'}
        </div>
      </div>

      <div id="players-container">
        <div>
          <img id="img1" src='../assets/Player1.png' />
        </div>

        <div>
          <img id="img2" src="../assets/Player2.png" />
        </div>
      </div>

      <div id="attacks-container">
        <button id="laser" onClick={sendChoice}>Laser</button>
        <button id="teleport" onClick={sendChoice}>Teleport</button>
        <button id="punch" onClick={sendChoice}>Punch</button>
      </div>
    </div>
  )
    
}

export default Battle;