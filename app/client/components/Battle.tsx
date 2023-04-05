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
    let urChoice;
    let opChoice;

    if (opponentAttack === '' && playerAttack === '') {
      setOpponentChoice('punch');
      opChoice = 'punch';
      setPlayerChoice('punch');
      urChoice = 'punch';
    }

    if (playerAttack && opponentAttack) {
      opChoice = playerAttack;
      urChoice = opponentChoice;
    }

    if (playerAttack === '') {
      switch (true) {
        case (opponentAttack === 'laser'):
          setPlayerChoice('punch');
          urChoice = 'punch';
          break;
        case (opponentAttack === 'punch'):
          setPlayerChoice('teleport');
          urChoice = 'teleport';
          break;
        case (opponentAttack === 'teleport'):
          setPlayerChoice('laser');
          urChoice = 'laser';
          break;
      }
    } 

    if (opponentAttack === '') {
      switch (true) {
        case (playerAttack === 'laser'):
          setOpponentChoice('punch');
          opChoice = 'punch';
          break;
        case (playerAttack === 'punch'):
          setOpponentChoice('teleport');
          opChoice = 'teleport';
          break;
        case (playerAttack === 'teleport'):
          setOpponentChoice('laser');
          opChoice = 'laser';
          break;
      }
    } 

    return {
      urChoice: urChoice,
      opChoice: opChoice
    }
  }

  // when timer reaches zero we will check players choices then render a gif accordingly
  useEffect(() => {
    if (timer === 0) {
      console.log('checking choices')
      // clear the set interval
      clearInterval(interval.current);

      // designate if player didnt choose
      const { urChoice, opChoice } = handleMissingAttacks(playerChoice, opponentChoice);

      console.log('u:', urChoice, 'them:', opChoice)

      switch(true) {
        case (urChoice === 'laser' && opChoice === 'punch'):
          console.log('shot the bro');
          setCurrentAnimation('../assets/lzr-pnch.gif');
          setResultAlert('You Won!')
          break;

        case (urChoice === 'laser' && opChoice === 'laser'):
          console.log('oof we shot eachother');
          setCurrentAnimation('../assets/lzr-lzr.gif');
          setResultAlert('You tied...')
          break;

        case (urChoice === 'laser' && opChoice === 'teleport'):
          console.log('dang hes fast');
          setCurrentAnimation('../assets/lzr-tp.gif');
          setResultAlert('You lost...')
          break;

        case (urChoice === 'teleport' && opChoice === 'laser'):
          console.log('dodged and got the bro');
          setCurrentAnimation('../assets/tp-lzr.gif');
          setResultAlert('You Won!')
          break;

        case (urChoice === 'teleport' && opChoice === 'punch'):
          console.log('oof he predicted my tp');
          setCurrentAnimation('../assets/tp-pnch.gif');
          setResultAlert('You lost...')
          break;

        case (urChoice === 'teleport' && opChoice === 'teleport'):
          console.log('lol we switched places');
          setCurrentAnimation('../assets/tp-tp.gif');
          setResultAlert('You tied...')
          break;

        case (urChoice === 'punch' && opChoice === 'punch '):
          console.log('dang we punched eachother');
          setCurrentAnimation('../assets/pnch-pnch.gif');
          setResultAlert('You tied...')
          break;

        case (urChoice === 'punch' && opChoice === 'laser'):
          console.log('oh yea he has a gun');
          setCurrentAnimation('../assets/pnch-lzr.gif');
          setResultAlert('You lost...')
          break;

        case (urChoice === 'punch' && opChoice === 'teleport'):
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
          <img id="img1" src="../assets/Player1.png" />
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
  );
};

export default Battle;
