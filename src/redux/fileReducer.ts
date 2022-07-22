import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getActionTypes} from "../utils/getActionTypes";

interface InitialState {
    importedFile: File | undefined
}

const initialState: InitialState = {
    importedFile: undefined
}

const fileReducer = createSlice({
    name: 'file',
    initialState,
    reducers: {
        setFile (state, action: PayloadAction<File>) {
            state.importedFile = action.payload
        },
        clearFile (state) {
            state.importedFile = undefined
        }
    }
})

export default fileReducer.reducer
export const fileActionTypes = getActionTypes(fileReducer.actions, fileReducer.name)
export const {setFile, clearFile} = fileReducer.actions