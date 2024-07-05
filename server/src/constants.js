import {fileURLToPath} from 'url'
import {dirname} from "path"

const __filename = fileURLToPath(import.meta.url);
export const DIRNAME = dirname(__filename);


export const userRoles = {
    tenant: "Арендатор",
    admin: "Admin",
    security: "Охраник",
    moderator: "Модератор",
}

export const tariffTypes = {
    manual: "Ограничение вручную",
    admin: "Админский Тарифф",
    guest: "Гостевой тарифф",
}

export const historyActionTypes = {
    entry: "Въезд",
    exit: "Выезд",
}

export const nodeEnvTypes = {
    production: "production",
    development: "development"
}

export const signupRestrictToParams = () => {
    return process.env.NODE_ENV !== nodeEnvTypes.production ? Object.values(userRoles) : [userRoles.admin]
}

export const historyStatusTypes = {
    exist: 'В базе',
    notExist: 'Отсуствует в базе',
}

export const downloadFileFormats = [
    'html',
    'csv',
    'txt',
    'json',
    'xls',
]

export const monthsShort = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec"
];