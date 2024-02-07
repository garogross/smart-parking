import {fileURLToPath} from 'url'
import {dirname} from "path"

const __filename = fileURLToPath(import.meta.url);
export const DIRNAME = dirname(__filename);

export const userRoles = {
    employee: "сотрудник",
    admin: "admin",
    superAdmin: "superAdmin",
}

export const nodeEnvTypes = {
    production: "production",
    development: "development"
}

export const signupRestrictToParams = () => {
    const {admin,superAdmin} = userRoles
    return process.env.NODE_ENV !== nodeEnvTypes.production ? Object.values(userRoles) : [admin,superAdmin]
}
