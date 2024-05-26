import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import userReducer from "./userSlice";
import authReducer from "./authSlice";
import moviesReducer from "./moviesSlice";
import trendingReducer from "./trendingSlice";
import searchReducer from "./searchSlice";
import showCaseReducer from "./showCaseSlice";
import playerReducer from "./playerSlice";
import gptReducer from "./gptSlice";

const appStore = configureStore({
  reducer: {
    app: appReducer,
    authenticated: authReducer,
    user: userReducer,
    movies: moviesReducer,
    trendings: trendingReducer,
    search: searchReducer,
    showCase: showCaseReducer,
    player: playerReducer,
    gpt:gptReducer,
  },
  devTools: true
});

export default appStore;
