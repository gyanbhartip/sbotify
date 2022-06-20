import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosCall } from "../Utils/Spotify";
import { useDispatch, useSelector } from "react-redux";
import { setPlaylist } from "../redux/features/tracks/tracksSlice";
import Song from "./Song";

const Playlist = () => {
  const dispatch = useDispatch();
  const { playlist } = useSelector((store) => store.tracks);
  const { id } = useParams();

  useEffect(() => {
    const fetchPlaylists = async () => {
      const { data } = await axiosCall.get(`playlists/${id}`);
      dispatch(setPlaylist(data));
    };
    fetchPlaylists();
  }, [id, dispatch]);

  return (
    <div className="">
      <div className="top-banner">
        <h1>{playlist?.name}</h1>
      </div>
      <section className="bottom-songs">
        <div className="song-header">
          <p></p>
          <h4>title</h4>
          <h4>album</h4>
          <h4>date added</h4>
          <h4>duration</h4>
        </div>
        {playlist ? (
          playlist?.tracks?.items.map((song, index = 0) => {
            return <Song song={song} index={index} key={index} />;
          })
        ) : (
          <div>Loading</div>
        )}
      </section>
    </div>
  );
};

export default Playlist;
