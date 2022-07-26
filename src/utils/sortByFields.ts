import {Sort} from "../redux/userReducer";
import {TransactionsItem} from "../types/types";

type ComparingItem = [string, TransactionsItem]

interface SortByFieldsOptions {
    sort: Sort
    sortingArray: [string, TransactionsItem][]
}

type SortByFields = (sortByFieldsOptions: SortByFieldsOptions) => void

//The current mechanism, the function will check for the number of sort keys to avoid unnecessary iterations.
// If there are several fields for sorting, the function will first find full overlaps, and then start a simple
// sorting by the one field

const sortByFields: SortByFields = ({sort, sortingArray}) => {

    const sortKeys = Object.keys(sort) as Array<keyof Sort>
    const sortValues = Object.values(sort)

    const sortByOneField = () => {
        sortKeys.reverse().forEach(key => {
            sortingArray.sort((a, b) => {

                let multiplier: number = 0
                if (a[1][key] === sort[key]) {
                    multiplier -= 1
                }
                if (b[1][key] === sort[key]) {
                    multiplier += 1
                }
                return multiplier
            })
        })
    }

    const sortByMultiplyFields = () => {
        sortingArray.sort((a, b) => {
            let multiplier: number = 0
            if (sortKeys.every(key => a[1][key] === sort[key])) {
                multiplier -= 1
            }
            if (sortKeys.every(key => b[1][key] === sort[key])) {
                multiplier += 1
            }

            return multiplier
        })
    }

    if (!sortValues.some(value => value === 'Default')) {
        sortByMultiplyFields()
        sortByOneField()

    } else {
        sortByOneField()
    }
}

export {sortByFields}