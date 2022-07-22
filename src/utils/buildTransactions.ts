import {RawTransaction, RawTransactionsArray, TransactionsArray, TransactionsItem} from "../types/types";
import {transactionTemplate} from "./transactionTemplate";


// async func providing building Map from raw array parsed rom sever or file
export const buildTransactions = async (rawTransactionsArr: RawTransactionsArray): Promise<TransactionsArray> => {
    const map = new Map<string, TransactionsItem>()
    for  (const transaction of rawTransactionsArr) {
        await setTransactionToMap(map, transaction)
    }
    return map
}
//async wrapper for async iterations and app scaling (realization of loader progress)
const setTransactionToMap = async (map: Map<string, TransactionsItem>, transaction: RawTransaction): Promise<void> => {
    //generating a key for Map item better to use uuid. but have what we have
    const label = transaction[0]
    //getting keys from transaction template
    const transactionKeys  = Object.keys(transactionTemplate) as Array<keyof TransactionsItem>
    //transforming array in result transaction object
    const transactionValue = transaction.reduce((a, v, i) => {
        a[transactionKeys[i]] = v
        return a
    }, {} as TransactionsItem)
    map.set(transaction[0], transactionValue)
}