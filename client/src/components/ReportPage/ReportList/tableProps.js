import React from "react";
import {setSelectValues} from "../../../utils/functions/setSelectValues";
import {historyActionTypes, historyStatusTypes, userRoles} from "../../../constants";
import {formatFullName} from "../../../utils/functions/formatFullName";
import TableBtn from "../../global/Table/TableBtn/TableBtn";
import Svg from "../../layout/Svg/Svg";
import {fileIcon} from "../../../assets/svg";
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
        renderActions: (item) => <ReportListFileBtn/>
    },
]