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
    GET_EMPLOYEES_SUCCESS, GET_PARKING_ERROR, GET_PARKING_LOADING_START, GET_PARKING_SUCCESS,
    SET_EMPLOYEES_PAGE, SET_PARKING_PAGE,
} from "../types";
import {
    addEmployeesUrl,
    addTenantsUrl,
    fetchRequest,
    getEmployeesUrl, getOneEmployeeUrl, getParkingUrl,
    setFormError,
} from "./fetchTools";
import {getUrlWithFiltersQuery} from "./getUrlWithFiltersQuery";

export const getParking = (id) => async (dispatch,getState) => {
    dispatch({type: GET_PARKING_LOADING_START})
    try {
        const page = getState().parking.page
        const idParam = id || ""
        const url = dispatch(getUrlWithFiltersQuery(getParkingUrl+idParam,page))
        const {data, totalCount} = await fetchRequest(url)

        dispatch({
            type: GET_PARKING_SUCCESS, payload: {
                data,
                totalCount
            }
        })

    } catch (payload) {
        dispatch({type: GET_PARKING_ERROR, payload})
    }
}

export const setParkingPage = (payload = 1) =>  (dispatch) => {
    dispatch({type: SET_PARKING_PAGE,payload})
}