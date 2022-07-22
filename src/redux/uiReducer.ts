import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getActionTypes} from "../utils/getActionTypes";
import {TransactionField, TransactionFieldType} from "../types/types";

interface InitialState {
    loadingTransactions: boolean,
    alert: string,
    pageMultiplier: number,
    modals: {
        editModal: boolean,
        deleteModal: boolean,
    }

}

const initialState: InitialState = {
    loadingTransactions: false,
    pageMultiplier: 0,
    modals: {
        editModal: false,
        deleteModal: false,
    },
    alert: ''
}

const uiReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoadingStart (state) {
            state.loadingTransactions = true
        },
        setLoadingStop (state) {
            state.loadingTransactions = false
        },
        setAlertMessage (state, action: PayloadAction<string>) {
            state.alert = action.payload
        },
        clearAlert (state) {
            state.alert = ''
        },
        setModal (state, {payload}: PayloadAction<{modalType: keyof InitialState['modals'], modalState: boolean}>) {
            state.modals[payload.modalType] = payload.modalState
        },
        setCurrentPage (state, action: PayloadAction<number>) {
            state.pageMultiplier = action.payload
        }
    }
})


export default uiReducer.reducer
export const uiActionTypes = getActionTypes(uiReducer.actions, uiReducer.name)
export const {setLoadingStart, setLoadingStop, setAlertMessage, clearAlert, setModal, setCurrentPage} = uiReducer.actions