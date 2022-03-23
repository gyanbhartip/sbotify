import React, { useState, useEffect } from "react";
import { axiosCall } from "../Utils/Spotify";
import "../Styles/Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axiosCall.get("me");
      setProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <>
      <img src={profile?.images[0]["url"]} alt="" width="50px" />
      <h2>{profile?.["display_name"]}</h2>
      <h5>{profile?.["followers"]["total"]} followers</h5>
    </>
  );
};

export default Profile;
