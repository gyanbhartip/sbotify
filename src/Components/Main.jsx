import React from "react";
import { Outlet } from "react-router-dom";
import Profile from "./Profile";

const Main = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Main;
