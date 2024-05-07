import {
    ADD_USERS_ERROR,
    ADD_USERS_LOADING_START,
    ADD_USERS_SUCCESS,
    DELETE_USER_ERROR,
    DELETE_USER_LOADING_START,
    DELETE_USER_SUCCESS, EDIT_USER_ERROR,
    EDIT_USER_LOADING_START, EDIT_USER_SUCCESS,
    GET_USERS_ERROR,
    GET_USERS_LOADING_START,
    GET_USERS_SUCCESS,
    SET_USERS_PAGE
} from "../types";
import {fetchRequest, getUsersUrl, setFormError, signupUserUrl} from "./fetchTools";
import {getUrlWithFiltersQuery} from "./getUrlWithFiltersQuery";


export const formatData = (data,userid) =>  data.filter(item => item._id !== userid)

export const getUsers = (filters) => async (dispatch,getState) => {
    dispatch({type: GET_USERS_LOADING_START})
    try {
        const page = getState().users.page
        const url = dispatch(getUrlWithFiltersQuery(getUsersUrl,page,filters))
        const {data, totalCount} = await fetchRequest(url)


        dispatch({
            type: GET_USERS_SUCCESS, payload: {
                data: data,
                totalCount
            }
        })

    } catch (payload) {
        dispatch({type: GET_USERS_ERROR, payload})
    }
}

export const addUser = (formData, clb) => async (dispatch, getState) => {
    dispatch({type: ADD_USERS_LOADING_START})
    try {
        const {data,totalCount} = await fetchRequest(signupUserUrl, "POST", formData)
        const user = getState().auth.user

        dispatch({type: ADD_USERS_SUCCESS, payload: {data: formatData(data,user.id),totalCount}})
        clb()
    } catch (payload) {
        dispatch(setFormError(ADD_USERS_ERROR, payload))
    }
}

export const setAddUserError = (payload) => dispatch => dispatch(setFormError(ADD_USERS_ERROR, payload))

export const deleteUser = (id,filters, clb) => async (dispatch,getState) => {
    dispatch({type: DELETE_USER_LOADING_START})
    try {
        const page = getState().users.page
        const url = dispatch(getUrlWithFiltersQuery(getUsersUrl + id,page,filters))
        const {data,totalCount} =  await fetchRequest(url, "DELETE")
        const payload = {data,totalCount}
        dispatch({type: DELETE_USER_SUCCESS, payload})
        clb()
    } catch (payload) {
        dispatch({type: DELETE_USER_ERROR, payload})
    }
}

export const editUser = (id,formData, clb) => async (dispatch) => {
    dispatch({type: EDIT_USER_LOADING_START})
    try {
        const {data,totalCount} =  await fetchRequest(getUsersUrl + id, "PATCH",formData)
        const payload = {data,totalCount}
        dispatch({type: EDIT_USER_SUCCESS, payload})
        clb()
    } catch (payload) {
        dispatch(setEditUserError(payload))
    }
}

export const setEditUserError = (payload) => dispatch => dispatch(setFormError(EDIT_USER_ERROR, payload))


export const getOneUser = (id) => async (dispatch,getState) => {
    dispatch({type: GET_USERS_LOADING_START})
    try {
        const {data: resData} =  await fetchRequest(getUsersUrl + id)
        const data = getState().users.data
        const payload = [...data,resData]
        dispatch({type: GET_USERS_SUCCESS, payload: {data: payload}})
    } catch (payload) {
        dispatch({type: GET_USERS_ERROR, payload})
    }
}

export const setUsersPage = (payload = 1) =>  (dispatch) => {
    dispatch({type: SET_USERS_PAGE,payload})
}