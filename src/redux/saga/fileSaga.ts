import {call, put, select, takeEvery} from 'redux-saga/effects'
import store from "../index";
import {readFileAsync} from "../../utils/readFileAsync";
import {RawTransactionsArray, TransactionsArray} from "../../types/types";
import {clearFile, fileActionTypes} from "../fileReducer";
import {setAlertMessage} from "../uiReducer";
import {setTransactions} from "../userReducer";
import {buildTransactions} from "../../utils/buildTransactions";



function* watchFileImport () {
    const {importedFile}: ReturnType<typeof store.getState>['file'] = yield select((state) => state.file)
    try {
        if (importedFile) {
            const parsedFile: string = yield call(() => readFileAsync(importedFile))
            const rawTransactions: RegExpMatchArray | null = parsedFile.match(/^(.+)$/gm)

            if (rawTransactions) {
                const rawTransactionArr: RawTransactionsArray = []
                // avoiding parsing header of csv file/ not clear solution,
                // but every iteration over big data have a big cost
                for (let i = 1; i < rawTransactions.length; i++) {
                    rawTransactionArr.push(rawTransactions[i].split(','))
                }
                const transactions: TransactionsArray = yield call(() => buildTransactions(rawTransactionArr))
                yield put(setTransactions({transactions}))
                yield put(clearFile())
            } else {
                yield put(setAlertMessage('Error reading file'))
            }
        }
    } catch (e) {
        put(setAlertMessage('Unknown Error reading file'))
    }
}

export function* fileSaga () {
    yield takeEvery(fileActionTypes.setFile, watchFileImport)
}