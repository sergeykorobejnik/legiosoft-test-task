import React, {FC} from 'react';
import {
    Button,
    Center,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../redux";
import {setModal} from "../../redux/uiReducer";
import {ArrowDownIcon} from "@chakra-ui/icons";
import {clearEditingTransaction, editTransaction, StatusSorting} from "../../redux/userReducer";


const EditTransactionModal: FC = () => {
    const dispatch = useAppDispatch()
    const isOpen = useAppSelector(({ui}) => ui.modals.editModal)
    const statusKeys = Object.keys(StatusSorting) as Array<keyof typeof StatusSorting>
    const onClose = () => {
        dispatch(setModal({
            modalType: 'editModal',
            modalState: false,
        }))
        dispatch(clearEditingTransaction())
    }
    const onSave = (value: keyof typeof StatusSorting) => {
        dispatch(editTransaction({
            field: 'status',
            value
        }))
    }
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Change transaction status</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={8} >
                    <Center>
                        <Menu>
                            <MenuButton as={Button} rightIcon={<ArrowDownIcon />}>
                                Status
                            </MenuButton>
                            <MenuList>
                                {
                                    statusKeys.map((item, index) =>
                                        <MenuItem
                                        key={index}
                                        onClick={() => onSave(item)}
                                    >{item}</MenuItem>)
                                }
                            </MenuList>
                        </Menu>
                    </Center>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>);
};

export default EditTransactionModal;