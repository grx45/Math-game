import { configureStore } from "@reduxjs/toolkit";
import leaderboardReducer from "./leaderboard";

const globalStore = configureStore({
  reducer: {
    leaderboardReducer,
  },
});

export default globalStore;
