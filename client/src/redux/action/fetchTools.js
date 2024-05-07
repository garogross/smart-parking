import {getLSItem} from "../../utils/functions/localStorage";
import {lsProps} from "../../utils/lsProps";
import {isProduction} from "../../constants";

export const baseUrl = '/api/v1';
export const proxy = isProduction ? "https://infolog.uz" : "http://localhost:5000"

export const baseConfig = {
    headers: {
        'Content-Type': 'application/json',
    }
}

export const authConfig = (isFormData) => {
    const token = getLSItem(lsProps.token, true);
    const headers = {
        'Authorization': token ? `Bearer ${token}` : null,
    }

    if(!isFormData) {
        headers['Content-Type'] = 'application/json'
    }
    return {headers}
}


// auth
export const siginUrl = '/users/login'
export const updateProfileUrl = '/users/profile'

// users
export const getUsersUrl = '/users/'
export const signupUserUrl = '/users/signup'

// tenants
export const getTenantsNameListUrl = '/tenants/nameList'
export const getTenantsUrl = '/tenants/'
export const addTenantsUrl = '/tenants/create'

// employees
export const getEmployeesUrl = '/employees/'
export const getOneEmployeeUrl = '/employees/getOne/'
export const addEmployeesUrl = '/employees/create'

// parking
export const getParkingUrl = '/parking/'

// history
export const getHistoryUrl = '/history/'
export const downloadHistoryUrl = '/history/download/'



export const fetchRequest = async (fetchUrl, method = 'GET', body = null, config = authConfig()) => {

    const filteredBody = {}

    if(body) {
        for (let key in body) {
            if(body[key]) {
                filteredBody[key] =  body[key]
            }
        }
    }

    const response = await fetch(`${baseUrl}${fetchUrl}`, {
        method: method,
        body: body && JSON.stringify(filteredBody),
        ...config
    });
    const resData = await response.json();

    if (!response.ok) {
        // eslint-disable-next-line no-throw-literal
        throw {message: resData, status: response.status};
    }
    return resData
}

export const setError = (text) => {
    throw {
        message: {
            message: text
        }
    }
}

export const setFormError = (type,error) => dispatch => {
    let payload =  error
    if(error?.message?.message?.startsWith('E11000')) {
        payload = error?.message?.error?.keyValue
    }else if(error?.message?.error?.code === 11000) {
        payload = error?.message?.error.keyValue
    } else if(error?.message?.error?.errors) {
        payload = error?.message?.error?.errors
    }
    dispatch({type,payload})
}