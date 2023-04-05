import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";

const Home = (): JSX.Element => {
    // const [token, setToken] = useState();

  // if (!token) {
  //   return <Login setToken={setToken} />
  // }
  
  return (
    <div>
      <h1>Want More?</h1>

      <div>Animation will go here, changes on looking for players</div>

      <button>Look for -unique name?- opponents</button>
    </div>
  )
    
}

export default Home;
