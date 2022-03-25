import React, { useState, useEffect } from "react";
import "../Styles/LikedSongs.css";
import { axiosCall } from "../Utils/Spotify";

const LikedSongs = () => {
  const [likedSongs, setLikedSongs] = useState([]);
  useEffect(() => {
    const fetchPlaylists = async () => {
      const { data } = await axiosCall.get("me/tracks");
      setLikedSongs(data.items);
    };
    fetchPlaylists();
  }, []);

  return (
    <div className="liked-songs-page">
      <div className="top-banner"></div>
      <section className="bottom-songs">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>album</th>
              <th>date added</th>
              <th>duration</th>
            </tr>
          </thead>
          <tbody>
            {likedSongs.map((song, index = 0) => {
              return (
                <tr key={`song.id${index}`}>
                  <td>{index + 1}</td>
                  <td>{song.track.name}</td>
                  <td>{song.track.album.name}</td>
                  <td>{song.added_at}</td>
                  <td>{`${(song.track.duration_ms / 60000).toFixed()}:${(
                    (song.track.duration_ms / 1000) %
                    60
                  ).toFixed()}`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default LikedSongs;
