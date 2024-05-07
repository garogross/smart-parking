import TableBtn from "../../global/Table/TableBtn/TableBtn";
import React from "react";
import {setSelectValues} from "../../../utils/functions/setSelectValues";
import {historyActionTypes, historyStatusTypes, userRoles} from "../../../constants";
import {
    editEmployeePagePath,
    editTenantPagePath,
    editUserPagePath,
    tenantEmployeesPagePath
} from "../../../router/path";
import {formatFullName} from "../../../utils/functions/formatFullName";

export const flexCols = [2,1.5,2,2.5,4]


export const titles = [
    {
        name: "Полное имя",
        filterBy: 'input',
    },
    {
        name: "Логин",
        filterBy: 'input',
    },
    {
        name: "Электронная почта",
        filterBy: 'input',
    },
    {
        name: "Организация",
        filterBy: 'input',
    },
    {
        name: "Роль",
        filterBy: 'select',
        selectValues: setSelectValues(userRoles)
    },
]


export const setCols = (navigate,onOpenDeletePopup) => ([
    {
        key: "fullName",
        render: (item) => formatFullName(item.fullName)
    },
    {
        key: "username"
    },
    {
        key: "email"
    },
    {
        key: "organization--name"
    },
    {
        key: "role",
        renderActions: (item) => (
            <>
                <TableBtn onClick={() => navigate(`${editUserPagePath}/${item._id}`)} >Редактировать</TableBtn>
                <TableBtn
                    isNegative={true}
                    onClick={() => onOpenDeletePopup(item._id)}
                >Удалить</TableBtn>
            </>
        )
    },
])