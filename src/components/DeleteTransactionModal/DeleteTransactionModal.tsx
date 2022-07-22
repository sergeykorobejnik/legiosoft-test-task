import React, {FC} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux";
import {clearEditingTransaction, removeTransaction} from "../../redux/userReducer";
import {setModal} from "../../redux/uiReducer";
import {
    Button,
    Center,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

const DeleteTransactionModal:FC = props => {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector(({ui}) => ui.modals.deleteModal)
    const onClose = () => {
        dispatch(setModal({
            modalType: 'deleteModal',
            modalState: false,
        }))
        dispatch(clearEditingTransaction())

    }
    const onDelete = () => {
        dispatch(removeTransaction())
        dispatch(clearEditingTransaction())
        dispatch(setModal({
            modalType: 'deleteModal',
            modalState: false,
        }))
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Confirm transaction removing</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={8} >
                    <Center>
                        <h2>Are you sure you want to delete the transaction?</h2>
                    </Center>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="error" onClick={onDelete}>Delete</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>);
};

export default DeleteTransactionModal;