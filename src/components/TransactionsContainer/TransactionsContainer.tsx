import React, {FC, useMemo} from 'react';
import {Flex, Table, TableContainer, Tbody, Th, Thead, Tr} from "@chakra-ui/react";
import {useAppSelector} from "../../redux";
import TransactionItem from "../TransactionItem/TransactionItem";


const TransactionsContainer: FC = props => {
    const transactions = useAppSelector(({user}) => user.transactions)
    const sortedTransactions = useAppSelector(({user}) => user.sortedTransactions)
    const pageMultiplier = useAppSelector(({ui}) => ui.pageMultiplier)

    const transactionList = useMemo(() => Array.from(transactions.values()), [transactions])
    const sortedTransactionList = useMemo(() => Array.from(sortedTransactions.values()), [sortedTransactions])
    return (
        <Flex
            direction="column"
        >
            <TableContainer>
                <Table>
                    <Thead>
                        <Tr>
                            <Th>Transaction id</Th>
                            <Th>Status</Th>
                            <Th>Type</Th>
                            <Th>Client name</Th>
                            <Th>Amount</Th>
                            <Th>Action</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {sortedTransactions.size
                            ? sortedTransactionList
                                .slice(pageMultiplier, pageMultiplier + 10)
                                .map((item, index) => <TransactionItem key={item.id} transaction={item}/>)
                            : transactionList
                                .slice(pageMultiplier, pageMultiplier + 10)
                                .map((item, index) => <TransactionItem key={item.id} transaction={item}/>)
                        }
                    </Tbody>
                </Table>
            </TableContainer>
        </Flex>
    )
};

export default TransactionsContainer;