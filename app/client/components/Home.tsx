import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";

interface props {
  username: string
  googleID: any
}

const Home: React.FC<props> = ({username, googleID}: props): JSX.Element => {

  const [userData, setUserData] = useState()

  const getUserInfo = async () => {
    try {
      const response = await fetch('/getUser', {
        method: "GET",
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({username})
      })
      .then((res) => res.json())
      .then((data) => {
        console.log('user data: ', data)
        setUserData(data)})
    }catch (err) {
      console.log("error");
    }
  }

  const getGoogleInfo = async () => {
    try {
      const response = await fetch('/getUser', {
        method: "GET",
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify({googleID})
      })
      .then((res) => res.json())
      .then((data) => setUserData(data))
    }catch (err) {
      console.log("error");
    }
  }

  useEffect(() => {
    if (username) getUserInfo();
    else if (googleID) getGoogleInfo()
  }, []);
 
  return (
    <div>
      <h1>Want More?</h1>

      <div>Animation will go here, changes on looking for players</div>

      <button>Look for -unique name?- opponents</button>
    </div>
  )
    
}

export default Home;
