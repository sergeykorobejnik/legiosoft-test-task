import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {getActionTypes} from "../utils/getActionTypes";
import {TransactionsArray, TransactionsItem, TransactionsLabel} from "../types/types";

export enum StatusSorting {
    Default = 'Default',
    Pending = 'Pending',
    Completed = 'Completed',
    Canceled = 'Canceled',
}

export enum TypeSorting {
    Default = 'Default',
    Refill = 'Refill',
    Withdrawal = 'Withdrawal'
}

type SortPayload = Partial<Pick<Sort, 'status'>> | Partial<Pick<Sort, 'type'>>

interface EditPayload {
    field: keyof TransactionsItem
    value: string
}

export interface TransactionsPayload {
    transactions: TransactionsArray
}

export interface Sort {
    status: keyof typeof StatusSorting,
    type: keyof typeof TypeSorting,
}

interface InitialState {
    importedFile: File | undefined
    sort: Sort
    sortedTransactions: TransactionsArray
    editingTransactionLabel: TransactionsLabel
    readonly transactions: TransactionsArray
}

const initialState: InitialState = {
    importedFile: undefined,
    sort: {
        status: StatusSorting.Default,
        type: TypeSorting.Default,
    },
    editingTransactionLabel: '',
    sortedTransactions: new Map(),
    transactions: new Map()
}

const userReducer = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setTransactions(state, action: PayloadAction<TransactionsPayload>) {
            state.transactions = action.payload.transactions
        },
        deleteTransaction(state, {payload}: PayloadAction<TransactionsLabel>) {
            state.transactions.delete(payload)
        },
        editTransaction({transactions, editingTransactionLabel, sortedTransactions}, {payload}: PayloadAction<EditPayload>) {
            const item = transactions.get(editingTransactionLabel)
            if (item?.[payload.field]) {
                item[payload.field] = payload.value
                transactions.set(editingTransactionLabel, item)
            }
            if (item?.[payload.field] && sortedTransactions.size) {
                item[payload.field] = payload.value
                sortedTransactions.set(editingTransactionLabel, item)
            }
        },
        setEditingTransaction(state, {payload}: PayloadAction<TransactionsLabel>) {
            state.editingTransactionLabel = payload
        },
        clearEditingTransaction(state) {
            state.editingTransactionLabel = ''
        },
        removeTransaction(state) {
            //handling both transaction lists
            state.transactions.delete(state.editingTransactionLabel)
            if (state.sortedTransactions.size) {
                state.sortedTransactions.delete(state.editingTransactionLabel)
            }
        },
        setSorting(state, {payload}: PayloadAction<SortPayload>) {
            const keys = Object.keys(payload) as Array<keyof SortPayload>
            keys.forEach(key => {
                if (key in state.sort) {
                    state.sort[key] = payload[key]
                }
            })
        },
        setSortedTransactions(state, action: PayloadAction<TransactionsArray>) {
            state.sortedTransactions = action.payload
        },
        clearSortedTransactions(state) {
            state.sortedTransactions.clear()
        }
    }
})


export default userReducer.reducer
export const userActionTypes = getActionTypes(userReducer.actions, userReducer.name)
export const {
    setTransactions, editTransaction, setEditingTransaction, removeTransaction, clearEditingTransaction, setSorting,
    setSortedTransactions, clearSortedTransactions
} = userReducer.actions