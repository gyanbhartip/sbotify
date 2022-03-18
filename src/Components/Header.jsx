import React, { useEffect, useState } from "react";
import apiClient from "../Utils/Spotify";

const Header = () => {
  //getting the logged in user's name & profile image's url
  const [name, setName] = useState();
  const [image, setImage] = useState("https://picsum.photos/100");
  useEffect(() => {
    const fetchUserImage = async () => {
      const { data } = await apiClient.get("me");
      setName(data.display_name);
      setImage(data.images[0].url);
    };
    fetchUserImage();
  }, []);

  //logging out of the session
  const logOut = () => {
    window.localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div>
      <img src={image} alt="" />
      <h2>{name}</h2>
      <button onClick={logOut}>Logout</button>
    </div>
  );
};

export default Header;
