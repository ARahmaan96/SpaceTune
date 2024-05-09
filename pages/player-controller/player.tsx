import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PlayArrow, FastRewind, FastForward, Pause, VolumeUp, VolumeOff, SlowMotionVideo, Speed, FastForwardOutlined, PlayCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Slider, Button, Typography } from '@mui/material';
import FastRewindOutlinedIcon from '@mui/icons-material/FastRewindOutlined';

const CustomPlayerController = () => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [currentSong, setCurrentSong] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0.01);
    const [duration, setDuration] = useState(0);
    const [lyrics, setLyrics] = useState([]);
    const [volume, setVolume] = useState(50); 
    const [isMuted, setIsMuted] = useState(false);
    const [playbackSpeed, setPlaybackSpeed] = useState(1);
    const [slowerPlaybackSpeed, setSlowerPlaybackSpeed] = useState(0.5);
    const [neutralPlaybackSpeed, setNeutralPlaybackSpeed] = useState(1);
    const [fasterPlaybackSpeed, setFasterPlaybackSpeed] = useState(1.5);

    const songs = [
        {
            title: "Happy",
            name: "Pharrell Williams",
            source: "/Happy.mp3",
            cover: "/happythumb.jpg",
            lyricsUrl: "/Happy.srt",
            controlsColor: "orange",
            subtitlesColor: "rgba(255,255,255,0.9)",
            subtitlesTextColor: "purple"
        },
        {
            title: "Hello",
            name: "Adele",
            source: "/Hello.mp3",
            cover: "/Hello.jpg",
            lyricsUrl: "/Hello.srt",
            controlsColor: "rgba(255,255,255,0.8)",
            subtitlesColor: "rgba(0,0,0,0.2)",
            subtitlesTextColor: "black"
        },
    ];

    const parseSRT = (srtContent) => {
        const lines = srtContent.trim().split(/\r?\n/);
        const subtitles = [];
        let currentSubtitle = null;

        for (const line of lines) {
            if (/^\d+$/.test(line)) {
                if (currentSubtitle) {
                    subtitles.push(currentSubtitle);
                }
                currentSubtitle = { time: [], text: [] };
            } else if (/^\d\d:\d\d:\d\d,\d\d\d\s-->\s\d\d:\d\d:\d\d,\d\d\d$/.test(line)) {
                const [start, end] = line.split(' --> ').map(time => {
                    const [hh, mm, ss] = time.split(':').map(parseFloat);
                    return (hh * 3600) + (mm * 60) + ss;
                });
                currentSubtitle.time.push({ start, end });
            } else if (line.trim() !== '') {
                currentSubtitle.text.push(line);
            }
        }

        if (currentSubtitle) {
            subtitles.push(currentSubtitle);
        }

        return subtitles.map(subtitle => ({
            start: subtitle.time[0].start,
            end: subtitle.time[0].end,
            text: subtitle.text.join(' '),
        }));
    };

    const loadLyrics = useCallback(async () => {
        try {
            const response = await fetch(songs[currentSong].lyricsUrl);
            const srtContent = await response.text();
            const parsedLyrics = parseSRT(srtContent);
            setLyrics(parsedLyrics);
        } catch (error) {
            console.error("Error loading lyrics:", error);
        }
    }, [currentSong]);

    const handlePlayClick = useCallback(() => {
        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const handlePreviousSong = useCallback(() => {
        setCurrentSong(currentSong === 0 ? songs.length - 1 : currentSong - 1);
    }, [currentSong]);

    const handleForwardSong = useCallback(() => {
        setCurrentSong(currentSong !== songs.length - 1 ? currentSong + 1 : 0);
    }, [currentSong]);

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
    };

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = Number(e.target.value);
        setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const handleVolumeChange = (event: Event, newValue: number | number[]) => {
        setVolume(newValue as number);
        if (audioRef.current) {
            audioRef.current.volume = newValue as number / 100;
            setIsMuted(newValue === 0);
        }
    };

    const handleMuteToggle = () => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        if (audioRef.current) {
            audioRef.current.volume = newMutedState ? 0 : volume / 100;
        }
    };

    const handleSpeedChange = (newSpeed: number) => {
        setPlaybackSpeed(newSpeed);
        if (audioRef.current) {
            audioRef.current.playbackRate = newSpeed;
        }
    };

    const handleSlowerPlayback = () => {
        if (playbackSpeed === slowerPlaybackSpeed) {
            setPlaybackSpeed(neutralPlaybackSpeed);
        } else {
            setPlaybackSpeed(slowerPlaybackSpeed);
        }
        if (audioRef.current) {
            audioRef.current.playbackRate = slowerPlaybackSpeed;
        }
    };

    const handleNeutralPlayback = () => {
        setPlaybackSpeed(neutralPlaybackSpeed);
        if (audioRef.current) {
            audioRef.current.playbackRate = neutralPlaybackSpeed;
        }
    };

    const handleFasterPlayback = () => {
        if (playbackSpeed === fasterPlaybackSpeed) {
            setPlaybackSpeed(neutralPlaybackSpeed);
        } else {
            setPlaybackSpeed(fasterPlaybackSpeed);
        }
        if (audioRef.current) {
            audioRef.current.playbackRate = fasterPlaybackSpeed;
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio?.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio?.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

    useEffect(() => {
        loadLyrics();
    }, [currentSong, loadLyrics]);

    const getCurrentLyric = () => {
        const currentSubtitle = lyrics.find((subtitle, index) => {
            const nextSubtitle = lyrics[index + 1];
            return currentTime >= subtitle.start && (nextSubtitle ? currentTime < nextSubtitle.start : true);
        });
        return currentSubtitle ? currentSubtitle.text : '';
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <Box
            sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundImage: `url(${songs[currentSong].cover})`,
                backgroundSize: 'cover',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'end',
            }}
        >
            <Box sx={{
                width: '85%',
                opacity: 0.8,
                display: 'flex',
                borderRadius: '15px',
                alignItems: 'center',
                justifyContent: 'end',
                backgroundColor: songs[currentSong].controlsColor,
                flexDirection: 'column',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                marginTop: "5vh",
                padding: "10px"
            }}>
                <h2>{songs[currentSong].title}</h2>
                <p>{songs[currentSong].name}</p>
                <audio ref={audioRef} src={songs[currentSong].source} onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)} />
                    <input
                        className='progress'
                        type="range"
                        value={currentTime}
                        max={audioRef.current ? audioRef.current.duration : 0}
                        onChange={handleProgressChange}
                        style={{width: "40%"}}
                    />
                <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', color: "blue" }}>
                    <Typography variant="body1">{formatTime(currentTime)}</Typography>
                    <Typography variant="body1">{formatTime(duration)}</Typography>
                </div>
                <div className='controls d-flex justify-content-center align-items-center'>
                    <IconButton color="primary" onClick={handlePreviousSong}>
                        <FastRewind />
                    </IconButton>
                    <IconButton color="primary" onClick={handlePlayClick}>
                        {isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton color="primary" onClick={handleForwardSong}>
                        <FastForward />
                    </IconButton>
                    <IconButton color="primary" onClick={handleMuteToggle}>
                        {isMuted ? <VolumeOff /> : <VolumeUp />}
                    </IconButton>
                    <Slider
                        value={volume}
                        onChange={handleVolumeChange}
                        aria-labelledby="continuous-slider"
                        min={0}
                        max={100}
                        sx={{ width: 100, margin: '0 10px' }}
                    />
                    <IconButton color="primary" onClick={handleSlowerPlayback}>
                        <FastRewindOutlinedIcon />
                    </IconButton>
                    <IconButton color="primary" onClick={handleNeutralPlayback}>
                        <PlayCircleOutline />
                    </IconButton>
                    <IconButton color="primary" onClick={handleFasterPlayback}>
                        <FastForwardOutlined />
                    </IconButton>
                </div>
            </Box>
            <Box
                sx={{
                    minHeight: "67vh",
                    width: '85%',
                    opacity: 0.7,
                    display: 'flex',
                    borderRadius: '15px',
                    alignItems: 'start',
                    justifyContent: 'center',
                    padding: '10px',
                    marginTop: '20px',
                }}
            >
                <Box sx={{
                    height: "40vh",
                    width: '90%',
                    display: 'flex',
                    borderRadius: '15px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: songs[currentSong].subtitlesColor,
                    padding: '10px',
                    marginTop: '20px',
                    color: songs[currentSong].subtitlesTextColor,
                    textAlign: 'center',
                    fontWeight: "bold",
                    fontSize: "20pt"
                }}>
                    <p style={{marginBottom: "50px"}}>{getCurrentLyric()}</p>
                </Box>
            </Box>
        </Box>
    );
};

export default CustomPlayerController;
