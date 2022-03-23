import React, { useEffect, useState } from "react";
import { axiosCall } from "../Utils/Spotify";
import "../Styles/Header.css";
import { BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
  //logout button toggle
  const [isDropdownClicked, setIsDropdownClicked] = useState(false);
  const dropdownClickHandler = () => {
    setIsDropdownClicked(!isDropdownClicked);
  };
  //getting the logged in user's name & profile image's url
  const [name, setName] = useState();
  const [image, setImage] = useState("https://picsum.photos/100");
  useEffect(() => {
    const fetchUserImage = async () => {
      const { data } = await axiosCall.get("me");
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
    <>
      <div className="user-info-container" onClick={dropdownClickHandler}>
        <div className="visible-wrapper">
          <img src={image} alt="" className="user-image" />
          <h2 className="user-name">{name}</h2>
          {isDropdownClicked ? <BsCaretUpFill /> : <BsCaretDownFill />}
        </div>
        {isDropdownClicked && (
          <div className="logout-container">
            <button className="logout-button" onClick={logOut}>
              Logout
            </button>
            <Link to="profile">
              <button className="logout-button">Profile</button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
