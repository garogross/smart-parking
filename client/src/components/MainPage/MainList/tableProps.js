import TableBtn from "../../global/Table/TableBtn/TableBtn";
import React from "react";
import {historyStatusTypes, userRoles} from "../../../constants";
import {formatFullName} from "../../../utils/functions/formatFullName";

const tenantAndModeratorParams = {
    flexCols: [5, 4, 3],
    titles: [
        {
            name: "Сотрудник",
        },
        {
            name: "Автомобиль",
        },
        {
            name: "Время въезда",
            type: 'date'
        },
    ],
    cols: [
        {
            key: "car--owner--fullName",
            render: (item) => formatFullName(item.car.owner.fullName)
        },
        {
            key: "plateNumber"
        },
        {
            key: "entryDate",
        },
    ]
}

const {tenant, admin, security, moderator} = userRoles

export const tableParams = {
    [admin]: {
        flexCols: [5, 4, 3],
        titles: [
            {
                name: "Арендатор",
            },
            {
                name: "Разрешенное количество машиномест",
            },
            {
                name: "Фактическое на объекте",
            },
        ],
        setCols: (resetTenant) => ([
            {
                key: "name"
            },
            {
                key: "allowedCarCount"
            },
            {
                key: "inSiteCarCount",
                renderActions: (item) => (
                    <TableBtn
                        onClick={() => resetTenant(item._id)}
                        disabled={!item.inSiteCarCount}
                    >Обнулить</TableBtn>
                )
            },
        ])
    },
    [security]: {
        flexCols: [4, 1.5, 3, 1.5, 2],
        titles: [
            {
                name: "Арендатор",
            },
            {
                name: "Статус",
                sortDisabled: true
            },
            {
                name: "Фио водителя",
            },
            {
                name: "Номер",
            },
            {
                name: "Время Въезда",
                type: 'date'
            },
        ],
        cols: [
            {
                key: "car--owner--organization--name"
            },
            {
                key: "status",
                render: (item) => <span className={!item.car ? 'redText' : 'greenText'}>
                    {Object.values(historyStatusTypes)[+!(item.car)]}
                </span>
            },
            {
                key: "car--owner--fullName",
                render: (item) => formatFullName(item.car.owner.fullName)
            },
            {
                key: "plateNumber",
            },
            {
                key: "entryDate",
            },
        ]
    },
    [tenant]: tenantAndModeratorParams,
    [moderator]: tenantAndModeratorParams,
}