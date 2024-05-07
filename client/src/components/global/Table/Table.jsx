import React, {useState} from 'react';

import ListPagination from "../ListPagination/ListPagination";
import TableTitlesCol from "./TableTitlesCol/TableTitlesCol";
import TableColList from "./TableColList/TableColList";

import styles from "./Table.module.scss"
import {scrollTop} from "../../../utils/functions/scrollTop";

function Table({
                   flexCols,
                   titles,
                   cols,
                   data,
                   loading,
                   totalCount,
                   page,
                   getData,
                   setFilters
               }) {
    const [sortBy, setSortBy] = useState("")



    const onChangeListPage = (page) => {
        scrollTop()
        getData(null,page)
    }

    const onFiltersChange = (filters) => {
        if(setFilters) setFilters(filters)
        getData(filters,1)
    }

    let sortedData = data

    if (sortBy) {
        const sortFunc = (a, b) => {
            const key = sortBy.slice(0, sortBy.length - 1)
            let aKey = a?.[key]
            let bKey = b?.[key]
            const keys = key.split('--')
            if(keys.length > 1) {
                keys.forEach((item,index) => {
                    if(!index) {
                        aKey = a?.[item] ?? ""
                        bKey = b?.[item] ?? ""
                    } else {
                        aKey = aKey?.[item] ?? ""
                        bKey = bKey?.[item] ?? ""
                    }
                })
            }
            if(!isNaN(+a[key])) {
                return sortBy.endsWith('+') ? aKey - bKey : bKey - aKey
            }
            const curCol = cols.find(item => item.key === key)
            const isDate = curCol?.type === "date"
            aKey = isDate ? new Date(aKey) : aKey.toLowerCase()
            bKey = isDate ? new Date(bKey) : bKey.toLowerCase()

            return (
                sortBy.endsWith('+') ?
                    aKey < bKey ? -1 : 1
                    :
                    aKey > bKey ? -1 : 1
            )
        }

        sortedData = data.sort(sortFunc)
    }

    return (
        <>
            <div className={`${styles["table"]} blackBox scrollbarDef`}>
                <div className={styles["table__container"]}>
                    <TableTitlesCol
                        loading={loading}
                        titles={titles}
                        flexCols={flexCols}
                        cols={cols}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        dataLength={data.length}
                        onFiltersChange={onFiltersChange}
                    />
                    <TableColList
                        loading={loading}
                        sortedData={sortedData}
                        cols={cols}
                        titles={titles}
                        flexCols={flexCols}
                    />
                </div>
            </div>
            <ListPagination
                totalCount={totalCount}
                curPage={page}
                onPageChange={onChangeListPage}
            />
        </>

    );
}

export default Table;