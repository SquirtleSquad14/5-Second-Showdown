import React from "react";
import { Link } from "react-router-dom";
// import Player1 from '../assets/Player1.png';

const Battle = () => {
  return (
    <div>
      <div id="players-container">
        <div>
          Player 1
          <img id="img1" src='..assets/Palyer1' />
        </div>

        <div>
          <img id="img2" src="..assets/Player2.png" />
        </div>
      </div>
    </div>
  )
    
}

export default Battle;