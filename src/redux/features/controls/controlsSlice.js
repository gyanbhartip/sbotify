import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    track: {},
    isPlaying: false,
    duration: 0,
    currentTime: 0,
    isMuted: false,
    volume: 0.05,
}

const controlsSlice = createSlice({
    name: "controls",
    initialState,
    reducers: {
        setTrack: (state, action) => {
            state.track = action.payload;
        },
        setIsPlaying: (state, action) => {
            state.isPlaying = action.payload;
        },
        setDuration: (state, action) => {
            state.duration = action.payload;
        },
        setCurrentTime: (state, action) => {
            state.currentTime = action.payload;
        },
        setIsMuted: (state, action) => {
            state.isMuted = action.payload;
        },
        setVolume: (state, action) => {
            state.volume = action.payload;
        },
    }
});

export const { setIsPlaying, setDuration, setCurrentTime, setIsMuted, setVolume, setTrack } = controlsSlice.actions;

export default controlsSlice.reducer;