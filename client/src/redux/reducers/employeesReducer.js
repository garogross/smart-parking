import {
    ADD_EMPLOYEE_ERROR, ADD_EMPLOYEE_LOADING_START, ADD_EMPLOYEE_SUCCESS,
    ADD_TENANT_ERROR,
    ADD_TENANT_LOADING_START,
    ADD_TENANT_SUCCESS, DELETE_EMPLOYEE_ERROR, DELETE_EMPLOYEE_LOADING_START, DELETE_EMPLOYEE_SUCCESS,
    DELETE_TENANT_ERROR,
    DELETE_TENANT_LOADING_START,
    DELETE_TENANT_SUCCESS,
    EDIT_EMPLOYEE_ERROR, EDIT_EMPLOYEE_LOADING_START, EDIT_EMPLOYEE_SUCCESS,
    EDIT_TENANT_ERROR,
    EDIT_TENANT_LOADING_START,
    EDIT_TENANT_SUCCESS,
    EDIT_USER_ERROR,
    EDIT_USER_LOADING_START,
    EDIT_USER_SUCCESS, GET_EMPLOYEES_ERROR, GET_EMPLOYEES_LOADING_START, GET_EMPLOYEES_SUCCESS,
    GET_TENANT_NAME_LIST_ERROR,
    GET_TENANT_NAME_LIST_LOADING_START,
    GET_TENANT_NAME_LIST_SUCCESS,
    GET_TENANTS_ERROR,
    GET_TENANTS_LOADING_START,
    GET_TENANTS_SUCCESS,
    SET_EMPLOYEES_PAGE,
    SET_TENANTS_PAGE,
} from "../types";


const initialState = {
    data: [],
    getLoading: false,
    getError: null,
    addLoading: false,
    addError: null,
    deleteLoading: false,
    deleteError: null,
    totalCount: 0,
    page: 1,
}

export const employeesReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case GET_EMPLOYEES_SUCCESS: {
            return {
                ...state,
                data: payload.data,
                getLoading: false,
                totalCount: payload.totalCount || state.totalCount,
            }
        }
        case GET_EMPLOYEES_LOADING_START: {
            return {
                ...state,
                getLoading: true,
                getError: null,
            }
        }
        case GET_EMPLOYEES_ERROR: {
            return {
                ...state,
                getError: payload,
                getLoading: false
            }
        }
        case ADD_EMPLOYEE_SUCCESS: {
            return {
                ...state,
                data: payload.data,
                addLoading: false,
                totalCount: payload.totalCount
            }
        }
        case ADD_EMPLOYEE_LOADING_START: {
            return {
                ...state,
                addLoading: true,
                addError: null,
            }
        }
        case ADD_EMPLOYEE_ERROR: {
            return {
                ...state,
                addError: payload,
                addLoading: false
            }
        }
        case DELETE_EMPLOYEE_SUCCESS: {
            return {
                ...state,
                data: payload.data,
                totalCount: payload.totalCount,
                deleteLoading: false
            }
        }
        case DELETE_EMPLOYEE_LOADING_START: {
            return {
                ...state,
                deleteLoading: true,
                deleteError: null,
            }
        }
        case DELETE_EMPLOYEE_ERROR: {
            return {
                ...state,
                deleteError: payload,
                deleteLoading: false
            }
        }
        case EDIT_EMPLOYEE_SUCCESS: {
            return {
                ...state,
                data: payload.data,
                editLoading: false,
                totalCount: payload.totalCount
            }
        }
        case EDIT_EMPLOYEE_LOADING_START: {
            return {
                ...state,
                editLoading: true,
                editError: null,
            }
        }
        case EDIT_EMPLOYEE_ERROR: {
            return {
                ...state,
                editError: payload,
                editLoading: false
            }
        }


        case SET_EMPLOYEES_PAGE: {
            return {
                ...state,
                page: payload
            }
        }
        default:
            return state
    }
}