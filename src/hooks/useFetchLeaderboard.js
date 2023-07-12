import { useState } from "react";
import { useDispatch } from "react-redux";
import { API_URL } from "../helpers/URL";
import { leaderboardUpdate } from "../reducers/leaderboard";
import axios from "axios";

export const FetchLeaderboard = () => {
  const dispatch = useDispatch();
  const [leaderboard, setLeaderboard] = useState([]);

  async function getLeaderboard() {
    try {
      const fetch = await axios.get(
        `${API_URL}leaderboard?_sort=score&_order=desc`,
        {}
      );
      setLeaderboard(fetch.data);
      dispatch(leaderboardUpdate(fetch.data));
    } catch (error) {
      console.log("Error getting leaderboard", error);
    }
  }

  return { leaderboard, getLeaderboard };
};
