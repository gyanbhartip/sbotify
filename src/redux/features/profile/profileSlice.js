import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDropdownClicked: false,
    profile: null,
    name: null,
    image: "https://picsum.photos/100",
    playlists: [],
    likedSongs: [],
}

const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setIsDropdownClicked: (state, action) => {
            state.isDropdownClicked = action.payload;
        },
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        setName: (state, action) => {
            state.name = action.payload;
        },
        setImage: (state, action) => {
            state.image = action.payload;
        },
        setPlaylists: (state, action) => {
            state.playlists = action.payload;
        },
        setLikedSongs: (state, action) => {
            state.likedSongs = action.payload;
        },
    }
});

export const { setIsDropdownClicked, setProfile, setName, setImage, setPlaylists, setLikedSongs } = profileSlice.actions;

export default profileSlice.reducer;