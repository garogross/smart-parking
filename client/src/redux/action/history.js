import {
    DOWNLOAD_HISTORY_ERROR, DOWNLOAD_HISTORY_LOADING_START,
    DOWNLOAD_HISTORY_SUCCESS,
    GET_HISTORY_ERROR, GET_HISTORY_LOADING_START, GET_HISTORY_SUCCESS,
    SET_HISTORY_PAGE,
} from "../types";
import {
    downloadHistoryUrl,
    fetchRequest,
    getEmployeesUrl, getHistoryUrl,
} from "./fetchTools";
import {getUrlWithFiltersQuery} from "./getUrlWithFiltersQuery";

export const getHistory = (filters,id,sortBy) => async (dispatch,getState) => {
    dispatch({type: GET_HISTORY_LOADING_START})
    try {
        const page = getState().history.page
        const idParam = id || ""
        const url = dispatch(getUrlWithFiltersQuery(getHistoryUrl+idParam,page,filters,sortBy))
        const {data, totalCount} = await fetchRequest(url)

        dispatch({
            type: GET_HISTORY_SUCCESS, payload: {
                data,
                totalCount
            }
        })

    } catch (payload) {
        dispatch({type: GET_HISTORY_ERROR, payload})
    }
}


export const setHistoryPage = (payload = 1) =>  (dispatch) => {
    dispatch({type: SET_HISTORY_PAGE,payload})
}