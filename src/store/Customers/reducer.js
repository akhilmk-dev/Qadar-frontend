import {
    FETCH_CUSTOMERS_REQUEST,
    FETCH_CUSTOMERS_SUCCESS,
    FETCH_CUSTOMERS_FAILURE,
    ADD_CUSTOMER_REQUEST,
    ADD_CUSTOMER_SUCCESS,
    ADD_CUSTOMER_FAILURE,
    UPDATE_CUSTOMER_REQUEST,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_FAILURE,
    DELETE_CUSTOMER_REQUEST,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_FAILURE,
  } from './actionTypes';
  
  const initialState = {
    customers: [],
    loading: false,
    error: null,
  };
  
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      // FETCH
      case FETCH_CUSTOMERS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_CUSTOMERS_SUCCESS:
        return {
          ...state,
          loading: false,
          customers: action.payload,
        };
      case FETCH_CUSTOMERS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // CREATE, UPDATE, DELETE - loading state
      case ADD_CUSTOMER_REQUEST:
      case UPDATE_CUSTOMER_REQUEST:
      case DELETE_CUSTOMER_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      // CREATE
      case ADD_CUSTOMER_SUCCESS:
        return {
          ...state,
          loading: false,
          customers: {
            ...state.customers,
            data: [...state.customers.data, action.payload?.data],
          },
        };
      case ADD_CUSTOMER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // UPDATE
      case UPDATE_CUSTOMER_SUCCESS:
        return {
          ...state,
          loading: false,
          customers: {
            ...state.customers,
            data: state.customers.data?.map((item) =>
              item?._id === action.payload?.data?._id ? action.payload.data : item
            ),
          },
        };
      case UPDATE_CUSTOMER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // DELETE
      case DELETE_CUSTOMER_SUCCESS:
        return {
          ...state,
          loading: false,
          customers: {
            ...state.customers,
            data: state.customers.data?.filter(
              (item) => item?._id !== action.payload?.data?._id
            ),
          },
        };
      case DELETE_CUSTOMER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // DEFAULT
      default:
        return state;
    }
  };
  
  export default customerReducer;
  