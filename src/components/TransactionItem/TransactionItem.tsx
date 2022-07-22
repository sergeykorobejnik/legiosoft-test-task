import React, {FC, useMemo} from 'react';
import {Td, Tr} from "@chakra-ui/react";
import {TransactionsItem} from "../../types/types";
import TransactionAction from "../TransactionAction/TransactionAction";

interface Props {
    transaction: TransactionsItem
}

const TransactionItem: FC<Props> = ({transaction}) => {
    const transactionValues = Object.values(transaction)
    return (
        <Tr>
            {
                transactionValues.map((field, index, list) => index === transactionValues.length - 1
                    ? <TransactionAction key={index} transaction={transaction}><Td>{field}</Td></TransactionAction>
                    : <Td key={index}>{field}</Td>
                )
            }
        </Tr>
    );
};

export default TransactionItem;