import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../redux/features/profile/profileSlice";
import { axiosCall } from "../Utils/Spotify";
import "../Styles/Profile.css";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((store) => store.profile);

  // const [profile, setProfile] = useState();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await axiosCall.get("me");
      dispatch(setProfile(data));
    };
    fetchProfile();
  }, [dispatch]);

  return (
    <>
      <img src={profile?.images[0]["url"]} alt="" width="50px" />
      <h2>{profile?.["display_name"]}</h2>
      <h5>{profile?.["followers"]["total"]} followers</h5>
    </>
  );
};

export default Profile;
