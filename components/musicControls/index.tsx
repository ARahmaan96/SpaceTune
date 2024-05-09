import React, { useCallback, useEffect, useRef, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { setCurrentSong, setCurrentTime, setDuration, setIsMuted, setIsPlaying, setVolume, songs } from "@/controller/slices/music_slice";

const MusicBar = () => {
  const dispatch = useDispatch();
  const song: {
    volume: number,
    isMuted: boolean,
    duration: number,
    isPlaying: boolean,
    currentSong: number,
    currentTime: number,
    playbackSpeed: number,
    slowerPlaybackSpeed: number,
    fasterPlaybackSpeed: number,
    neutralPlaybackSpeed: number

    // lyrics: any

  } = useSelector((state: any) => state.audio);
  console.log(song);
  const audioRef = useRef<HTMLAudioElement>(null);

  // const [volume, setVolume] = useState(50);
  // const [muted, setMuted] = useState(false);
  // const [currentTime, setCurrentTime] = useState("0:00");
  // const [totalTime, setTotalTime] = useState("0:00");
  // const [musicName, setMusicName] = useState("Unknown Music");

  const handleVolumeChange = (event: any,) => {
    const value = event.target.value;
    if (value === 0) dispatch(setIsMuted({ isMuted: true }));
    else if (value >= 0 && song.isMuted) dispatch(setIsMuted({ isMuted: false }));
    dispatch(setVolume({ volume: value }));
  }
  const handleMuteToggle = () => {
    const newMutedState = !song.isMuted;
    dispatch(setIsMuted({ isMuted: newMutedState }));
    dispatch(setVolume({ volume: newMutedState ? 0 : song.volume }));
    // setIsMuted(newMutedState);
    if (audioRef.current) {
      audioRef.current.volume = newMutedState ? 0 : song.volume / 100;
    }
  };

  const handlePreviousSong = useCallback(() => {
    dispatch(setCurrentSong({ currentSong: song.currentSong === 0 ? songs.length - 1 : song.currentSong - 1 }));
    dispatch(setIsPlaying({ isPlaying: false }));
    // setCurrentSong(song.currentSong === 0 ? songs.length - 1 : song.currentSong - 1);
  }, [dispatch, song.currentSong]);

  const handleForwardSong = useCallback(() => {
    dispatch(setCurrentSong({ currentSong: song.currentSong === songs.length - 1 ? 0 : song.currentSong + 1 }));
    dispatch(setIsPlaying({ isPlaying: false }));
    // setCurrentSong(currentSong !== songs.length - 1 ? currentSong + 1 : 0);
  }, [dispatch, song.currentSong]);

  const handlePlayClick = useCallback(() => {
    if (song.isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    dispatch(setIsPlaying({ isPlaying: !song.isPlaying }));
  }, [dispatch, song.isPlaying]);

  const handleTimeUpdate = useCallback(() => {
    dispatch(setCurrentTime({ currentTime: audioRef.current?.currentTime || 0 }));
  }, [dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    audio?.addEventListener('timeupdate', handleTimeUpdate);
    dispatch(setDuration({ duration: song.duration }));

    return () => {
      audio?.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [dispatch, handleTimeUpdate, song.duration]);
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  return (
    <AppBar
      className="position-fixed bottom-0"
      style={{ top: "auto", backgroundColor: "#2e1c6d" }}
    >
      <audio ref={audioRef} src={songs[song.currentSong].source} />
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
              {songs[song.currentSong].name}
            </Typography>

            <Typography className="px-3 fst-italic" variant="body2">
              {formatTime(song.currentTime)} / {formatTime(song.duration)}
            </Typography>
          </div>

          <div className="d-flex align-items-center justify-content-between">
            <div>

              <IconButton style={{ color: "#ffffff" }} onClick={handlePreviousSong}>
                <FastRewindIcon />
              </IconButton>
              <IconButton style={{ color: "#ffffff" }} onClick={handlePlayClick}>
                {song.isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </IconButton>
              <IconButton style={{ color: "#ffffff" }} onClick={handleForwardSong}>
                <FastForwardIcon />
              </IconButton>

            </div>
            <div className="d-flex align-items-center justify-content-start">
              <Tooltip title={song.isMuted ? "Unmute" : "Mute"}>
                <IconButton
                  style={{ color: "#ffffff" }}
                  onClick={handleMuteToggle}
                >
                  {song.isMuted ? (
                    <VolumeOffIcon />
                  ) : song.volume > 50 ? (
                    <VolumeUpIcon />
                  ) : (
                    <VolumeDownIcon />
                  )}
                </IconButton>
              </Tooltip>
              <Slider
                min={0}
                max={100}
                value={song.volume}
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
