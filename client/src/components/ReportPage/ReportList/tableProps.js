import React from "react";
import ReportListFileBtn from "./ReportListFileBtn/ReportListFileBtn";

export const flexCols =  [5,3,4]
export const titles =  [
    {
        name: "Наименование",
        filterBy: 'input',
    },
    {
        name: "Тариф",
    },
    {
        name: "Количество выделяемых машиномест",
        filterBy: 'input',
    },
]
export const cols =  [
    {
        key: "name"
    },
    {
        key: "tariff",
    },
    {
        key: "allowedCarCount",
        renderActions: (item) => <ReportListFileBtn id={item._id}/>
    },
]