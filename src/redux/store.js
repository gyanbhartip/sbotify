import { configureStore } from "@reduxjs/toolkit";
import controlsReducer from "./features/controls/controlsSlice";
import tracksReducer from "./features/tracks/tracksSlice";
import profileReducer from "./features/profile/profileSlice";

export const store = configureStore({
    reducer: {
        controls: controlsReducer,
        tracks: tracksReducer,
        profile: profileReducer,
    }
});