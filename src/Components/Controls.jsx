import "../Styles/Controls.css";
import React, { useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsPlaying,
  setDuration,
  setCurrentTime,
  setIsMuted,
  setVolume,
} from "../redux/features/controls/controlsSlice";
import { setCurrentlyPlaying } from "../redux/features/tracks/tracksSlice";
import {
  Prev,
  SeekBack,
  Play,
  Pause,
  SeekAhead,
  Next,
  Mute,
  VolumeLow,
  VolumeMed,
  VolumeHigh,
} from "../Utils/icons";

const Controls = () => {
  const { isPlaying, duration, currentTime, isMuted, volume, track } =
    useSelector((store) => store.controls);

  const dispatch = useDispatch();

  const audioElement = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  const volumeBar = useRef();

  //setting the audio duration values
  const onLoadedMetadata = () => {
    const audioDuration = Math.floor(audioElement.current.duration);
    dispatch(setDuration(audioDuration));
    progressBar.current.max = audioDuration;
    changeVolume();
  };

  //formatting the current/total durations displayed next to the progress bar
  const formatDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const minutesFormatted = minutes < 10 ? `0${minutes}` : minutes;
    const seconds = Math.floor(durationInSeconds % 60);
    const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesFormatted}:${secondsFormatted}`;
  };

  //play/pause functionality
  const togglePlayPause = async () => {
    dispatch(setIsPlaying(!isPlaying));

    if (!isPlaying) {
      audioElement.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioElement.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  //progress bar
  const whilePlaying = useCallback(() => {
    progressBar.current.value = audioElement.current.currentTime;
    dispatch(setCurrentTime(progressBar.current.value));
    animationRef.current = requestAnimationFrame(whilePlaying);
  }, [dispatch]);

  const changeRange = () => {
    audioElement.current.currentTime = progressBar.current.value;
    dispatch(setCurrentTime(progressBar.current.value));
  };

  //seeking backwards and forwards 5 seconds
  const seekBack = () => {
    progressBar.current.value = Number(progressBar.current.value) - 5;
    changeRange();
    if (!isPlaying) {
      dispatch(setIsPlaying(true));
      audioElement.current.play();
    }
  };
  const seekAhead = () => {
    progressBar.current.value = Number(progressBar.current.value) + 5;
    changeRange();
    if (!isPlaying) {
      dispatch(setIsPlaying(true));
      audioElement.current.play();
    }
  };

  //Switching to next/previous song
  const nextTrack = () => {
    console.log("next track");
  };
  const prevTrack = () => {
    console.log("previous track");
  };

  //Changing the playback volume
  const changeVolume = () => {
    const currentVolume = Number(volumeBar.current.value);
    dispatch(setVolume(currentVolume));
  };
  useEffect(() => {
    audioElement.current.volume = volume;
  }, [volume]);

  useEffect(() => {
    audioElement.current.play();
    dispatch(setIsPlaying(true));
    dispatch(setCurrentlyPlaying(track?.track?.id));
    animationRef.current = requestAnimationFrame(whilePlaying);
  }, [track, dispatch, whilePlaying]);

  //mute/unmute functionality
  const handleMute = () => {
    audioElement.current.muted = !audioElement.current.muted;
    dispatch(setIsMuted(audioElement.current.muted));
  };

  return (
    <>
      <div className="now-playing-info-container">
        <div>
          {Object.keys(track).length === 0 ? (
            <div style={{ width: "100px" }}></div>
          ) : (
            <img
              src={track?.track?.album.images[0].url}
              alt="now playing"
              width="auto"
              height="70vh"
            ></img>
          )}
        </div>
        <div className="now-playing-info">
          <div>
            <p>{track?.track?.name}</p>
          </div>
          <div>
            <p>{track?.track?.artists[0].name}</p>
          </div>
        </div>
      </div>
      <div className="controls">
        <audio
          ref={audioElement}
          src={track?.track?.preview_url}
          preload="metadata"
          onLoadedMetadata={onLoadedMetadata}
        ></audio>
        <div className="buttons">
          <button aria-label="previous track button">
            <Prev onClick={prevTrack} />
          </button>
          <button onClick={seekBack} aria-label="seek back button">
            <SeekBack />
          </button>
          <button onClick={togglePlayPause} aria-label="play/pause button">
            {isPlaying ? <Pause /> : <Play />}
          </button>
          <button onClick={seekAhead} aria-label="seek ahead button">
            <SeekAhead />
          </button>
          <button aria-label="next track button">
            <Next onClick={nextTrack} />
          </button>
        </div>
        <div className="progress-bar">
          <div className="current-time">{formatDuration(currentTime)}</div>
          <input
            aria-label="seek slider"
            ref={progressBar}
            type="range"
            defaultValue="0"
            onChange={changeRange}
            className="progress-bar-slider"
          />
          <div className="duration">{duration && formatDuration(duration)}</div>
        </div>
      </div>
      <div className="volume-control">
        <button onClick={handleMute} aria-label="mute button">
          {volume === 0 || isMuted ? (
            <Mute />
          ) : volume > 0 && volume <= 0.35 ? (
            <VolumeLow />
          ) : volume > 0.35 && volume <= 0.7 ? (
            <VolumeMed />
          ) : (
            <VolumeHigh />
          )}
        </button>
        <input
          aria-label="volume slider"
          ref={volumeBar}
          type="range"
          defaultValue={volume}
          min="0"
          max="1"
          step="0.01"
          onChange={changeVolume}
        />
      </div>
    </>
  );
};

export default Controls;
