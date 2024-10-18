import {
    GET_EMPLOYEE_HISTORY_ERROR,
    GET_EMPLOYEE_HISTORY_LOADING_START, GET_EMPLOYEE_HISTORY_SUCCESS,
    GET_HISTORY_ERROR,
    GET_HISTORY_LOADING_START,
    GET_HISTORY_SUCCESS,
    SET_HISTORY_FILTERING,
    SET_HISTORY_PAGE,
    UNSET_HISTORY_FILTERING,
} from "../types";


const initialState = {
  data: [],
  getLoading: false,
  getError: null,

  employeeHistory: null,
  getEmployeeHistoryLoading: false,
  getEmployeeHistoryError: null,

  downloadLoading: false,
  isFiltering: false,
  downloadError: null,

  totalCount: 0,
  page: 1,
};

export const historyReducer = (state = initialState, action) => {
    const {type, payload} = action

    switch (type) {
      case GET_HISTORY_SUCCESS: {
        return {
          ...state,
          data: payload.data,
          getLoading: false,
          totalCount: payload.totalCount ?? state.totalCount,
        };
      }
      case GET_HISTORY_LOADING_START: {
        return {
          ...state,
          getLoading: true,
          getError: null,
        };
      }
      case GET_HISTORY_ERROR: {
        return {
          ...state,
          getError: payload,
          getLoading: false,
        };
      }

      case GET_EMPLOYEE_HISTORY_SUCCESS: {
        return {
          ...state,
          employeeHistory: payload,
          getEmployeeHistoryLoading: false,
        };
      }
      case GET_EMPLOYEE_HISTORY_LOADING_START: {
        return {
          ...state,
          getEmployeeHistoryLoading: true,
          getEmployeeHistoryError: null,
        };
      }
      case GET_EMPLOYEE_HISTORY_ERROR: {
        return {
          ...state,
          getEmployeeHistoryError: payload,
          getEmployeeHistoryLoading: false,
        };
      }

      case SET_HISTORY_FILTERING: {
        return {
          ...state,
            isFiltering: true
        };
      }
      case UNSET_HISTORY_FILTERING: {
        return {
          ...state,
          isFiltering: false,
        };
      }

      case SET_HISTORY_PAGE: {
        return {
          ...state,
          page: payload,
        };
      }
      default:
        return state;
    }
}