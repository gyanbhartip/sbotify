import React, { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTrack,
  // setIsPlaying,
} from "../redux/features/controls/controlsSlice";
import { PlayFilled, PauseFilled } from "../Utils/icons";

const Song = ({ song, index }) => {
  const dispatch = useDispatch();
  const { currentlyPlaying } = useSelector((store) => store.tracks);
  const id = useId();

  return (
    <div
      className="song"
      key={`${id}${index}`}
      style={
        currentlyPlaying === song.track.id
          ? { backgroundColor: "rgba(124, 124, 124, 0.35)" }
          : {}
      }
    >
      <div
        onClick={() => {
          dispatch(setTrack(song));
        }}
        style={{ width: "25px" }}
      >
        {currentlyPlaying === song.track.id ? null : <PlayFilled />}
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
};

export default Song;
