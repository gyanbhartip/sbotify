import "../Styles/Controls.css";
import React, { useState, useRef, useEffect } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa/";
import { FaAngleDoubleRight } from "react-icons/fa/";
import { ImPrevious2 } from "react-icons/im/";
import { ImNext2 } from "react-icons/im/";
import { FaPlay } from "react-icons/fa/";
import { FaPause } from "react-icons/fa/";
import { ImVolumeHigh } from "react-icons/im/";
import { ImVolumeMedium } from "react-icons/im/";
import { ImVolumeLow } from "react-icons/im/";
import { ImVolumeMute2 } from "react-icons/im/";

const Controls = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.05);
  const audioElement = useRef();
  const progressBar = useRef();
  const animationRef = useRef();
  const volumeBar = useRef();

  //setting the audio duration values
  const onLoadedMetadata = async () => {
    const audioDuration = Math.floor(audioElement.current.duration);
    setDuration(audioDuration);
    progressBar.current.max = audioDuration;
    await changeVolume();
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
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);

    if (!isPlaying) {
      audioElement.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioElement.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };
  //progress bar
  const whilePlaying = () => {
    progressBar.current.value = audioElement.current.currentTime;
    setCurrentTime(progressBar.current.value);
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioElement.current.currentTime = progressBar.current.value;
    setCurrentTime(progressBar.current.value);
  };
  //seeking backwards and forwards
  const seekBack = () => {
    progressBar.current.value = Number(progressBar.current.value) - 10;
    changeRange();
    if (!isPlaying) {
      setIsPlaying(true);
      audioElement.current.play();
    }
  };
  const seekAhead = () => {
    progressBar.current.value = Number(progressBar.current.value) + 10;
    changeRange();
    if (!isPlaying) {
      setIsPlaying(true);
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
    setVolume(currentVolume);
  };
  useEffect(() => {
    audioElement.current.volume = volume;
  }, [volume]);
  //mute/unmute functionality
  const handleMute = () => {
    audioElement.current.muted = !audioElement.current.muted;
    setIsMuted(audioElement.current.muted);
  };

  return (
    <>
      <div className="now-playing-info-container">
        <div>
          <img
            src="http://127.0.0.1:8080/metroexodus.jpg"
            alt="now playing"
            height="70vh"
          ></img>
        </div>
        <div className="now-playing-info">
          <div>
            <p>The Bunker - Metro Exodus</p>
          </div>
          <div>
            <p>Oleksii Omelchuk</p>
          </div>
        </div>
      </div>
      <div className="controls">
        <audio
          ref={audioElement}
          src="http://127.0.0.1:8080/TheBunker.mp3"
          preload="metadata"
          onLoadedMetadata={onLoadedMetadata}
        ></audio>
        <div className="buttons">
          <button>
            <ImPrevious2 onClick={prevTrack} />
          </button>
          <button onClick={seekBack}>
            <FaAngleDoubleLeft />
          </button>
          <button onClick={togglePlayPause}>
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={seekAhead}>
            <FaAngleDoubleRight />
          </button>
          <button>
            <ImNext2 onClick={nextTrack} />
          </button>
        </div>
        <div className="progress-bar">
          <div className="current-time">{formatDuration(currentTime)}</div>
          <input
            ref={progressBar}
            type="range"
            defaultValue="0"
            onChange={changeRange}
            className="progress-bar-slider"
          />
          <div className="duration">
            {duration && !isNaN(duration) && formatDuration(duration)}
          </div>
        </div>
      </div>
      <div className="volume-control">
        <button onClick={handleMute}>
          {volume === 0 || isMuted ? (
            <ImVolumeMute2 />
          ) : volume > 0 && volume <= 0.35 ? (
            <ImVolumeLow />
          ) : volume > 0.35 && volume <= 0.7 ? (
            <ImVolumeMedium />
          ) : (
            <ImVolumeHigh />
          )}
        </button>
        <input
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
