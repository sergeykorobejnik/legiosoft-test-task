export type TransactionFieldType = string
export type TransactionField = string
export type TransactionsItem = {
    id: string
    status: string
    type: string
    clientName: string
    amount: string
}
export type TransactionsLabel = string
export type TransactionsArray = Map<string, TransactionsItem>
export type RawTransaction = string[] //[string, 'Cancelled' | 'Completed' | 'Pending', 'Withdrawal' | 'Refill', string, string]
export type RawTransactionsArray = Array<RawTransaction>
