import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentlyPlaying: null,
  fiteredContent: [],
  content: [],
};

export const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    updateFilteredContent: (state, action) => {
      state.fiteredContent = action.payload;
    },
    updateContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { updateFilteredContent, updateAllContent } = contentSlice.actions;

export default contentSlice.reducer;
