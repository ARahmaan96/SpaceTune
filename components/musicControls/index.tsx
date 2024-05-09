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

  const handleVolumeChange = (event: any,) => {
    const value = event.target.value;
    if (value === 0) setMuted(true);
    else if (value >= 0 && muted) setMuted(false);
    setVolume(value);
  }

  const handleMuteToggle = () => {
    setMuted(!muted);
    !muted ? setVolume(0) : setVolume(50);
  };

  const handlePreviousSong = () => {
    // Logic for skipping 5 seconds back
  };

  const handleNextSong = () => {
    // Logic for skipping 5 seconds forward
  };

  const handleFastRewind = () => {
    // Logic for skipping 5 seconds back
  };

  const handleFastForward = () => {
    // Logic for skipping 5 seconds forward
  };

  return (
    <AppBar
      className="position-fixed bottom-0"
      style={{ top: "auto", backgroundColor: "#2e1c6d" }}
    >
      <Toolbar
        className="theme"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="d-md-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-center">
            <Typography
              variant="body2"
              style={{
                color: "#ffffff",
              }}
            >
              {/* dsfds */}
              {musicName}
            </Typography>

            <Typography className="px-3 fst-italic" variant="body2">
              {currentTime} / {totalTime}
            </Typography>
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <div>
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
            </div>
            <div className="d-flex align-items-center justify-content-start">
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
                min={0}
                max={100}
                value={volume}
                aria-label="Volume"
                orientation="horizontal"
                onChange={handleVolumeChange}
                aria-labelledby="continuous-slider"
                style={{
                  width: "100px",
                  // visibility: muted ? "hidden" : "visible",
                }}
              />
            </div>
          </div>

        </div>
      </Toolbar>
    </AppBar>
  );
};

export default MusicBar;
