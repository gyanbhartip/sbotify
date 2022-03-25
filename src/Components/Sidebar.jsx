import React, { useState, useEffect } from "react";
import "../Styles/Sidebar.css";
import { Link } from "react-router-dom";
import {
  AiOutlineHome,
  AiFillHome,
  AiOutlineHeart,
  AiTwotoneHeart,
} from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { RiSearchEyeFill } from "react-icons/ri";
import { IoLibraryOutline, IoLibrarySharp, IoLibrary } from "react-icons/io5";
import { axiosCall } from "../Utils/Spotify";
import Playlist from "./Playlist";

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
              <AiOutlineHome /> Home
            </Link>
          </li>
          <li>
            <Link to="search" className="sidebar-navigation-item">
              <FiSearch /> Search
            </Link>
          </li>
          <li>
            <Link to="library" className="sidebar-navigation-item">
              <IoLibraryOutline /> Library
            </Link>
          </li>
          <li style={{ marginTop: "auto" }}>
            <Link to="likedsongs" className="sidebar-navigation-item">
              <AiOutlineHeart /> Liked Songs
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
