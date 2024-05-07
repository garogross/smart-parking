import TableBtn from "../../global/Table/TableBtn/TableBtn";
import React from "react";
import {setSelectValues} from "../../../utils/functions/setSelectValues";
import {historyActionTypes, historyStatusTypes} from "../../../constants";
import {editEmployeePagePath, editTenantPagePath, tenantEmployeesPagePath} from "../../../router/path";
import {formatFullName} from "../../../utils/functions/formatFullName";

export const flexCols = [3,2,1.5,2,3.5]


export const titles = [
    {
        name: "Наименование",
        filterBy: 'input',
    },
    {
        name: "Контактный телефон",
    },
    {
        name: "Номер машины",
    },
    {
        name: "Модель автомобиля",
    },
    {
        name: "Фактическое нахождение на обьекте",
    },
]


export const setCols = (navigate,onOpenDeletePopup) => ([
    {
        key: "fullName",
        render: (item) => formatFullName(item.fullName)
    },
    {
        key: "phoneNumber"
    },
    {
        key: "cars--plateNumber"
    },
    {
        key: "cars--model"
    },
    {
        key: "isInPark",
        render: (item) => item.isInPark ? 'Да' : 'Нет',
        renderActions: (item) => (
            <>
                <TableBtn onClick={() => navigate(`${editEmployeePagePath}/${item._id}`)} >Редактировать</TableBtn>
                <TableBtn isNegative={true} onClick={() => onOpenDeletePopup(item._id)}>Удалить</TableBtn>
            </>
        )
    },
])