import { useEffect } from "react";
import { FetchLeaderboard } from "../../hooks/useFetchLeaderboard";


function Home() {

    const { leaderboard, getLeaderboard } = FetchLeaderboard()

    function printLeaderboard() {
        let leaderboardEntries = []

        for (let i = 0; i < 5; i++) {
            const score = leaderboard[i]?.score;
            const scoreDisplay = score === undefined || null ? "-" : score

            leaderboardEntries.push(
                <h2 key={`standing${i + 1}`}>{i + 1}.{" "}{scoreDisplay}</h2>
            )
        }
        return leaderboardEntries
    }

    useEffect(() => {
        getLeaderboard();
    }, []);

    return (
        <section className="home-page">
            <h1 style={{ textAlign: "left", marginBottom: "15px" }}>Top Scores</h1>
            <div className="leaderboard">
                {
                    printLeaderboard()
                }
            </div>
            <button className="play-button">Play</button>
        </section>
    );
}

export default Home;