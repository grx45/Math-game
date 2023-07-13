import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, ButtonGroup } from "@chakra-ui/react";


function Scoremodal(props) {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>

                <ModalBody>

                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={props.onClose}>
                        Close
                    </Button>
                    <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default Scoremodal;