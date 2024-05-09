import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PlayArrow, FastRewind, FastForward, Pause, VolumeUp, VolumeOff, SlowMotionVideo, Speed, FastForwardOutlined, PlayCircleOutline } from '@mui/icons-material';
import { Box, IconButton, Slider, Button, Typography } from '@mui/material';
import FastRewindOutlinedIcon from '@mui/icons-material/FastRewindOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSong, setCurrentTime, setDuration, setIsMuted, setIsPlaying, setPlaybackSpeed, setVolume, songs } from '@/controller/slices/music_slice';

const CustomPlayerController = () => {
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
    } = useSelector((state: any) => state.audio);
    console.log(song);
    console.log(song.isMuted);
    const audioRef = useRef<HTMLAudioElement>(null);

    const [lyrics, setLyrics] = useState([]);


    const parseSRT = (srtContent: any) => {
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
            const response = await fetch(songs[song.currentSong].lyricsUrl);
            const srtContent = await response.text();
            const parsedLyrics = parseSRT(srtContent);
            setLyrics(parsedLyrics);
        } catch (error) {
            console.error("Error loading lyrics:", error);
        }
    }, [song.currentSong]);

    const handlePlayClick = useCallback(() => {
        if (song.isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
        }
        dispatch(setIsPlaying({ isPlaying: !song.isPlaying }));
        // setIsPlaying(!isPlaying);
    }, [dispatch, song.isPlaying]);

    const handlePreviousSong = useCallback(() => {
        dispatch(setCurrentSong({ currentSong: song.currentSong === 0 ? songs.length - 1 : song.currentSong - 1 }));
        // setCurrentSong(song.currentSong === 0 ? songs.length - 1 : song.currentSong - 1);
    }, [dispatch, song.currentSong]);

    const handleForwardSong = useCallback(() => {
        dispatch(setCurrentSong({ currentSong: song.currentSong === songs.length - 1 ? 0 : song.currentSong + 1 }));
        // setCurrentSong(currentSong !== songs.length - 1 ? currentSong + 1 : 0);
    }, [dispatch, song.currentSong]);

    const handleTimeUpdate = useCallback(() => {
        dispatch(setCurrentTime({ currentTime: audioRef.current?.currentTime || 0 }));
    }, [dispatch]);

    const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTime = Number(e.target.value);
        dispatch(setCurrentTime({ currentTime: newTime }));

        // setCurrentTime(newTime);
        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const handleVolumeChange = (event: Event, newValue: number | number[]) => {
        dispatch(setVolume({ volume: newValue as number }));
        // setVolume(newValue as number);
        if (audioRef.current) {
            audioRef.current.volume = newValue as number / 100;
            dispatch(setIsMuted({ isMuted: newValue === 0 }));
            // setIsMuted(newValue === 0);
        }
    };

    const handleMuteToggle = () => {
        const newMutedState = !song.isMuted;
        dispatch(setIsMuted({ isMuted: newMutedState }));
        dispatch(setVolume({ volume: newMutedState ? 0 : song.volume }));
        // setIsMuted(newMutedState);
        if (audioRef.current) {
            audioRef.current.volume = newMutedState ? 0 : song.volume / 100;
        }
    };

    const handleSpeedChange = (newSpeed: number) => {
        dispatch(setPlaybackSpeed({ playbackSpeed: newSpeed }));
        // setPlaybackSpeed(newSpeed);
        if (audioRef.current) {
            audioRef.current.playbackRate = newSpeed;
        }
    };

    const handleSlowerPlayback = () => {
        if (song.playbackSpeed === song.slowerPlaybackSpeed) {
            dispatch(setPlaybackSpeed(song.neutralPlaybackSpeed));
            // setPlaybackSpeed(neutralPlaybackSpeed);
        } else {
            dispatch(setPlaybackSpeed(song.slowerPlaybackSpeed));
            // setPlaybackSpeed(slowerPlaybackSpeed);
        }
        if (audioRef.current) {
            audioRef.current.playbackRate = song.slowerPlaybackSpeed;
        }
    };

    const handleNeutralPlayback = () => {
        dispatch(setPlaybackSpeed(song.neutralPlaybackSpeed));
        // setPlaybackSpeed(neutralPlaybackSpeed);
        if (audioRef.current) {
            audioRef.current.playbackRate = song.neutralPlaybackSpeed;
        }
    };

    const handleFasterPlayback = () => {
        if (song.playbackSpeed === song.fasterPlaybackSpeed) {
            dispatch(setPlaybackSpeed(song.neutralPlaybackSpeed));
            // setPlaybackSpeed(neutralPlaybackSpeed);
        } else {
            dispatch(setPlaybackSpeed(song.fasterPlaybackSpeed));
            // setPlaybackSpeed(song.fasterPlaybackSpeed);
        }
        if (audioRef.current) {
            audioRef.current.playbackRate = song.fasterPlaybackSpeed;
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio?.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio?.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, [handleTimeUpdate]);

    useEffect(() => {
        loadLyrics();
    }, [song.currentSong, loadLyrics]);

    const getCurrentLyric = () => {
        const currentSubtitle = lyrics.find((subtitle, index) => {
            const nextSubtitle = lyrics[index + 1];
            return song.currentTime >= subtitle.start && (nextSubtitle ? song.currentTime < nextSubtitle.start : true);
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
                backgroundImage: `url(${songs[song.currentSong].cover})`,
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
                backgroundColor: songs[song.currentSong].controlsColor,
                flexDirection: 'column',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                marginTop: "5vh",
                padding: "10px"
            }}>
                <h2>{songs[song.currentSong].title}</h2>
                <p>{songs[song.currentSong].name}</p>
                <audio ref={audioRef} src={songs[song.currentSong].source} onLoadedMetadata={(e) => dispatch(setDuration({ duration: e.currentTarget.duration }))} />
                <input
                    className='progress'
                    type="range"
                    value={song.currentTime}
                    max={audioRef.current ? audioRef.current.duration : 0}
                    onChange={handleProgressChange}
                    aria-label='time progress'
                    style={{ width: "40%" }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%', color: "blue" }}>
                    <Typography variant="body1">{formatTime(song.currentTime)}</Typography>
                    <Typography variant="body1">{formatTime(song.duration)}</Typography>
                </div>
                <div className='controls d-flex justify-content-center align-items-center'>
                    <IconButton color="primary" onClick={handlePreviousSong}>
                        <FastRewind />
                    </IconButton>
                    <IconButton color="primary" onClick={handlePlayClick}>
                        {song.isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton color="primary" onClick={handleForwardSong}>
                        <FastForward />
                    </IconButton>
                    <IconButton color="primary" onClick={handleMuteToggle}>
                        {song.isMuted ? <VolumeOff /> : <VolumeUp />}
                    </IconButton>
                    <Slider
                        value={song.volume}
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
                    minHeight: "65vh",
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
                    backgroundColor: songs[song.currentSong].subtitlesColor,
                    padding: '10px',
                    marginTop: '20px',
                    color: songs[song.currentSong].subtitlesTextColor,
                    textAlign: 'center',
                    fontWeight: "bold",
                    fontSize: "20pt"
                }}>
                    <p style={{ marginBottom: "50px" }}>{getCurrentLyric()}</p>
                </Box>
            </Box>
        </Box>
    );
};

export default CustomPlayerController;
