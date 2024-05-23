export const isProduction = process.env.NODE_ENV === "production"


export const userRoles = {
    tenant: "Арендатор",
    admin: "Admin",
    security: "Охраник",
    moderator: "Модератор",
}

export const pageLimit = 10

export const headerActionTypes = {
    showAll: "showAll",
    add: "add",
    refresh: "refresh",
    download: "download",
}


export const historyStatusTypes = {
    exist: 'В базе',
    notExist: 'Отсуствует в базе',
}

export const historyActionTypes = {
    entry: 'Въезд',
    exit: 'Выезд',
}

export const tariffTypes = {
    unLimit: "Безлимитный",
    perMonth: "Тариф с оплатой за месяц ",
    perHour: "Почасовой Тариф",
    Guest: "Гостевой тариф",
}

export const fullNameChain = '**'

export const downloadFileFormats = [
    {
        key: 'html',
        name: "HTML",
    },
    {
        key: 'csv',
        name: "CSV",
    },
    {
        key: 'txt',
        name: "TXT",
    },
    {
        key: 'json',
        name: "JSON",
    },
    {
        key: 'xls',
        name: "Excel",
    },
]

export const monthsInRussian = [
    {
        name: "Январь",
        key: "jan"
    },
    {
        name: "Февраль",
        key: "feb"
    },
    {
        name: "Март",
        key: "mar"
    },
    {
        name: "Апрель",
        key: "apr"
    },
    {
        name: "Май",
        key: "may"
    },
    {
        name: "Июнь",
        key: "jun"
    },
    {
        name: "Июль",
        key: "jul"
    },
    {
        name: "Август",
        key: "aug"
    },
    {
        name: "Сентябрь",
        key: "sep"
    },
    {
        name: "Октябрь",
        key: "oct"
    },
    {
        name: "Ноябрь",
        key: "nov"
    },
    {
        name: "Декабрь",
        key: "dec"
    }
];

const costOfMonths = monthsInRussian.map((item) => (
    {
        label: item.name,
        key: `costOfMonth.${item.key}`,
        type: "number",
        value: "0",
        filter: ({tariff}) => tariff === tariffTypes.perMonth || tariff === tariffTypes.unLimit
    }
))

export const costOfMonthSections = [
    costOfMonths.slice(0,costOfMonths.length/2),
    costOfMonths.slice(costOfMonths.length/2),
]
