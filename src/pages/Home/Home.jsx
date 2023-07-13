import { useEffect } from "react";
import { FetchLeaderboard } from "../../hooks/useFetchLeaderboard";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/GenerateToken";



function Home() {
    const navigate = useNavigate()

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

    function startGame() {
        let token = generateToken()
        sessionStorage.setItem("token", token);
        navigate("/game")
    }

    useEffect(() => {
        sessionStorage.clear();
        getLeaderboard();
    }, []);

    return (
        <div style={{ width: "30vw" }}>
            <h1 className="home-title">Top Scores</h1>
            <div className="leaderboard">
                {printLeaderboard()}
            </div>
            <button className="play-button" onClick={startGame} >Play</button>
        </div>
    );
}

export default Home;