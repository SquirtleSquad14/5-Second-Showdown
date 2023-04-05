import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Oauth from "./Oauth";
import { googleLogout } from "@react-oauth/google";
import "../styles/login.css";

type Props = {};

const Login = ({}: Props): JSX.Element => {
  const [userID, setUserID] = useState<any>();
  // const [username, setUsername] = useState();
  // const [password, setPassword] = useState();

  return (
    <div>
      <div>
        <h1 id="login-banner">5 Second Showdown Login</h1>
      </div>
      <div className="form-container">
        <form id="input-form" action="/login" method="POST">
          <div>
            <input type="text" id="uname" placeholder="Username"></input>
          </div>
          <div>
            <input type="text" id="pword" placeholder="Password"></input>
          </div>
          <div className="choose-btns">
            <button id="submit-btn">Submit</button>
            {/* <input type="button" id="submit-btn" value="Submit" />
            <input type="button" id="signup-btn" value="Sign Up" /> */}
          </div>
        </form>
        <div className="google-btn">
          <Oauth setUserID={setUserID} />
        </div>
        <div>
          <button id="signup-btn">
            <Link id="signup-btn" to="/signup">
              Sign Up
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
