// categoryPlanReducer.js
import {
    FETCH_CATEGORY_PLANS_REQUEST,
    FETCH_CATEGORY_PLANS_SUCCESS,
    FETCH_CATEGORY_PLANS_FAILURE,
    ADD_CATEGORY_PLAN_REQUEST,
    ADD_CATEGORY_PLAN_SUCCESS,
    ADD_CATEGORY_PLAN_FAILURE,
    UPDATE_CATEGORY_PLAN_REQUEST,
    UPDATE_CATEGORY_PLAN_SUCCESS,
    UPDATE_CATEGORY_PLAN_FAILURE,
    DELETE_CATEGORY_PLAN_REQUEST,
    DELETE_CATEGORY_PLAN_SUCCESS,
    DELETE_CATEGORY_PLAN_FAILURE,
  } from "./actionTypes";
  
  const initialState = {
    categoryPlans: [],
    loading: false,
    error: null,
  };
  
  const categoryPlanReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CATEGORY_PLANS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_CATEGORY_PLANS_SUCCESS:
        return {
          ...state,
          loading: false,
          categoryPlans: action.payload,
        };
      case FETCH_CATEGORY_PLANS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case ADD_CATEGORY_PLAN_REQUEST:
      case UPDATE_CATEGORY_PLAN_REQUEST:
      case DELETE_CATEGORY_PLAN_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case ADD_CATEGORY_PLAN_SUCCESS:
        return {
          ...state,
          loading: false,
          categoryPlans: {
            ...state.categoryPlans,
            data: [...state.categoryPlans.data, action.payload?.data],
          },
        };
  
      case ADD_CATEGORY_PLAN_FAILURE:
      case UPDATE_CATEGORY_PLAN_FAILURE:
      case DELETE_CATEGORY_PLAN_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case UPDATE_CATEGORY_PLAN_SUCCESS:
        return {
          ...state,
          loading: false,
          categoryPlans: {
            ...state.categoryPlans,
            data: state.categoryPlans.data?.map((item) =>
              item?._id === action.payload?.data?._id
                ? action.payload.data
                : item
            ),
          },
        };
  
      case DELETE_CATEGORY_PLAN_SUCCESS:
        return {
          ...state,
          loading: false,
          categoryPlans: {
            ...state.categoryPlans,
            data: state.categoryPlans.data?.filter(
              (item) => item?._id !== action.payload?.data?._id
            ),
          },
        };
  
      default:
        return state;
    }
  };
  
  export default categoryPlanReducer;
  