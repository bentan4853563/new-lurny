import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../reducers/userSlice";
import loadingReducer from "../reducers/loadingSlice";
import lurnyReducer from "../reducers/lurnySlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    table: lurnyReducer,
    loading: loadingReducer,
  },
});

export default store;
