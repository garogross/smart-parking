import {
    GET_HISTORY_ERROR,
    GET_HISTORY_LOADING_START,
    GET_HISTORY_SUCCESS,
    SET_HISTORY_PAGE,
} from "../types";


const initialState = {
    data: [],
    getLoading: false,
    getError: null,
    downloadLoading: false,
    downloadError: null,
    totalCount: 0,
    page: 1,
}

export const historyReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case GET_HISTORY_SUCCESS: {
            return {
                ...state,
                data: payload.data,
                getLoading: false,
                totalCount: payload.totalCount || state.totalCount,
            }
        }
        case GET_HISTORY_LOADING_START: {
            return {
                ...state,
                getLoading: true,
                getError: null,
            }
        }
        case GET_HISTORY_ERROR: {
            return {
                ...state,
                getError: payload,
                getLoading: false
            }
        }


        case SET_HISTORY_PAGE: {
            return {
                ...state,
                page: payload
            }
        }
        default:
            return state
    }
}