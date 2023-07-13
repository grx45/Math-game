import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { generateToken } from "../helpers/GenerateToken";
import { useSelector } from "react-redux";


function Scoremodal(props) {
    const navigate = useNavigate()
    const leaderboard = useSelector((state) => state.leaderboardReducer.data);

    function printLeaderboard() {
        let leaderboardEntries = []

        for (let i = 0; i < 5; i++) {
            const score = leaderboard[i]?.score;
            const scoreDisplay = score === undefined || null ? "-" : score

            leaderboardEntries.push(
                <Text color={leaderboard[i]?.token === props.token ? "red" : "black"} fontSize={"25px"} fontWeight={"semibold"} key={`standing${i + 1}`}>{i + 1}.{" "}{scoreDisplay}</Text>
            )
        }
        return leaderboardEntries
    }

    function handleBtnClose() {
        props.onClose()
        navigate("/")
    }

    function handleBtnReset() {
        let token = generateToken()
        sessionStorage.setItem("token", token);

        props.setProgress(1);
        props.setScore(0);
        props.setSubmission("");

        const inputfield = document.getElementById("input")
        inputfield.value = ''

        props.onClose()

        navigate("/game")
    }


    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose} size={"sm"} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader textAlign={"center"} fontSize={"40px"} fontWeight={"bold"}>FInal Score: {props.score}</ModalHeader>

                <ModalBody>
                    {printLeaderboard()}
                </ModalBody>

                <ModalFooter>
                    <Button onClick={handleBtnReset} variant={"outline"} border={"4px"} borderRadius={"none"} width={"45%"} mr={3} fontSize={"20px"} >
                        Retry
                    </Button>
                    <Button onClick={handleBtnClose} variant={"outline"} border={"4px"} borderRadius={"none"} width={"45%"} fontSize={"20px"}>Exit</Button>
                </ModalFooter>
            </ModalContent>
        </Modal >
    );
}

export default Scoremodal;