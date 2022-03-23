import React, { useState, useEffect } from "react";
import { axiosCall } from "../Utils/Spotify";

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    const fetchPlaylists = async () => {
      const { data } = await axiosCall.get("me/playlists");
      setPlaylists(data.items);
      console.log(data.items);
    };
    fetchPlaylists();
  }, []);

  return (
    <div>
      {playlists.map((playlist) => {
        return <div key={playlist.id}>{playlist.name}</div>;
      })}
    </div>
  );
};

export default Sidebar;
