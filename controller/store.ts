import { configureStore } from "@reduxjs/toolkit";
import musicSlice from "./slices/music_slice";
import bottomControllerSlicer from "./slices/bottom_slice";
const store = configureStore({
    reducer: {
        audio: musicSlice,
        bottom: bottomControllerSlicer,
    }
});

export default store