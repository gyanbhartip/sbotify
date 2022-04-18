import React, { useState, useEffect } from "react";
import "../Styles/LikedSongs.css";
import { axiosCall } from "../Utils/Spotify";
import { BsFillHeartFill } from "react-icons/bs";

const LikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  useEffect(() => {
    const fetchPlaylists = async () => {
      const { data } = await axiosCall.get("me/tracks?limit=10");
      setLikedSongs(data.items);
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="liked-songs-page">
      <div className="top-banner">
        <BsFillHeartFill
          style={{
            fontSize: "4rem",
          }}
        />
        <h1>Liked Songs</h1>
      </div>
      <section className="bottom-songs">
        <h4>#</h4>
        <h4>title</h4>
        <h4>album</h4>
        <h4>date added</h4>
        <h4>duration</h4>
        {likedSongs.map((song, index = 0) => {
          return (
            <>
              <p>{index + 1}</p>
              <p>{song.track.name}</p>
              <p>{song.track.album.name}</p>
              <p>{song.added_at}</p>
              <p>{`${(song.track.duration_ms / 60000).toFixed()}:${(
                (song.track.duration_ms / 1000) %
                60
              ).toFixed()}`}</p>
            </>
          );
        })}
      </section>
    </div>
  );
};

export default LikedSongs;
