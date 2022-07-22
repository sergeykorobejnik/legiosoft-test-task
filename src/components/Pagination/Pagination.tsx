import React, {FC, useCallback} from 'react';
import {Button, Center, Flex, Grid} from "@chakra-ui/react";
import {useAppDispatch, useAppSelector} from "../../redux";
import {setCurrentPage} from "../../redux/uiReducer";
import {ArrowBackIcon, ArrowForwardIcon} from "@chakra-ui/icons";

// Pagination Component rendering pagination depending on current array size

const Pagination: FC = props => {
    const transactions = useAppSelector(({user}) => user.transactions)
    const pageMultiplier = useAppSelector(({ui}) => ui.pageMultiplier)

    const dispatch = useAppDispatch()

    const pageCount = Math.ceil(transactions.size / 10)

    //handling next page and checking for available page range
    const handleNext = ():void => {
        if (pageMultiplier < transactions.size - 10) {
            dispatch(setCurrentPage(pageMultiplier + 10))
        }
    }

    //handling prev page and checking for available page range
    const handlePrev = ():void => {
        if (pageMultiplier > 0) {
            dispatch(setCurrentPage(pageMultiplier - 10))
        }
    }

    //wrapped in memo renderPagination func
    const renderPaginationTabs = useCallback(() => {
        const paginationTabs: React.ReactNode[] = []
        for (let i = 0; i < pageCount; i++) {
            paginationTabs.push(
                <Button
                    key={i + 1}
                    onClick={() => dispatch(setCurrentPage(i*10))}
                >{i + 1}</Button>
            )
        }
        return paginationTabs
    }, [transactions])



    return (
        <Flex
            dir="row"
            justify="center"
            align="center"
            gap="1"
            padding="5"
        >
            <Button onClick={handlePrev}><ArrowBackIcon/></Button>
            {
                renderPaginationTabs()
            }
            <Button onClick={handleNext}><ArrowForwardIcon/></Button>
        </Flex>
    );
};

export default Pagination;