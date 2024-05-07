export const isProduction = process.env.NODE_ENV === "production"


export const userRoles = {
    tenant: "Арендатор",
    admin: "Admin",
    security: "Охраник",
    moderator: "Модератор",
}

export const pageLimit = 5

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