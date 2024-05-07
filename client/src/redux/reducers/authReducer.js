import {
    LOGIN_ERROR,
    LOGIN_LOADING_START,
    LOGIN_SUCCESS, LOGOUT_USER, UPDATE_PROFILE_ERROR, UPDATE_PROFILE_LOADING_START, UPDATE_PROFILE_SUCCESS,
} from "../types";


const initialState = {
    token: null,
    user: null,
    loginLoading: false,
    loginError: null,
    updateProfileLoading: false,
    updateProfileError: null,
}

export const authReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case LOGIN_SUCCESS: {
            return {
                ...state,
                user: payload.user,
                token: payload.token,
                loginLoading: false
            }
        }
        case LOGIN_LOADING_START: {
            return {
                ...state,
                loginLoading: true,
                loginError: null,
            }
        }
        case LOGIN_ERROR: {
            return {
                ...state,
                loginError: payload,
                loginLoading: false
            }
        }
        case LOGOUT_USER: {
            return {
                ...state,
                token: null,
                user: null,
            };
        }
        case UPDATE_PROFILE_SUCCESS: {
            return {
                ...state,
                user: payload,
                updateProfileLoading: false
            }
        }
        case UPDATE_PROFILE_LOADING_START: {
            return {
                ...state,
                updateProfileLoading: true,
                updateProfileError: null,
            }
        }
        case UPDATE_PROFILE_ERROR: {
            return {
                ...state,
                updateProfileError: payload,
                updateProfileLoading: false
            }
        }
        default:
            return state
    }
}