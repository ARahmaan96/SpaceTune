import { createSlice } from "@reduxjs/toolkit";
export const audioSlicer = createSlice({
    name: "bottom",
    initialState: {
        isVisible: true
    },
    reducers: {
        setIsVisible(state, action) {
            state.isVisible = action.payload.isVisible
        }
    }
});
export const { setIsVisible } = audioSlicer.actions
export default audioSlicer.reducer
