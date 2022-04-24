import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    likedSongs: [],
}

const tracksSlice = createSlice({
    name: "tracks",
    initialState,
    reducers: {
        setLikedSongs: (state, action) => {
            state.likedSongs = action.payload;
        },
    }
});

export const { setLikedSongs } = tracksSlice.actions;

export default tracksSlice.reducer;