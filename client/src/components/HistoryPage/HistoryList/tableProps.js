import React from "react";
import {setSelectValues} from "../../../utils/functions/setSelectValues";
import {historyActionTypes, historyStatusTypes, userRoles} from "../../../constants";
import {formatFullName} from "../../../utils/functions/formatFullName";


const historyStatuses = [
    {
        class: "redText",
        text: historyStatusTypes.notExist,
        value: false
    },
    {
        class: "greenText",
        text: historyStatusTypes.exist,
        value: true
    }
]


const adminAndModeratorProps = {
    flexCols: [1.5, 3, 2, 1.5, 1.5, 1.5, 1],
    titles: [
        {
            name: "Статус",
            filterBy: 'select',
            selectValues: historyStatuses.map(({text, value}) => ({item: text, value}))
        },
        {
            name: "Арендатор",
            filterBy: 'input',
        },
        {
            name: "Сотрудник",
            filterBy: 'input',
        },
        {
            name: "Номер Машини",
            filterBy: 'input',
        },
        {
            name: "Модель Авто.",
            filterBy: 'input',
        },
        {
            name: "Дата",
            filterBy: 'input',
            type: "date",
        },
        {
            name: "#",
            filterBy: 'select',
            selectValues: setSelectValues(historyActionTypes)
        },
    ],
    cols: [
        {
            key: "car--_id",
            render: (item) => {
                const curStatus = historyStatuses[+!!(item.car?.plateNumber)]
                return (
                    <span className={curStatus.class}>{curStatus.text}</span>
                )
            }
        },
        {
            key: "car--owner--organization--name"
        },
        {
            key: "car--owner--fullName",
            render: (item) => formatFullName(item?.car?.owner?.fullName)
        },
        {
            key: "plateNumber"
        },
        {
            key: "car--model"
        },
        {
            key: "date"
        },
        {
            key: "type",
            render: (item) => {
                const className = item.type === historyActionTypes.exit ? 'blueText' : 'greenText'
                return (
                    <span className={className}>{item.type}</span>
                )
            }
        },

    ]

}
const {tenant, admin, security, moderator} = userRoles
export const tableProps = {
    [admin]: adminAndModeratorProps,
    [moderator]: adminAndModeratorProps,
    [tenant]: {
        flexCols: [5, 3, 2, 2],
        titles: [
            {
                name: "Сотрудник",
                filterBy: 'input',
            },
            {
                name: "Номер машины",
                filterBy: 'input',
            },
            {
                name: "Дата",
                filterBy: 'input',
                type: 'date'
            },
            {
                name: "#",
                filterBy: 'select',
                selectValues: setSelectValues(historyActionTypes)
            },
        ],
        cols: [
            {
                key: "car--owner--fullName"
            },
            {
                key: "car--plateNumber"
            },
            {
                key: "date"
            },
            {
                key: "type",
                render: (item) => {
                    const className = item.type === historyActionTypes.exit ? 'blueText' : 'greenText'
                    return (
                        <span className={className}>{item.type}</span>
                    )
                }
            },

        ]

    }
}