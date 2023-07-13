import axios from "axios";
import { API_URL } from "../helpers/URL";
import { FetchLeaderboard } from "./useFetchLeaderboard";

export const useUpdateLeaderboard = () => {
  const { getLeaderboard } = FetchLeaderboard();
  const updateLeaderBoard = async (token, score, leaderboard) => {
    try {
      if (leaderboard.length < 5) {
        await axios.post(
          `${API_URL}leaderboard`,
          {
            score: score,
            token: token,
          },
          {}
        );
        await getLeaderboard();
        return;
      }
      const foundEntry = leaderboard.find((entry) => entry.score < score);

      if (foundEntry) {
        const foundId = foundEntry.id;
        await axios.patch(
          `${API_URL}leaderboard/${foundId}`,
          {
            score: score,
            token: token,
          },
          {}
        );
        await getLeaderboard();
        return;
      } else {
        return;
      }
    } catch (error) {
      console.log("error update leaderboard: ", error);
    }
  };
  return { updateLeaderBoard };
};
