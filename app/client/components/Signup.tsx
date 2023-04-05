import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/login.css"




const Signup = (): JSX.Element => {

    const [userID, setUserID] = useState<any>();
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

  return (
    <div>
      <div>
        <h1 id="login-banner">5 Second Showdown Sign Up</h1>
      </div>
      <div className="form-container">
        <form id='input-form' action='/signup' method='POST' >
          <div>
            <input type="text" id="uname" placeholder="Username"></input> 
          </div>
          <div>
            <input type="text" id="pword" placeholder="Password"></input>
          </div>
          <div className= "choose-btns">
            <button id="submit-btn">Submit</button>
          </div>
        </form>
       <div>
          <button id="back-btn"><Link id="back-btn" to='/login'>Go Back to Login</Link></button>
       </div>
      </div>

    </div>
  )
    
}
export default Signup;