import React, { useEffect } from "react";
import "../Styles/LikedSongs.css";
import { useSelector, useDispatch } from "react-redux";
import { setLikedSongs } from "../redux/features/tracks/tracksSlice";
import { axiosCall } from "../Utils/Spotify";
import { HeartFilled } from "../Utils/icons";
import Song from "./Song";

const LikedSongs = () => {
  const { likedSongs, currentlyPlaying } = useSelector((store) => store.tracks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlaylists = async () => {
      const { data } = await axiosCall.get("me/tracks");
      dispatch(setLikedSongs(data.items));
    };
    fetchPlaylists();
  }, [dispatch]);

  return (
    <div className="liked-songs-page">
      <div className="top-banner">
        <HeartFilled
          style={{
            fontSize: "4rem",
          }}
        />
        <h1>Liked Songs</h1>
      </div>
      <section className="bottom-songs">
        <div className="song song-header">
          <p></p>
          <h4>title</h4>
          <h4>album</h4>
          <h4>date added</h4>
          <h4>duration</h4>
        </div>
        {likedSongs.map((song, index = 0) => {
          return (
            <Song
              song={song}
              index={index}
              key={index}
              currentlyPlaying={currentlyPlaying}
            />
          );
        })}
      </section>
    </div>
  );
};

export default LikedSongs;
