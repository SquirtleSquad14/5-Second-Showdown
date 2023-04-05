import React, {ChangeEvent, FormEvent} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
// import Oauth from "./Oauth";
import { googleLogout } from "@react-oauth/google";
import "../styles/login.css";

type Props = {};

interface props {
  setUsername: any,
  setGoogleID: any
}

const Login: React.FC<props> = ({setUsername, setGoogleID}: props): JSX.Element => {
  const navigate = useNavigate();
  const [usernameInput, setUsernameInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsernameInput(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPasswordInput(event.target.value);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      });
      setUsername(usernameInput)
      const urlExtension = await response.json();
      // console.log(urlExtension);
      navigate(`${urlExtension}`)

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h1 id="login-banner">Login</h1>
      </div>
      <div className="form-container">
        <form onSubmit ={handleFormSubmit} id="input-form">
          <div>
            <input type="text" id="uname" placeholder="Username" onChange={handleUsernameChange}></input>
          </div>
          <div>
            <input type="text" id="pword" placeholder="Password" onChange={handlePasswordChange}></input>
          </div>
          <div className="choose-btns">
            <button id="submit-btn">Submit</button>
            {/* <input type="button" id="submit-btn" value="Submit" />
            <input type="button" id="signup-btn" value="Sign Up" /> */}
          </div>
        </form>
        {/* <div className="google-btn">
          <Oauth setGoogleID={setGoogleID} />
        </div> */}
        <div>
          <button id="signup-btn">
            <Link id="signup-btn" to="/signup">
              Sign Up Here
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
