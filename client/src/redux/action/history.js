import {
  GET_EMPLOYEE_HISTORY_ERROR,
  GET_EMPLOYEE_HISTORY_LOADING_START,
  GET_EMPLOYEE_HISTORY_SUCCESS,
  GET_HISTORY_ERROR,
  GET_HISTORY_LOADING_START,
  GET_HISTORY_SUCCESS,
  SET_HISTORY_FILTERING,
  SET_HISTORY_PAGE,
  UNSET_HISTORY_FILTERING,
} from "../types";
import { fetchRequest, getHistoryReportUrl, getHistoryUrl } from "./fetchTools";
import { getUrlWithFiltersQuery } from "./getUrlWithFiltersQuery";

export const setHistory = (data,totalCount) => (dispatch) => {
dispatch({
  type: GET_HISTORY_SUCCESS,
  payload: {
    data,
    totalCount,
  },
});
}

export const getHistory =
  (filters, id, sortBy) => async (dispatch, getState) => {
    dispatch({ type: GET_HISTORY_LOADING_START });
    try {
      if (Object.values(filters).some((item) => !!item)) {
        dispatch({ type: SET_HISTORY_FILTERING });
      } else {
        if (getState().history.isFiltering) {
          dispatch({ type: UNSET_HISTORY_FILTERING });
        }
      }

      const page = getState().history.page;
      const idParam = id || "";
      const url = dispatch(
        getUrlWithFiltersQuery(getHistoryUrl + idParam, page, filters, sortBy)
      );
      const { data, totalCount } = await fetchRequest(url);

      dispatch(setHistory(data, totalCount));
    } catch (payload) {
      dispatch({ type: GET_HISTORY_ERROR, payload });
    }
  };

export const getEmployeeHistory = (id, dateData) => async (dispatch) => {
  dispatch({ type: GET_EMPLOYEE_HISTORY_LOADING_START });
  try {
    const isDateSetted = dateData && dateData.dateFrom && dateData.dateTo;
    const dateQuery = isDateSetted
      ? `&dateFrom=${dateData.dateFrom}&dateTo=${dateData.dateTo}`
      : "";
    const { data } = await fetchRequest(
      `${getHistoryReportUrl}${id}?page=0${dateQuery}`
    );
    dispatch({ type: GET_EMPLOYEE_HISTORY_SUCCESS, payload: data });
  } catch (payload) {
    dispatch({ type: GET_EMPLOYEE_HISTORY_ERROR, payload });
  }
};

export const clearEmployeeHistory = () => (dispatch) => {
  dispatch({ type: GET_EMPLOYEE_HISTORY_SUCCESS, payload: [] });
};

export const setHistoryPage =
  (payload = 1) =>
  (dispatch) => {
    dispatch({ type: SET_HISTORY_PAGE, payload });
  };
