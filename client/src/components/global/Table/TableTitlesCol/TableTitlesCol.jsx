import React, {useEffect, useRef} from 'react';
import Svg from "../../../layout/Svg/Svg";
import {sortIcon} from "../../../../assets/svg";
import Select from "../../../layout/Select/Select";
import {useFormValue} from "../../../../hooks/useFormValue";

import styles from "./TableTitlesCol.module.scss";

function TableTitlesCol({
                            loading,
                            titles,
                            flexCols,
                            cols,
                            sortBy,
                            onFiltersChange,
                            dataLength,
                            onSortChange
                        }) {
    const filtersTimeOutRef = useRef(null)

    const filtersInitial = cols.reduce((acc, cur, index) => {
        if (titles[index].filterBy) {
            acc[cur.key] = ""
        }
        return acc
    }, {})

    const {formData: filters, setFormData: setFilters, onChange} = useFormValue(filtersInitial)
    useEffect(() => {
        if (filtersTimeOutRef.current) clearTimeout(filtersTimeOutRef.current)
        filtersTimeOutRef.current = setTimeout(() => {
            onFiltersChange(filters)
        }, 500)
    }, [filters]);

    const onSort = (key) => {
        let sortByVal = ""
            if (sortBy && sortBy.startsWith(key)) {
                sortByVal = sortBy.endsWith('+') ? key + "-" : key + "+"
            } else {
                sortByVal = key + "-"
            }

        onSortChange(sortByVal,filters)
    }

    const onSelectFilter = (key, value) => {
        setFilters(prevState => ({
            ...prevState,
            [key]: value
        }))
    }

    return (
        <div className={styles["tableTitlesCol"]}>
            {loading ? <div className={styles['tableTitlesCol__loader']}></div> : null}
            {
                titles.map(({name, filterBy, selectValues, type, sortDisabled}, index) => {
                    return (
                        <div
                            key={index}
                            style={{flex: flexCols[index]}}
                            className={styles["tableTitlesCol__item"]}
                        >
                            <button
                                onClick={!sortDisabled ? () => onSort(cols[index].key) : null}
                                className={styles["tableTitlesCol__itemBtn"]}
                            >
                                <h6 className={styles["tableTitlesCol__itemText"]}>{name}</h6>
                                {
                                    sortBy.startsWith(cols[index].key) ?
                                        <Svg
                                            className={
                                                `${styles["tableTitlesCol__sortIcon"]} ` +
                                                `${sortBy.endsWith('-') ? styles["tableTitlesCol__sortIcon__reversed"] : null}`
                                            }
                                            id={sortIcon}
                                        />
                                        : null
                                }
                            </button>
                            {
                                filterBy ?
                                    <>
                                        {
                                            filterBy === 'input' ?
                                                <input
                                                    disabled={!dataLength && loading}
                                                    onChange={onChange}
                                                    name={cols[index].key}
                                                    value={filters[cols[index].key]}
                                                    type={type || "text"}
                                                    className={styles["tableTitlesCol__filterInput"]}
                                                /> :
                                                <Select
                                                    disableState={!dataLength && loading}
                                                    valuesArr={[{item: "Все", value: ""}, ...selectValues]}
                                                    className={styles["tableTitlesCol__filterInput"]}
                                                    selectedValueProp={null}
                                                    onChange={(value) => onSelectFilter(cols[index].key, value)}
                                                    name={'Все'}
                                                />
                                        }
                                    </>
                                    : null
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default TableTitlesCol;