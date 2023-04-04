import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Oauth from "../Oauth";
import { googleLogout } from "@react-oauth/google";
import "../styles/login.css"

type Props = {};

const Login = ({}: Props): JSX.Element => {
    const [userID, setUserID] = useState<any>();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

  return (
    <div>
      <div className="login-container">
        <h1 id="login-banner">5 Second Showdown Login</h1>
      </div>
      <div>
        <form id='login-form' action='/login' method='POST' >
          <input type="text" id="uname" placeholder="Username" onChange={e => setUsername(e.target.value)}/>
          <input type="text" id="pword" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          <input type="button" value="Submit" />
          <input type="button" value="Sign Up" />
        </form>
        <div>
          <Oauth setUserID={setUserID} />
       </div>
      </div>

    </div>
  )
    
}

export default Login;