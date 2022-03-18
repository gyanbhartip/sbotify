import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../Styles/App.css";
import { setClientToken } from "../Utils/Spotify";
import Controls from "./Controls";
import Header from "./Header";
import Login from "./Login";
import Main from "./Main";
import Sidebar from "./Sidebar";

function App() {
  //defining and setting the auth token
  const [token, setToken] = useState();
  useEffect(() => {
    //getting the token from the local storage
    const token = window.localStorage.getItem("token");
    const hash = window.location.hash;
    //clear the hash value from the browser url
    window.location.hash = "";
    if (!token && hash) {
      //if there is no token in the local storage and there is a hash in the url
      const token = hash.split("&")[0].split("=")[1];
      window.localStorage.setItem("token", token);
      setToken(token);
      setClientToken(token);
    } else {
      //if there is a token in local storage, set it to state
      setToken(token);
      setClientToken(token);
    }
  }, []);
  return !token ? (
    //if token does not exist, show the login page
    <Login />
  ) : (
    //if token exists, show the main page
    <BrowserRouter>
      <div className="App">
        <div className="top-container">
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="right-container">
            <div className="header">
              <Header />
            </div>
            <div className="main">
              <Main />
            </div>
          </div>
          {/* <Routes>
            <Route path="/" element={<Header />} />
            <Route path="/Main" element={<Main />} />
          </Routes> */}
        </div>
        <div className="controls-container">
          <Controls />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
