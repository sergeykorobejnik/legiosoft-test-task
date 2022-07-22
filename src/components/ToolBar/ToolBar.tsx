import React, {ChangeEvent, FC, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux";
import SortMenu from "../SortMenu/SortMenu";
import {StatusSorting, TypeSorting} from "../../redux/userReducer";
import {Button, Flex} from "@chakra-ui/react";
import styled from "styled-components";
import {setFile} from "../../redux/fileReducer";
import {buildExportingFile} from "../../utils/buildExportingFile";

const HiddenInput = styled.input`
    display: none;
`

const HiddenLink = styled.a`
    display: none;
`


const ToolBar: FC = () => {
    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLAnchorElement>(null)
    const transactions = useAppSelector(({user}) => user.transactions)
    const sortedTransactions = useAppSelector(({user}) => user.sortedTransactions)

    //checking for file and firing open file dialogue window on hidden input
    const openFileDialogue = (): void => {
        if (inputRef.current) {
            inputRef.current.click()
        }
    }

    //dispatching file to store
    const handleFile = (event: ChangeEvent<HTMLInputElement>): void => {
        const reader = new FileReader()
        if (event.target.files?.[0]) {
            const file = event.target.files?.[0]
            dispatch(setFile(file))
        }
    }

    //firing click on hidden link for download file
    const exportFile = () => {
        if (linkRef.current) {
            const {link} = buildExportingFile(
                sortedTransactions.size ? sortedTransactions : transactions
            )
            linkRef.current.download = 'exported_Table.csv'
            linkRef.current.href = link
            linkRef.current.click()
        }
    }

    return (
        <Flex
            align="center"
            justify="space-between"
            padding="5"
        >
            <Flex gap="5">
                <SortMenu
                    sortingType="status"
                    label="Status"
                    menuItems={StatusSorting}
                />
                <SortMenu
                    sortingType="type"
                    label="Type"
                    menuItems={TypeSorting}
                />
            </Flex>
            <Flex gap="5">
                <Button onClick={openFileDialogue}>
                    Import
                </Button>
                <Button onClick={exportFile}>
                    Export
                </Button>
                <HiddenInput ref={inputRef} type="file" accept="text/csv" onChange={handleFile}/>
                <HiddenLink ref={linkRef}/>
            </Flex>
        </Flex>
    )

};

export default ToolBar;