import {
    GET_PARKING_ERROR,
    GET_PARKING_LOADING_START,
    GET_PARKING_SUCCESS,
    SET_PARKING_PAGE,
} from "../types";


const initialState = {
    data: [],
    getLoading: false,
    getError: null,
    totalCount: 0,
    page: 1,
}

export const parkingReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
        case GET_PARKING_SUCCESS: {
            return {
                ...state,
                data: payload.data,
                getLoading: false,
                totalCount: payload.totalCount || state.totalCount,
            }
        }
        case GET_PARKING_LOADING_START: {
            return {
                ...state,
                getLoading: true,
                getError: null,
            }
        }
        case GET_PARKING_ERROR: {
            return {
                ...state,
                getError: payload,
                getLoading: false
            }
        }

        case SET_PARKING_PAGE: {
            return {
                ...state,
                page: payload
            }
        }
        default:
            return state
    }
}