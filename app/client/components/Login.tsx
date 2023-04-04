import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Login = ({}: Props): JSX.Element => {
  return (
    <div>
      <div>
        <h1 id="login-banner">5 Second Showdown Login</h1>
      </div>
      <div>
        <form>
          <input type="text" id="uname" placeholder="Username" />
          <input type="text" id="pword" placeholder="Password" />
          <input type="button" value="Submit" />
          <input type="button" value="Sign Up" />
        </form>
      </div>
    </div>
  )
    
}

export default Login;