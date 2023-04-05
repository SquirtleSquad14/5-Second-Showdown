import React, {ChangeEvent, FormEvent} from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/login.css";

interface props {
  setUsername: any
  setGoogleID: any
}

const Signup: React.FC<props> = ({setUsername, setGoogleID}: props): JSX.Element => {

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
      const response = await fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: usernameInput, password: passwordInput }),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h1 id="login-banner">5 Second Showdown Sign Up</h1>
      </div>
      <div className="form-container">
        <form id="input-form" onSubmit={handleFormSubmit}>
          <div>
            <input type="text" id="uname" placeholder="Username" onChange={handleUsernameChange}></input>
          </div>
          <div>
            <input type="text" id="pword" placeholder="Password" onChange={handlePasswordChange}></input>
          </div>
          <div className="choose-btns">
            <button id="submit-btn">Submit</button>
          </div>
        </form>
        <div>
          <button id="back-btn">
            <Link id="back-btn" to="/login">
              Go Back to Login
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
