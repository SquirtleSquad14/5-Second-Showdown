import React, { MouseEvent, useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router'


const Battle = (props): JSX.Element => {
  const interval: any = useRef();
  const { socket, activeRoom } = props;
  const [timer, setTimer] = useState(5);
  const [resultAlert, setResultAlert] = useState('')
  const [playerChoice, setPlayerChoice] = useState('');
  const [opponentChoice, setOpponentChoice] = useState('');
  const [numPlayersReady, setNumPlayersReady] = useState(0);
  const [currentAnimation, setCurrentAnimation] = useState('../assets/idle.gif');

  console.log('NUM_READY', numPlayersReady);
  

  const navigate = useNavigate();

  // ! for now the functionality will be; gif runs for 2 seconds passed action then redirects to home/room page; alert says you won/etc

  // when socket changes (meaning we received data from the web socket, ie our opponent chose an attack) we  update our Opponent's choice
  useEffect(() => {
    // console.log('socket', socket);
    socket.on('receive_choice', (data) => {
      setOpponentChoice(data.choice);
    })
    socket.on('opponent_ready', (data) => {
      console.log('nPR', numPlayersReady);
      setNumPlayersReady(data);
      console.log('nPR after set', numPlayersReady + 1);
    })


  }, [socket]);

  useEffect(() => {
    if (numPlayersReady === 2) {
      interval.current = setInterval(() => setTimer((time) => time - 1), 1000);
    }
  }, [numPlayersReady]);

  // handles when a player(s) didnt attack
  const handleMissingAttacks = (playerAttack, opponentAttack) => {
    if (!playerAttack) {
      switch (true) {
        case (opponentAttack === 'laser'):
          playerAttack = 'punch';
          break;
        case (opponentAttack === 'punch'):
          playerAttack = 'teleport';
          break;
        case (opponentAttack === 'teleport'):
          playerAttack = 'laser';
          break;
      }
    } 

    if (!opponentAttack) {
      switch (true) {
        case (playerAttack === 'laser'):
          opponentAttack = 'punch'
          break;
        case (playerAttack === 'punch'):
          opponentAttack = 'teleport'
          break;
        case (playerAttack === 'teleport'):
          opponentAttack = 'laser';
          break;
      }
    } 

    if (!opponentAttack && !playerAttack) {
      opponentAttack = 'punch';
      playerAttack = 'punch';
    }
  }

  // when timer reaches zero we will check players choices then render a gif accordingly
  useEffect(() => {
    if (timer === 0) {
      // clear the set interval
      clearInterval(interval.current);

      // designate if player didnt choose
      handleMissingAttacks(playerChoice, opponentChoice);

      switch(true) {
        case (playerChoice === 'laser' && opponentChoice === 'punch'):
          console.log('shot the bro');
          setCurrentAnimation('../assets/lzr-pnch.gif');
          setResultAlert('You Won!')
          break;

        case (playerChoice === 'laser' && opponentChoice === 'laser'):
          console.log('oof we shot eachother');
          setCurrentAnimation('../assets/lzr-lzr.gif');
          setResultAlert('You tied...')
          break;

        case (playerChoice === 'laser' && opponentChoice === 'teleport'):
          console.log('dang hes fast');
          setCurrentAnimation('../assets/lzr-tp.gif');
          setResultAlert('You lost...')
          break;

        case (playerChoice === 'teleport' && opponentChoice === 'laser'):
          console.log('dodged and got the bro');
          setCurrentAnimation('../assets/tp-lzr.gif');
          setResultAlert('You Won!')
          break;

        case (playerChoice === 'teleport' && opponentChoice === 'punch'):
          console.log('oof he predicted my tp');
          setCurrentAnimation('../assets/tp-pnch.gif');
          setResultAlert('You lost...')
          break;

        case (playerChoice === 'teleport' && opponentChoice === 'teleport'):
          console.log('lol we switched places');
          setCurrentAnimation('../assets/tp-tp.gif');
          setResultAlert('You tied...')
          break;

        case (playerChoice === 'punch' && opponentChoice === 'punch '):
          console.log('dang we punched eachother');
          setCurrentAnimation('../assets/pnch-pnch.gif');
          setResultAlert('You tied...')
          break;

        case (playerChoice === 'punch' && opponentChoice === 'laser'):
          console.log('oh yea he has a gun');
          setCurrentAnimation('../assets/pnch-lzr.gif');
          setResultAlert('You lost...')
          break;

        case (playerChoice === 'punch' && opponentChoice === 'teleport'):
          console.log('fist go brrrrr');
          setCurrentAnimation('../assets/pnch-tp.gif');
          setResultAlert('You Won!')
          break;
      };
      // setTimeout(() => navigate('/login'), 3800)
    }
  }, [timer])

  const sendChoice = (e: MouseEvent<HTMLButtonElement>) => {
    if (timer === 0) return;
    e.preventDefault();
    const myChoice = e.currentTarget.id;
    console.log(myChoice, typeof myChoice);
    setPlayerChoice(myChoice);
    socket.emit('send_choice', {choice: myChoice, room: activeRoom});
  }

  const startMatchHandler = () => {
    socket.emit('player_ready', {numPlayers: numPlayersReady + 1, room: activeRoom});
    setNumPlayersReady(numPlayersReady + 1);
  };

  return (
    <div id="battle-container">
      <div id="attacks-display">
        {numPlayersReady === 2 && <p>{timer}</p>}
        <div>
          My Attack: {playerChoice ? `${playerChoice}` : 'N/A'}
        </div>

        <div>
          Their Attack: {opponentChoice ? `${opponentChoice}` : 'N/A'}
        </div>
      </div>

      <div id="battle-scene">
        <div id="result-alert">{resultAlert}</div>

        <img src={currentAnimation} id="currentAnimation"/>
      </div>

      {/* <div id="players-container">
        <div>
          <img id="img1" src='../assets/Player1.png' />
        </div>

        <div>
          <img id="img2" src="../assets/Player2.png" />
        </div>
      </div> */}

      <div id="attacks-container">
        {numPlayersReady === 2 ?
        <div>
          <button id="laser" onClick={sendChoice}>Laser</button>
          <button id="teleport" onClick={sendChoice}>Teleport</button>
          <button id="punch" onClick={sendChoice}>Punch</button>
        </div> :
          <button onClick={startMatchHandler}>Start Match {numPlayersReady}/2</button>}
      </div>
    </div>
  )
    
}

export default Battle;