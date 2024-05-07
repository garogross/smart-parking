import TableBtn from "../../global/Table/TableBtn/TableBtn";
import React from "react";
import {setSelectValues} from "../../../utils/functions/setSelectValues";
import {historyActionTypes, historyStatusTypes} from "../../../constants";
import {editEmployeePagePath, editTenantPagePath, tenantEmployeesPagePath} from "../../../router/path";

export const flexCols = [3,2,2,5]


export const titles = [
    {
        name: "Наименование",
        filterBy: 'input',
    },
    {
        name: "ИНН",
        filterBy: 'input',
    },
    {
        name: "Адрес",
        filterBy: 'input',
    },
    {
        name: "Количество выделяемых машиномест",
        filterBy: 'input',
    },
]


export const setCols = (navigate,onOpenDeletePopup) => ([
    {
        key: "name",
    },
    {
        key: "tin"
    },
    {
        key: "address"
    },
    {
        key: "allowedCarCount",
        renderActions: (item) => (
            <>
                <TableBtn onClick={() => navigate(`${tenantEmployeesPagePath}/${item._id}`)} >Сотрудники</TableBtn>
                <TableBtn onClick={() => navigate(`${editTenantPagePath}/${item._id}`)} >Редактировать</TableBtn>
                <TableBtn isNegative={true} onClick={() => onOpenDeletePopup(item._id)}>Удалить</TableBtn>
            </>
        )
    },
])