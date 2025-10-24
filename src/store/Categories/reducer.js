// categoryReducer.js
import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
    ADD_CATEGORY_REQUEST,
    ADD_CATEGORY_SUCCESS,
    ADD_CATEGORY_FAILURE,
    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAILURE,
    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAILURE,
  } from './actionTypes';
  
  const initialState = {
    categories: [],
    loading: false,
    error: null,
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CATEGORIES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_CATEGORIES_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: action.payload,
        };
      case FETCH_CATEGORIES_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case ADD_CATEGORY_REQUEST:
      case UPDATE_CATEGORY_REQUEST:
      case DELETE_CATEGORY_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case ADD_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: {
            ...state.categories,
            data: [action.payload?.data,...state.categories.data],
          },
        };
      case ADD_CATEGORY_FAILURE:
      case UPDATE_CATEGORY_FAILURE:
      case DELETE_CATEGORY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      case UPDATE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: {
            ...state.categories,
            data: state.categories.data?.map((item) =>
              item?._id == action.payload?.data?._id ? action.payload.data : item
            ),
          },
        };
      case DELETE_CATEGORY_SUCCESS:
        return {
          ...state,
          loading: false,
          categories: {
            ...state.categories,
            data: state.categories.data?.filter(
              (item) => item?._id != action.payload?.data?._id
            ),
          },
        };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  