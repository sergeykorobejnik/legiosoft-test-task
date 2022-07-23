import React, {FC} from 'react';
import {Button, Grid, SimpleGrid, Td} from "@chakra-ui/react";
import {TransactionsItem, TransactionsLabel} from "../../types/types";
import {useAppDispatch} from "../../redux";
import {setModal} from "../../redux/uiReducer";
import {setEditingTransaction} from "../../redux/userReducer";

interface Props {
    transaction: TransactionsItem
    children: React.ReactNode
}

const TransactionAction: FC<Props> = ({transaction, children}) => {
    const dispatch = useAppDispatch()

    const handleEdit = () => {
        dispatch(setEditingTransaction(transaction.id))
        dispatch(setModal({
            modalType: 'editModal',
            modalState: true
        }))

    }

    const handleDelete = () => {
        dispatch(setEditingTransaction(transaction.id))
        dispatch(setModal({
            modalType: 'deleteModal',
            modalState: true
        }))

    }

    return (
        <>
            {children}
            <Td>
                <Grid templateColumns="repeat(2, 1fr)" gap="2">
                    <Button
                        onClick={handleEdit}
                        fontSize={{
                            base: 12,
                            md: 16
                        }}
                    >Edit</Button>
                    <Button
                        onClick={handleDelete}
                        fontSize={{
                            base: 12,
                            md: 16
                        }}
                    >Delete</Button>
                </Grid>
            </Td>
        </>
    );
};

export default TransactionAction;