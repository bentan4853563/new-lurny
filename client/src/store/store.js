import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";
import loadingReducer from "../reducers/loadingSlice";
import lurnyReducer from "../reducers/lurnySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    lurny: lurnyReducer,
    loading: loadingReducer,
  },
});

export default store;
