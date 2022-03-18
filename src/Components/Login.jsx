import React from "react";
import "../Styles/Login.css";
import { loginEndpoint } from "../Utils/Spotify";

const Login = () => {
  return (
    <div className="login-page">
      <img
        src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
        alt="Spotify Logo"
        className="logo"
      />
      <a href={loginEndpoint}>
        <div className="login-btn">Log In</div>
      </a>
    </div>
  );
};

export default Login;
