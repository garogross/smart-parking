import {
    EDIT_USER_ERROR,
    EDIT_USER_LOADING_START, EDIT_USER_SUCCESS,
    LOGIN_ERROR,
    LOGIN_LOADING_START,
    LOGIN_SUCCESS,
    LOGOUT_USER,
    RESET_USER_STATE, UPDATE_PASSWORD_ERROR,
    UPDATE_PASSWORD_LOADING_START,
    UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_LOADING_START, UPDATE_PROFILE_SUCCESS,
} from "../types";
import {
    baseConfig,
    fetchRequest, getUsersUrl, setFormError,
    siginUrl, updateProfileUrl,
} from "./fetchTools";
import {getLSItem, removeLSItem, setLSItem} from "../../utils/functions/localStorage";
import {lsProps} from "../../utils/lsProps";
import {userRoles} from "../../constants";
import {setEditUserError} from "./users";

export const login = (formData, clb) => async (dispatch) => {
    dispatch({type: LOGIN_LOADING_START})
    try {
        const {token, user} = await fetchRequest(siginUrl, "POST", formData, baseConfig)

        setLSItem(lsProps.token, token)
        setLSItem(lsProps.user, user)

        dispatch({type: LOGIN_SUCCESS, payload: {token, user}})
        clb(user.role === userRoles.admin)

    } catch (err) {
        console.error({err})
        dispatch({type: LOGIN_ERROR, payload: err})
    }
}

export const checkIsLoggedIn = () => (dispatch) => {
    const token = getLSItem(lsProps.token, true);
    const user = getLSItem(lsProps.user, true);

    if (token && user) {
        dispatch({type: LOGIN_SUCCESS, payload: {token, user}})
    }
}

export const logOut = (clb) => (dispatch) => {
    removeLSItem(lsProps.token)
    removeLSItem(lsProps.user)
    dispatch({type: LOGOUT_USER})
    dispatch({type: RESET_USER_STATE})

    if (clb) clb()
}

export const updateProfile = (formData) => async (dispatch) => {
    dispatch({type: UPDATE_PROFILE_LOADING_START})
    try {
        const {data} =  await fetchRequest(updateProfileUrl, "PATCH",formData)
        const payload = data
        dispatch({type: UPDATE_PROFILE_SUCCESS, payload})
    } catch (payload) {
        dispatch(setUpdateProfileError(payload))
    }
}

export const setUpdateProfileError = (payload) => dispatch => dispatch(setFormError(UPDATE_PROFILE_ERROR, payload))
