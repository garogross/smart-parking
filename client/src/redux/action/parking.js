import {
    GET_PARKING_ERROR, GET_PARKING_LOADING_START, GET_PARKING_SUCCESS,SET_PARKING_PAGE,
} from "../types";
import {
    fetchRequest,
    getParkingUrl,
    openBareerUrl,
} from "./fetchTools";
import {getUrlWithFiltersQuery} from "./getUrlWithFiltersQuery";

export const getParking = (id,sortBy) => async (dispatch,getState) => {
    dispatch({type: GET_PARKING_LOADING_START})
    try {
        const page = getState().parking.page
        const idParam = id || ""
        const url = dispatch(getUrlWithFiltersQuery(getParkingUrl+idParam,page,null,sortBy))
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

export const openBareer = async (type) => {
    await fetchRequest(openBareerUrl+type)
}

