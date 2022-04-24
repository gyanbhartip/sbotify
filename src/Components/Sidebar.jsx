import React, { useState, useEffect } from "react";
import "../Styles/Sidebar.css";
import { Link } from "react-router-dom";
import { Home, Search, HeartOutline, Library } from "../Utils/icons";
import { axiosCall } from "../Utils/Spotify";
// import Playlist from "./Playlist";

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      const { data } = await axiosCall.get("me/playlists");
      setPlaylists(data.items);
    };
    fetchPlaylists();
  }, []);

  return (
    <aside className="sidebar-container">
      <section className="sidebar-navigation">
        <ul className="sidebar-navigation-list">
          <li>
            <Link to="/" className="sidebar-navigation-item">
              <Home /> Home
            </Link>
          </li>
          <li>
            <Link to="search" className="sidebar-navigation-item">
              <Search /> Search
            </Link>
          </li>
          <li>
            <Link to="library" className="sidebar-navigation-item">
              <Library /> Library
            </Link>
          </li>
          <li style={{ marginTop: "auto" }}>
            <Link to="likedsongs" className="sidebar-navigation-item">
              <HeartOutline /> Liked Songs
            </Link>
          </li>
        </ul>
      </section>
      <div className="seperator"></div>
      <section className="sidebar-playlists">
        {playlists.map((playlist) => {
          return (
            <div key={playlist.id}>
              <Link
                /*fix the :params thing by nesting playlist in the index.js router setup*/
                to={`playlist/${playlist.id}`}
                className="sidebar-playlist-items"
              >
                {playlist.name}
              </Link>
            </div>
          );
        })}
      </section>
    </aside>
  );
};

export default Sidebar;
