import {Box, Flex} from "@chakra-ui/react";
import ToolBar from "./components/ToolBar/ToolBar";
import TransactionsContainer from "./components/TransactionsContainer/TransactionsContainer";
import AlertMessage from "./components/AlertMessage/AlertMessage";
import {useEffect} from "react";
import {useAppDispatch} from "./redux";
import {setLoadingStart} from "./redux/uiReducer";
import EditTransactionModal from "./components/EditTransactionModal/EditTransactionModal";
import DeleteTransactionModal from "./components/DeleteTransactionModal/DeleteTransactionModal";
import Pagination from "./components/Pagination/Pagination";

function App() {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(setLoadingStart())
    })
    return (
        <Box w="100%" h="100vh" bg="rgba(0, 0, 0, 0.2)" padding="2" >
            <ToolBar/>
            <TransactionsContainer/>
            <Pagination/>
            <EditTransactionModal/>
            <DeleteTransactionModal/>
            <AlertMessage/>
        </Box>
);
}

export default App;
