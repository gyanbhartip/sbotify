import React from "react";
import { Outlet } from "react-router-dom";
import Profile from "./Profile";

const Main = () => {
  return (
    <div>
      {/* <h2>Main</h2> */}
      <Outlet />
    </div>
  );
};

export default Main;
