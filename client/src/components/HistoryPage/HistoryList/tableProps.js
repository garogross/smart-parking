import React from "react";
import {
  historyActionTypes,
  historyStatusTypes,
  userRoles
} from "../../../constants";
import { formatFullName } from '../../../utils/functions/formatFullName';
import { setSelectValues } from "../../../utils/functions/setSelectValues";

const historyStatuses = [
  {
    class: "redText",
    text: historyStatusTypes.notExist,
    value: false,
  },
  {
    class: "greenText",
    text: historyStatusTypes.exist,
    value: true,
  },
];

const adminAndModeratorProps = {
  flexCols: [1.5, 2.5, 2, 1.5, 1.5, 1.5, 1.5],
  titles: [
    {
      name: "Статус",
      filterBy: "select",
      selectValues: historyStatuses.map(({ text, value }) => ({
        item: text,
        value,
      })),
    },
    {
      name: "Арендатор",
      filterBy: "input",
    },
    {
      name: "Сотрудник",
      filterBy: "input",
    },
    {
      name: "Номер Авто",
      filterBy: "input",
    },
    {
      name: "Модель Авто",
      filterBy: "input",
    },
    {
      name: "Дата",
      filterBy: "input",
      type: "date",
    },
    {
      name: "Действие",
      filterBy: "select",
      selectValues: setSelectValues(historyActionTypes),
    },
  ],
  cols: [
    {
      key: "car",
      render: (item) => {
        const curStatus = historyStatuses[+!!item.car];
        return <span className={curStatus.class}>{curStatus.text}</span>;
      },
    },
    {
      key: "organizationName",
    },
    {
      key: "employeeFullName",
      render: (item) => formatFullName(item?.employeeFullName),
    },
    {
      key: "plateNumber",
    },
    {
      key: "carModel",
    },
    {
      key: "date",
    },
    {
      key: "type",
      render: (item) => {
        const className =
          item.type === historyActionTypes.exit ? "redText" : "greenText";
        return <span className={className}>{item.type}</span>;
      },
    },
  ],
};
const { tenant, admin, security, moderator } = userRoles;
export const tableProps = {
  [admin]: adminAndModeratorProps,
  [moderator]: adminAndModeratorProps,
  [security]: adminAndModeratorProps,
  [tenant]: {
    flexCols: [5, 3, 2, 2],
    titles: [
      {
        name: "Сотрудник",
        filterBy: "input",
      },
      {
        name: "Номер машины",
        filterBy: "input",
      },
      {
        name: "Дата",
        filterBy: "input",
        type: "date",
      },
      {
        name: "#",
        filterBy: "select",
        selectValues: setSelectValues(historyActionTypes),
      },
    ],
    cols: [
      {
        key: "employeeFullName",
        render: (item) => formatFullName(item?.employeeFullName),

      },
      {
        key: "plateNumber",
      },
      {
        key: "date",
      },
      {
        key: "type",
        render: (item) => {
          const className =
            item.type === historyActionTypes.exit ? "blueText" : "greenText";
          return <span className={className}>{item.type}</span>;
        },
      },
    ],
  },
};
