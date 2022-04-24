import React, { useEffect, useId } from "react";
import "../Styles/LikedSongs.css";
import { useSelector, useDispatch } from "react-redux";
import { setLikedSongs } from "../redux/features/tracks/tracksSlice";
import { setTrack } from "../redux/features/controls/controlsSlice";
import { axiosCall } from "../Utils/Spotify";
import { HeartFilled, PlayFilled } from "../Utils/icons";

const LikedSongs = () => {
  const id = useId();
  const { likedSongs } = useSelector((store) => store.tracks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPlaylists = async () => {
      const { data } = await axiosCall.get("me/tracks?limit=10");
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
        <div className="song">
          <p></p>
          <h4>title</h4>
          <h4>album</h4>
          <h4>date added</h4>
          <h4>duration</h4>
        </div>
        {likedSongs.map((song, index = 0) => {
          return (
            <div className="song" key={`${id}${index}`}>
              <div
                onClick={() => {
                  dispatch(setTrack(song));
                }}
                style={{ width: "25px" }}
              >
                <PlayFilled />
              </div>
              <p>{song.track.name}</p>
              <p>{song.track.album.name}</p>
              <p>{song.added_at.slice(0, 10)}</p>
              <p>{`${(song.track.duration_ms / 60000).toFixed()}:${(
                (song.track.duration_ms / 1000) %
                60
              ).toFixed()}`}</p>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default LikedSongs;
