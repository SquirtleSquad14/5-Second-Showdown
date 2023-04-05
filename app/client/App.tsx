import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Oauth from "./components/Oauth";
import { googleLogout } from "@react-oauth/google";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Battle from "./components/Battle";
import './styles/styles.css'


const App: React.FC = (): JSX.Element => {

  const [username, setUsername] = useState<any>()
  const [googleID, setGoogleID] = useState<any>()

  return (
    <BrowserRouter>
      <h1>5 Second Showdown</h1>
      <Link to="/login">Login</Link>
      <Link to="/signup">Signup</Link>
      <Link to="/home">Home</Link>
      <Link to="/battle">Battle</Link>
      <Routes>
        <Route path="/login" element={<Login setUsername={setUsername} setGoogleID={setGoogleID}/>}></Route>
        <Route path="/signup" element={<Signup setUsername={setUsername} setGoogleID={setGoogleID}/>}></Route>
        <Route path="/home" element={<Home username={username} googleID={googleID}/>}></Route>
        <Route path="/battle" element={<Battle />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

