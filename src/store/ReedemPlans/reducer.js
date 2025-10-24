// redeemPlanReducer.js
import {
    FETCH_REDEEM_PLANS_REQUEST,
    FETCH_REDEEM_PLANS_SUCCESS,
    FETCH_REDEEM_PLANS_FAILURE,
    ADD_REDEEM_PLAN_REQUEST,
    ADD_REDEEM_PLAN_SUCCESS,
    ADD_REDEEM_PLAN_FAILURE,
    UPDATE_REDEEM_PLAN_REQUEST,
    UPDATE_REDEEM_PLAN_SUCCESS,
    UPDATE_REDEEM_PLAN_FAILURE,
    DELETE_REDEEM_PLAN_REQUEST,
    DELETE_REDEEM_PLAN_SUCCESS,
    DELETE_REDEEM_PLAN_FAILURE,
  } from "./actionTypes";
  
  const initialState = {
    redeemPlans: [],
    loading: false,
    error: null,
  };
  
  const redeemPlanReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_REDEEM_PLANS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_REDEEM_PLANS_SUCCESS:
        return {
          ...state,
          loading: false,
          redeemPlans: action.payload,
        };
      case FETCH_REDEEM_PLANS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case ADD_REDEEM_PLAN_REQUEST:
      case UPDATE_REDEEM_PLAN_REQUEST:
      case DELETE_REDEEM_PLAN_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case ADD_REDEEM_PLAN_SUCCESS:
        return {
          ...state,
          loading: false,
          redeemPlans: {
            ...state.redeemPlans,
            data: [...state.redeemPlans.data, action.payload?.data],
          },
        };
  
      case ADD_REDEEM_PLAN_FAILURE:
      case UPDATE_REDEEM_PLAN_FAILURE:
      case DELETE_REDEEM_PLAN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case UPDATE_REDEEM_PLAN_SUCCESS:
        return {
          ...state,
          loading: false,
          redeemPlans: {
            ...state.redeemPlans,
            data: state.redeemPlans.data?.map((item) =>
              item?._id === action.payload?.data?._id
                ? action.payload.data
                : item
            ),
          },
        };
  
      case DELETE_REDEEM_PLAN_SUCCESS:
        return {
          ...state,
          loading: false,
          redeemPlans: {
            ...state.redeemPlans,
            data: state.redeemPlans.data?.filter(
              (item) => item?._id !== action.payload?.data?._id
            ),
          },
        };
  
      default:
        return state;
    }
  };
  
  export default redeemPlanReducer;
  