import TableBtn from "../../global/Table/TableBtn/TableBtn";
import React from "react";
import { editTenantPagePath, tenantEmployeesPagePath} from "../../../router/path";
import {formatFullName} from "../../../utils/functions/formatFullName";

export const timeConst = "TIME"

export const flexCols = [3,2,1,1,2,2,1]


export const titles = [
    {
        name: "Ф.И.О",
        sortDisabled: true
    },
    {
        name: "Автомобиль",
        sortDisabled: true,
    },
    {
        name: `время парковки (${timeConst})`,
        sortDisabled: true,
    },
    {
        name: "стоимость",
        sortDisabled: true,
    },
    {
        name: "время после округления",
        sortDisabled: true,
    },
    {
        name: "стоимость после округления",
        sortDisabled: true,
    },
    {
        name: "Дата",
        sortDisabled: true,
    },
]


export const setCols = (onOpenDatePopup) => ([
    {
        key: "fullName",
        render: (item) => formatFullName(item.fullName)
    },
    {
        key: "plateNumber"
    },
    {
        key: "timeInPark"
    },
    {
        key: "amount"
    },
    {
        key: "timeInParkCeil"
    },
    {
        key: "amountCeil"
    },
    {
        key: "date",
        renderActions: (item) => (
                <TableBtn onClick={() => onOpenDatePopup(item._id)}>Дата</TableBtn>
        )
    },
])