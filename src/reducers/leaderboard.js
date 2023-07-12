import { createSlice } from "@reduxjs/toolkit";

const leaderboardSlice = createSlice({
  name: "leaderboard",

  initialState: {
    data: [],
  },

  reducers: {
    leaderboardUpdate: (state, action) => {
      state.data = action.payload;
    },
    leaderboardEmpty: (state, action) => {
      state.data = [];
    },
  },
});

// Export action function nya
export const { leaderboardUpdate, leaderboardEmpty } = leaderboardSlice.actions; // fungsi di dalam property reducers

// Export reducersnya
export default leaderboardSlice.reducer;
