import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  feeds: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setFeeds: (state, action) => {
      state.feeds = action.payload;
    },
  },
});

export const { setFeeds } = feedSlice.actions;

export default feedSlice.reducer;
