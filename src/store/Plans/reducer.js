// planReducer.js
import {
    FETCH_PLANS_REQUEST,
    FETCH_PLANS_SUCCESS,
    FETCH_PLANS_FAILURE,
    ADD_PLAN_REQUEST,
    ADD_PLAN_SUCCESS,
    ADD_PLAN_FAILURE,
    UPDATE_PLAN_REQUEST,
    UPDATE_PLAN_SUCCESS,
    UPDATE_PLAN_FAILURE,
    DELETE_PLAN_REQUEST,
    DELETE_PLAN_SUCCESS,
    DELETE_PLAN_FAILURE,
  } from './actionTypes';
  
  const initialState = {
    plans: [],
    loading: false,
    error: null,
  };
  
  const planReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PLANS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_PLANS_SUCCESS:
        return {
          ...state,
          loading: false,
          plans: action.payload,
        };
      case FETCH_PLANS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case ADD_PLAN_REQUEST:
      case UPDATE_PLAN_REQUEST:
      case DELETE_PLAN_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case ADD_PLAN_SUCCESS:
        return {
          ...state,
          loading: false,
          plans: {
            ...state.plans,
            data: [ action.payload?.data,...state.plans.data],
          },
        };
  
      case ADD_PLAN_FAILURE:
      case UPDATE_PLAN_FAILURE:
      case DELETE_PLAN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case UPDATE_PLAN_SUCCESS:
        return {
          ...state,
          loading: false,
          plans: {
            ...state.plans,
            data: state.plans.data?.map((item) =>
              item?._id === action.payload?.data?._id
                ? action.payload.data
                : item
            ),
          },
        };
  
      case DELETE_PLAN_SUCCESS:
        return {
          ...state,
          loading: false,
          plans: {
            ...state.plans,
            data: state.plans.data?.filter(
              (item) => item?._id !== action.payload?.data?._id
            ),
          },
        };
  
      default:
        return state;
    }
  };
  
  export default planReducer;
  