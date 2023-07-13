import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateLeaderboard } from "../../hooks/useUpdateLeaderboard";
import { useSelector } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import Scoremodal from "../../components/Scoremodal";

function Game() {
    const token = sessionStorage.getItem("token");
    const leaderboard = useSelector((state) => state.leaderboardReducer.data);
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    let [progress, setProgress] = useState(1)
    const [num1, setNum1] = useState(generateNumber())
    const [num2, setNum2] = useState(generateNumber())
    const [submission, setSubmission] = useState('')
    let [score, setScore] = useState(0)

    const { updateLeaderBoard } = useUpdateLeaderboard()

    function generateNumber() {
        let number = Math.floor(Math.random() * 20)
        return number
    }

    function generateQuestion() {
        setNum1(generateNumber())
        setNum2(generateNumber())
    }

    async function handleSubmit() {
        if (progress === 5) {

            const answer = parseInt(submission)

            if (answer === num1 + num2) {
                score++
                setScore(score)
            }
            await updateLeaderBoard(token, score, leaderboard)
            onOpen();
            return
        }

        const answer = parseInt(submission)

        if (answer === num1 + num2) {
            score++
            setScore(score)
        }

        progress++
        setProgress(progress++)

        setSubmission('')
        const inputfield = document.getElementById("input")
        inputfield.value = ''
        inputfield.focus()

        generateQuestion()
    }

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, [])

    return (
        <>
            <div className="container" >
                <h1 className="game-progress">Question {progress}/10</h1>
                <div className="game-interface">
                    <h2> {num1} + {num2} = </h2>
                    <input id="input" onChange={(event) => setSubmission(event.target.value)} />
                </div>
                <button onClick={handleSubmit} className="submit-button"><p style={{ fontSize: "25px", padding: 0, marginBlockStart: 0, marginBlockEnd: 0 }}>Submit</p></button>
            </div>
            <h2 className="score-track">Score: {score}</h2>
            <Scoremodal isOpen={isOpen} onClose={onClose} score={score} token={token} setProgress={setProgress} setScore={setScore} setSubmission={setSubmission} />

        </>
    );
}

export default Game;