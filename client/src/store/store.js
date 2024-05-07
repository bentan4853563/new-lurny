import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import lurnyReducer from "../reducers/lurnySlice";
import feedsSlice from "../reducers/feedsSlice";
import loadingReducer from "../reducers/loadingSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    lurny: lurnyReducer,
    feed: feedsSlice,
    loading: loadingReducer,
  },
});

export default store;
