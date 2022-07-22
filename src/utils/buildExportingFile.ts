import {TransactionsArray} from "../types/types";
import {transactionHeaders} from "./transactionHeaders";

interface ExportFile {
    file: Blob,
    link: string
}

type BuildExportingFile = (transactions: TransactionsArray) => ExportFile

// sync function for building string form Map transactions data

const buildExportingFile: BuildExportingFile = (transactions) => {

    let resString: string = ''
    //passing headers to string
    resString += transactionHeaders.toString() + '\n'

    const transactionsData = Array.from(transactions.values())

    //parsing transactions and building string
    resString += transactionsData.map(item => Object.values(item).toString()).join('\n')

    //creating exporting file
    const file = new Blob([resString], {type: 'text/csv'})

    return {
        file,
        link: URL.createObjectURL(file)
    }
}

export {buildExportingFile}