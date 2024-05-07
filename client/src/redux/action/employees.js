import {
    ADD_EMPLOYEE_ERROR,
    ADD_EMPLOYEE_LOADING_START,
    ADD_EMPLOYEE_SUCCESS,
    DELETE_EMPLOYEE_ERROR,
    DELETE_EMPLOYEE_LOADING_START,
    DELETE_EMPLOYEE_SUCCESS,
 EDIT_EMPLOYEE_ERROR,
    EDIT_EMPLOYEE_LOADING_START,
    EDIT_EMPLOYEE_SUCCESS,
    GET_EMPLOYEES_ERROR,
    GET_EMPLOYEES_LOADING_START,
    GET_EMPLOYEES_SUCCESS,
    SET_EMPLOYEES_PAGE,
} from "../types";
import {
    addEmployeesUrl,
    addTenantsUrl,
    fetchRequest,
    getEmployeesUrl, getOneEmployeeUrl,
    setFormError,
} from "./fetchTools";
import {getUrlWithFiltersQuery} from "./getUrlWithFiltersQuery";

export const getEmployees = (id,filters) => async (dispatch,getState) => {
    dispatch({type: GET_EMPLOYEES_LOADING_START})
    try {
        const page = getState().employees.page
        const url = dispatch(getUrlWithFiltersQuery(getEmployeesUrl+id,page,filters))
        const {data, totalCount} = await fetchRequest(url)

        dispatch({
            type: GET_EMPLOYEES_SUCCESS, payload: {
                data,
                totalCount
            }
        })

    } catch (payload) {
        dispatch({type: GET_EMPLOYEES_ERROR, payload})
    }
}

export const addEmployee = (formData, clb) => async (dispatch) => {
    dispatch({type: ADD_EMPLOYEE_LOADING_START})
    try {
        const {data,totalCount} = await fetchRequest(addEmployeesUrl, "POST", formData)

        dispatch({type: ADD_EMPLOYEE_SUCCESS, payload: {data,totalCount}})
        clb()
    } catch (payload) {
        dispatch(setAddEmployeeError(payload))
    }
}

export const setAddEmployeeError = (payload) => dispatch => dispatch(setFormError(ADD_EMPLOYEE_ERROR, payload))

export const deleteEmployee = (id,filters, clb) => async (dispatch,getState) => {
    dispatch({type: DELETE_EMPLOYEE_LOADING_START})
    try {
        const page = getState().employees.page
        const tenants = getState().employees.data

        let curPage = page
        if(page !== 1 && tenants.length === 1) {
            curPage = page - 1
            setEmployeesPage(curPage)
        }
        const url = dispatch(getUrlWithFiltersQuery(getEmployeesUrl + id,curPage,filters))
        const {data,totalCount} =  await fetchRequest(url, "DELETE")
        const payload = {data,totalCount}
        dispatch({type: DELETE_EMPLOYEE_SUCCESS, payload})
        clb()
    } catch (payload) {
        dispatch({type: DELETE_EMPLOYEE_ERROR, payload})
    }
}

export const editEmployee = (id,formData, clb) => async (dispatch) => {
    dispatch({type: EDIT_EMPLOYEE_LOADING_START})
    try {
        const {data,totalCount} =  await fetchRequest(getEmployeesUrl + id, "PATCH",formData)
        const payload = {data,totalCount}
        dispatch({type: EDIT_EMPLOYEE_SUCCESS, payload})
        clb()
    } catch (payload) {
        dispatch(setEditEmployeeError(payload))
    }
}

export const setEditEmployeeError = (payload) => dispatch => dispatch(setFormError(EDIT_EMPLOYEE_ERROR, payload))


export const getOneEmployee = (id) => async (dispatch,getState) => {
    dispatch({type: GET_EMPLOYEES_LOADING_START})
    try {
        const {data: resData} =  await fetchRequest(getOneEmployeeUrl + id)
        const data = getState().employees.data
        const payload = [...data,resData]
        dispatch({type: GET_EMPLOYEES_SUCCESS, payload: {data: payload}})
    } catch (payload) {
        dispatch({type: GET_EMPLOYEES_ERROR, payload})
    }
}

export const setEmployeesPage = (payload = 1) =>  (dispatch) => {
    dispatch({type: SET_EMPLOYEES_PAGE,payload})
}