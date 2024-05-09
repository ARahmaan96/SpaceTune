import { createSlice } from "@reduxjs/toolkit";
export const audioSlicer = createSlice({
    name: "audio",
    initialState: {
        currentSong: 0,
        isPlaying: false,
        currentTime: 0.01,
        duration: 0,
        // lyrics: [],
        volume: 50,
        isMuted: false,
        playbackSpeed: 1,
        slowerPlaybackSpeed: 0.5,
        neutralPlaybackSpeed: 1,
        fasterPlaybackSpeed: 1.5
    },
    reducers: {
        setCurrentSong(state, action) {
            state.currentSong = action.payload.currentSong;
        },
        setIsPlaying(state, action) {
            state.isPlaying = action.payload.isPlaying;
        },
        setCurrentTime(state, action) {
            state.currentTime = action.payload.currentTime;
        },
        setDuration(state, action) {
            state.duration = action.payload.duration;
        },
        // setLyrics(state, action) {
        //     state.lyrics = action.payload.lyrics;
        // },
        setVolume(state, action) {
            state.volume = action.payload.volume;
        },
        setIsMuted(state, action) {
            state.isMuted = action.payload.isMuted;
        },
        setPlaybackSpeed(state, action) {
            state.playbackSpeed = action.payload.playbackSpeed;
        },
        setSlowerPlaybackSpeed(state, action) {
            state.slowerPlaybackSpeed = action.payload.slowerPlaybackSpeed;
        },
        setNeutralPlaybackSpeed(state, action) {
            state.neutralPlaybackSpeed = action.payload.neutralPlaybackSpeed;
        },
        setFasterPlaybackSpeed(state, action) {
            state.fasterPlaybackSpeed = action.payload.fasterPlaybackSpeed;
        },
        changeSong(state, action) {
            state.currentSong = action.payload.currentSong;
            // state.lyrics = action.payload.lyrics;
            state.duration = 0;
            state.isPlaying = true;
            state.playbackSpeed = 1;
            state.currentTime = 0.01;
        }

    }
});
export default audioSlicer.reducer
export const { setCurrentSong,
    // setLyrics,
    setVolume,
    setIsMuted,
    changeSong,
    setDuration,
    setIsPlaying,
    setCurrentTime,
    setPlaybackSpeed,
    setSlowerPlaybackSpeed,
    setFasterPlaybackSpeed,
    setNeutralPlaybackSpeed, } = audioSlicer.actions;

// const [currentSong, setCurrentSong] = useState(0);
// const [isPlaying, setIsPlaying] = useState(false);
// const [currentTime, setCurrentTime] = useState(0.01);
// const [duration, setDuration] = useState(0);
// const [lyrics, setLyrics] = useState([]);
// const [volume, setVolume] = useState(50);
// const [isMuted, setIsMuted] = useState(false);
// const [playbackSpeed, setPlaybackSpeed] = useState(1);
// const [slowerPlaybackSpeed, setSlowerPlaybackSpeed] = useState(0.5);
// const [neutralPlaybackSpeed, setNeutralPlaybackSpeed] = useState(1);
// const [fasterPlaybackSpeed, setFasterPlaybackSpeed] = useState(1.5);

export const songs = [
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