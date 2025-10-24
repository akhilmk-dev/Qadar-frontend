import {
    FETCH_RITUALS_REQUEST,
    FETCH_RITUALS_SUCCESS,
    FETCH_RITUALS_FAILURE,
    ADD_RITUAL_REQUEST,
    ADD_RITUAL_SUCCESS,
    ADD_RITUAL_FAILURE,
    UPDATE_RITUAL_REQUEST,
    UPDATE_RITUAL_SUCCESS,
    UPDATE_RITUAL_FAILURE,
    DELETE_RITUAL_REQUEST,
    DELETE_RITUAL_SUCCESS,
    DELETE_RITUAL_FAILURE,
  } from "./actionTypes";
  
  const initialState = {
    rituals: [],
    loading: false,
    error: null,
  };
  
  const ritualReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_RITUALS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_RITUALS_SUCCESS:
        return {
          ...state,
          loading: false,
          rituals: action.payload,
        };
      case FETCH_RITUALS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case ADD_RITUAL_REQUEST:
      case UPDATE_RITUAL_REQUEST:
      case DELETE_RITUAL_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ADD_RITUAL_SUCCESS:
        return {
          ...state,
          loading: false,
          rituals: {
            ...state.rituals,
            data: [action.payload?.data, ...state.rituals.data],
          },
        };
      case ADD_RITUAL_FAILURE:
      case UPDATE_RITUAL_FAILURE:
      case DELETE_RITUAL_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_RITUAL_SUCCESS:
        return {
          ...state,
          loading: false,
          rituals: {
            ...state.rituals,
            data: state.rituals.data?.map((item) =>
              item?._id === action.payload?.data?._id ? action.payload.data : item
            ),
          },
        };
      case DELETE_RITUAL_SUCCESS:
        return {
          ...state,
          loading: false,
          rituals: {
            ...state.rituals,
            data: state.rituals.data?.filter(
              (item) => item?._id !== action.payload?.data?._id
            ),
          },
        };
      default:
        return state;
    }
  };
  
  export default ritualReducer;
  