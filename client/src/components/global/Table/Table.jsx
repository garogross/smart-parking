import React, {useEffect, useState} from 'react';

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

    const onSortChange = (sortBy,filters) => {
        setSortBy(sortBy)
        getData(filters,page,sortBy)
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
                        onSortChange={onSortChange}
                        dataLength={data.length}
                        onFiltersChange={onFiltersChange}
                    />
                    <TableColList
                        loading={loading}
                        sortedData={data}
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