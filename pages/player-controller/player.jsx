import HeaderPlayerController from './header';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { PlayArrow, FastRewind, FastForward, Pause } from '@mui/icons-material';
import Image from 'next/image';
import { Box } from '@mui/material';
const CustomPlayerController = () => {
    const audioRef = useRef(null);
    const [currentSong, setCurrentSong] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);

    const handlePlayClick = useCallback(() => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
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
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleProgressChange = (e) => {
        const newTime = e.target.value;
        setCurrentTime(newTime);
        audioRef.current.currentTime = newTime;
    };

    useEffect(() => {
        const audio = audioRef.current;
        audio.addEventListener('timeupdate', handleTimeUpdate);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
        };
    }, []);

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
                opacity: 0.7,
                display: 'flex',
                borderRadius: '15px',
                alignItems: 'center',
                justifyContent: 'end',
                backgroundColor: 'aqua',
                flexDirection: 'column',
                boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
            }}>

                <h2>{songs[currentSong].title}</h2>
                <p>{songs[currentSong].name}</p>

                <audio>
                    <source src={songs[currentSong].source} type="audio/mpeg" />
                </audio>



                <input
                    className='progress'
                    type="range"
                    value={currentTime}
                    max={audioRef.current ? audioRef.current.duration : 0}
                    onChange={handleProgressChange}
                />

                <audio ref={audioRef} src={songs[currentSong].source} />
                <div className='controls d-flex justify-content-center align-items-center'>
                    <button type="button" className="backward" onClick={handlePreviousSong}>
                        <FastRewind />
                    </button>
                    <button type="button" className="play-pause-btn" onClick={handlePlayClick}>
                        {isPlaying ? <Pause /> : <PlayArrow />}
                        <i className="fa-solid fa-play" id="controlIcon"></i>
                    </button>
                    <button type="button" className="forward" onClick={handleForwardSong}>
                        <FastForward />
                    </button>
                </div>
            </Box>
        </Box>
    );
};

export default CustomPlayerController;
const songs = [
    {
        title: "Redemption",
        name: "Besomorph & Coopex",
        source:
            "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Besomorph-Coopex-Redemption.mp3",
        cover:
            "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/398875d0-9b9e-494a-8906-210aa3f777e0",
    },
    {
        title: "What's The Problem?",
        name: "OSKI",
        source:
            "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/OSKI-Whats-The-Problem.mp3",
        cover:
            "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/810d1ddc-1168-4990-8d43-a0ffee21fb8c",
    },
    {
        title: "Control",
        name: "Unknown Brain x Rival",
        source:
            "https://github.com/ecemgo/mini-samples-great-tricks/raw/main/song-list/Unknown-BrainxRival-Control.mp3",
        cover:
            "https://github.com/ecemgo/mini-samples-great-tricks/assets/13468728/7bd23b84-d9b0-4604-a7e3-872157a37b61",
    },
];