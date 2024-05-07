import React from 'react';
import DataLoader from "../../../layout/DataLoader/DataLoader";
import {formatDate} from "../../../../utils/functions/date";

import styles from "./TableColList.module.scss";

function TableColList({
                          loading,
                          sortedData,
                          cols,
                          titles,
                          flexCols
}) {

    return (
        <div className={styles["tableColList"]}>
            <DataLoader
                loading={loading}
                isEmpty={!sortedData.length}
            >
                {
                    sortedData.map((dataItem) => {
                        return (
                            <div key={dataItem._id} className={styles["tableColList__item"]}>
                                {
                                    cols.map((item, index) => {
                                        const key = item.key

                                        let keys = []
                                        if (key.includes('--')) {
                                            keys = key.split('--')

                                        }

                                        let renderItem = dataItem?.[key] ?? ""

                                        if(key.length > 1) {
                                            keys.forEach((item,index) => {
                                                renderItem = !index ?
                                                    dataItem?.[item] :
                                                    renderItem?.[item]
                                            })
                                        }

                                        if (titles[index].type === "date") {
                                            renderItem = formatDate(renderItem)
                                        }
                                        return (
                                            <div key={index} style={{flex: flexCols[index]}}
                                                 className={styles["tableColList__itemContent"]}>
                                                {
                                                    item.render ?
                                                        item.render(dataItem) :
                                                        <span>{renderItem}</span>
                                                }
                                                {
                                                    item.renderActions ?
                                                        <div className={styles["tableColList__itemActions"]}>
                                                            {item.renderActions(dataItem)}
                                                        </div>
                                                        : null
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })
                }
            </DataLoader>
        </div>
    );
}

export default TableColList;