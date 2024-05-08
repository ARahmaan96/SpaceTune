import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";

const MusicBar = () => {
  const [volume, setVolume] = useState(50);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState("0:00");
  const [totalTime, setTotalTime] = useState("0:00");
  const [musicName, setMusicName] = useState("Unknown Music");

  const handleVolumeChange = (
    event: any,
    newValue: React.SetStateAction<number>
  ) => {
    setVolume(newValue);
    if (newValue === 0) {
      setMuted(true);
    } else {
      setMuted(false);
    }
  };

  const handleMuteToggle = () => {
    setMuted(!muted);
    if (!muted) {
      setVolume(0);
    } else {
      setVolume(50);
    }
  };

  const handlePreviousSong = () => {
    // Logic for playing the previous song
  };

  const handleNextSong = () => {
    // Logic for playing the next song
  };

  const handleFastRewind = () => {
    // Logic for skipping 5 seconds back
  };

  const handleFastForward = () => {
    // Logic for skipping 5 seconds forward
  };

  return (
    <AppBar
      position="fixed"
      style={{ top: "auto", bottom: 0, backgroundColor: "#2e1c6d" }}
    >
      <Toolbar
        className="theme"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <IconButton style={{ color: "#ffffff" }} onClick={handlePreviousSong}>
            <SkipPreviousIcon />
          </IconButton>
          <IconButton style={{ color: "#ffffff" }} onClick={handleFastRewind}>
            <FastRewindIcon />
          </IconButton>
          <IconButton style={{ color: "#ffffff" }}>
            {true ? <PlayArrowIcon /> : <PauseIcon />}
          </IconButton>
          <IconButton style={{ color: "#ffffff" }} onClick={handleFastForward}>
            <FastForwardIcon />
          </IconButton>
          <IconButton style={{ color: "#ffffff" }} onClick={handleNextSong}>
            <SkipNextIcon />
          </IconButton>
          <Typography
            variant="body2"
            style={{
              color: "#ffffff",
              marginLeft: "16px",
              marginRight: "40px",
            }}
          >
            {musicName}
          </Typography>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="body2"
            style={{ color: "#ffffff", marginRight: "16px" }}
          >
            {currentTime} / {totalTime}
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Tooltip title={muted ? "Unmute" : "Mute"}>
              <IconButton
                style={{ color: "#ffffff" }}
                onClick={handleMuteToggle}
              >
                {muted ? (
                  <VolumeOffIcon />
                ) : volume > 50 ? (
                  <VolumeUpIcon />
                ) : (
                  <VolumeDownIcon />
                )}
              </IconButton>
            </Tooltip>
            <Slider
              value={volume}
              // onChange={handleVolumeChange}
              aria-labelledby="continuous-slider"
              orientation="horizontal"
              min={0}
              max={100}
              style={{
                marginLeft: "8px",
                width: "100px",
                visibility: muted ? "hidden" : "visible",
              }}
            />
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MusicBar;
