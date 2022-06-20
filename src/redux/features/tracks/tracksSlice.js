import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    likedSongs: [],
    playlist: [],
    currentlyPlaying: '',
}

const tracksSlice = createSlice({
    name: "tracks",
    initialState,
    reducers: {
        setLikedSongs: (state, action) => {
            state.likedSongs = action.payload;
        },
        setPlaylist: (state, action) => {
            state.playlist = action.payload;
        },
        setCurrentlyPlaying: (state, action) => {
            state.currentlyPlaying = action.payload;
        },
    }
});

export const { setLikedSongs, setPlaylist, setCurrentlyPlaying } = tracksSlice.actions;

export default tracksSlice.reducer;