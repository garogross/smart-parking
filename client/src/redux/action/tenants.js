import {
    ADD_TENANT_ERROR,
    ADD_TENANT_LOADING_START,
    ADD_TENANT_SUCCESS,
    ADD_USERS_ERROR,
    ADD_USERS_LOADING_START,
    ADD_USERS_SUCCESS,
    DELETE_TENANT_ERROR,
    DELETE_TENANT_LOADING_START,
    DELETE_TENANT_SUCCESS,
    DELETE_USER_ERROR,
    DELETE_USER_LOADING_START,
    DELETE_USER_SUCCESS, EDIT_TENANT_ERROR,
    EDIT_TENANT_LOADING_START,
    EDIT_TENANT_SUCCESS,
    EDIT_USER_ERROR,
    EDIT_USER_LOADING_START,
    EDIT_USER_SUCCESS,
    GET_TENANT_NAME_LIST_ERROR,
    GET_TENANT_NAME_LIST_LOADING_START,
    GET_TENANT_NAME_LIST_SUCCESS,
    GET_TENANTS_ERROR,
    GET_TENANTS_LOADING_START,
    GET_TENANTS_SUCCESS,
    GET_USERS_ERROR,
    GET_USERS_LOADING_START,
    GET_USERS_SUCCESS, RESET_TENANT_ERROR, RESET_TENANT_LOADING_START, RESET_TENANT_SUCCESS,
    SET_TENANTS_PAGE,
    SET_USERS_PAGE,
} from "../types";
import {
    addTenantsUrl,
    fetchRequest, getParkingUrl,
    getTenantsNameListUrl,
    getTenantsUrl,
    getUsersUrl,
    setFormError,
    signupUserUrl
} from "./fetchTools";
import {userRoles} from "../../constants";
import {getUrlWithFiltersQuery} from "./getUrlWithFiltersQuery";
import {formatData} from "./users";


export const getTenantsNameList = () => async (dispatch) => {
    dispatch({type: GET_TENANT_NAME_LIST_LOADING_START})
    try {
        const {data} = await fetchRequest(getTenantsNameListUrl)

        dispatch({
            type: GET_TENANT_NAME_LIST_SUCCESS, payload: data
        })

    } catch (payload) {
        dispatch({type: GET_TENANT_NAME_LIST_ERROR, payload})
    }
}

export const getTenants = (filters = {}) => async (dispatch,getState) => {
    dispatch({type: GET_TENANTS_LOADING_START})
    try {
        const page = getState().tenants.page
        const url = dispatch(getUrlWithFiltersQuery(getTenantsUrl,page,filters))
        const {data, totalCount} = await fetchRequest(url)


        dispatch({
            type: GET_TENANTS_SUCCESS, payload: {
                data: data,
                totalCount
            }
        })

    } catch (payload) {
        dispatch({type: GET_TENANTS_ERROR, payload})
    }
}

export const addTenant = (formData, clb) => async (dispatch) => {
    dispatch({type: ADD_TENANT_LOADING_START})
    try {
        const {data,totalCount} = await fetchRequest(addTenantsUrl, "POST", formData)

        dispatch({type: ADD_TENANT_SUCCESS, payload: {data,totalCount}})
        clb()
    } catch (payload) {
        dispatch(setFormError(ADD_TENANT_ERROR, payload))
    }
}

export const setAddTenantError = (payload) => dispatch => dispatch(setFormError(ADD_TENANT_ERROR, payload))

export const deleteTenant = (id,filters, clb) => async (dispatch,getState) => {
    dispatch({type: DELETE_TENANT_LOADING_START})
    try {
        const page = getState().tenants.page
        const tenants = getState().tenants.data

        let curPage = page
        if(page !== 1 && tenants.length === 1) {
            curPage = page - 1
            setTenantsPage(curPage)
        }
        const url = dispatch(getUrlWithFiltersQuery(getTenantsUrl + id,curPage,filters))
        const {data,totalCount} =  await fetchRequest(url, "DELETE")
        const payload = {data,totalCount}
        dispatch({type: DELETE_TENANT_SUCCESS, payload})
        clb()
    } catch (payload) {
        dispatch({type: DELETE_TENANT_ERROR, payload})
    }
}

export const editTenant = (id,formData, clb) => async (dispatch) => {
    dispatch({type: EDIT_TENANT_LOADING_START})
    try {
        const {data,totalCount} =  await fetchRequest(getTenantsUrl + id, "PATCH",formData)
        const payload = {data,totalCount}
        dispatch({type: EDIT_TENANT_SUCCESS, payload})
        clb()
    } catch (payload) {
        dispatch(setEditTenantError(payload))
    }
}


export const setEditTenantError = (payload) => dispatch => dispatch(setFormError(EDIT_TENANT_ERROR, payload))


export const resetTenant = (id) => async (dispatch,getState) => {
    dispatch({type: RESET_TENANT_LOADING_START})
    try {
        await fetchRequest(getParkingUrl + id, "DELETE")
        const data = getState().tenants.data
        const payload = [...data]
        const updatingItemIndex = data.findIndex(item => item._id === id)
        payload[updatingItemIndex] = {
            ...payload[updatingItemIndex],
            inSiteCarCount: 0
        }
        dispatch({type: RESET_TENANT_SUCCESS, payload})
    } catch (payload) {
        dispatch({type: RESET_TENANT_ERROR})
    }
}

export const getOneTenant = (id) => async (dispatch,getState) => {
    dispatch({type: GET_TENANTS_LOADING_START})
    try {
        const {data: resData} =  await fetchRequest(getTenantsUrl + id)
        const data = getState().tenants.data
        const payload = [...data,resData]
        dispatch({type: GET_TENANTS_SUCCESS, payload: {data: payload}})
    } catch (payload) {
        dispatch({type: GET_TENANTS_ERROR, payload})
    }
}

export const setTenantsPage = (payload = 1) =>  (dispatch) => {
    dispatch({type: SET_TENANTS_PAGE,payload})
}