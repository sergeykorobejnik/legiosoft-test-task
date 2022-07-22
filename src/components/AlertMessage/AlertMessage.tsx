import React, {FC, useEffect} from 'react';
import {useToast,} from '@chakra-ui/react'
import {useAppDispatch, useAppSelector} from "../../redux";

interface StyledProps {
    isShown: boolean
}

//Small hoc over chackra ui toast hook
const AlertMessage:FC = props => {

    const alertMessage = useAppSelector(({ui}) => ui.alert)
    const dispatch = useAppDispatch()
    const toast = useToast()
    useEffect(() => {
        if (alertMessage) {
            toast({
                title: alertMessage,
                status: 'error',
                isClosable: true,
                duration: 2e3
            })
        }
    }, [alertMessage, dispatch, toast])
    return (
        <>
        </>
    )
};

export default AlertMessage;