import {call, put, select, takeEvery} from 'redux-saga/effects'
import axios, {AxiosResponse} from "axios";
import {clearSortedTransactions, setSortedTransactions, setTransactions, Sort, userActionTypes} from "../userReducer";
import {RawTransactionsArray, TransactionsArray} from "../../types/types";
import {buildTransactions} from "../../utils/buildTransactions";
import {setAlertMessage, setLoadingStop, uiActionTypes} from "../uiReducer";
import store from "../index";
import {sortByFields} from "../../utils/sortByFields";

function* fetchTransactions () {
    try {
        //getting data from axios-adapter
        const response: AxiosResponse<{ transactions: RawTransactionsArray }> = yield call(() => axios.get('/transactions'))
        const transactions = response.data.transactions
        //building transaction Map
        const mapData: TransactionsArray = yield call(() => buildTransactions(transactions))
        //dispatching transactions to store and stopping loading
        yield put(setTransactions({transactions: mapData}))
        yield put(setLoadingStop())
    } catch (e) {
        yield put(setAlertMessage('Unknown error'))
        console.log(e)
    }

}

function* watchSorting () {
    //reading sort object and transactions Map from store
    const {sort, transactions}: ReturnType<typeof store.getState>['user'] = yield select((state) => state.user)
    const sortKeys = Object.keys(sort) as Array<keyof Sort>
    const sortValues = Object.values(sort)
    const sortingTransactions = Array.from(transactions.entries())
    //checking for unnecessary sort updating and cleaning sorted transactions
    if (sortValues.every(value => value === 'Default')) {
        yield put(clearSortedTransactions())
    } else {
        //sorting over the all keys available in sort object
        sortByFields({
            sort,
            sortingArray: sortingTransactions
        })

        yield put(setSortedTransactions(new Map(sortingTransactions)))
    }
}


export function* workerUser () {
    yield takeEvery(uiActionTypes.setLoadingStart, fetchTransactions)
    yield takeEvery(userActionTypes.setSorting, watchSorting)
}