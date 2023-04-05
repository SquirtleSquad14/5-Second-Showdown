import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Oauth from "./Oauth";
import { googleLogout } from "@react-oauth/google";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Battle from "./components/Battle";
import {io} from "socket.io-client";
import './styles/styles.css'

const socket = io('/');


const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <h1>5 Second Showdown</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/home">Home</Link>
      <Link to="/battle">Battle</Link>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home socket={socket} />}></Route>
        <Route path="/battle" element={<Battle socket={socket} />}></Route>
      </Routes>
    </BrowserRouter>
  )
}




const App: React.FC<any> = () => {
  const [userID, setUserID] = useState<any>();

  return (
    <div>
      <Oauth setUserID={setUserID} />
      <div>hello world</div>
    </div>
  );
};

export default App;

export default App;