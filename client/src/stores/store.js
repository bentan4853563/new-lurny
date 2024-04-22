import { configureStore } from "@reduxjs/toolkit";
import lurnySlice from "../reducers/lurnySlice";
import userSlice from "../reducers/userSlice";
import loadingSlice from "../reducers/loadingSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    lurny: lurnySlice,
    loading: loadingSlice,
  },
});

export default store;
