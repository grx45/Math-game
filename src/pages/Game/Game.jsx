import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../helpers/URL";
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, ButtonGroup } from "@chakra-ui/react";

function Game() {
    const token = sessionStorage.getItem("token");
    const leaderboard = useSelector((state) => state.leaderboardReducer.data)
    const navigate = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()

    let [progress, setProgress] = useState(1)
    const [num1, setNum1] = useState(generateNumber())
    const [num2, setNum2] = useState(generateNumber())
    const [submission, setSubmission] = useState('')
    let [score, setScore] = useState(0)

    function generateNumber() {
        let number = Math.floor(Math.random() * 20)
        return number
    }

    function generateQuestion() {
        setNum1(generateNumber())
        setNum2(generateNumber())
    }

    function handleSubmit() {
        if (progress == 2) {

            onOpen();
            updateLeaderBoard()
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

    const updateLeaderBoard = async () => {
        try {
            if (leaderboard.length < 5) {
                await axios.post(
                    `${API_URL}leaderboard`, {
                    score: score,
                    token: token
                }, {}
                )
            }

        } catch (error) {
            console.log("error update leaderboard: ", error)
        }
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

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>

                    <ModalBody>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    );
}

export default Game;