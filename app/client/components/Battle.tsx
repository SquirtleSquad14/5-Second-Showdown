import React, { MouseEvent, useEffect, useState } from "react";
import {io} from "socket.io-client";

const Battle = (): JSX.Element => {

  // will need handleClicks that will run a gif as well as end the turn depending on the logic
  

  return (
    <div id="battle-container">
      <div id="players-container">
        <div>
          <img id="img1" src='../assets/Player1.png' />
        </div>

        <div>
          <img id="img2" src="../assets/Player2.png" />
        </div>
      </div>

      <div id="attacks-container">
        <button id="laser">Laser</button>
        <button id="teleport">Teleport</button>
        <button id="punch">Punch</button>
      </div>
    </div>
  )
    
}

export default Battle;