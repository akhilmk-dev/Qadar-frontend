import {
    FETCH_PAYMENTLOGS_REQUEST,
    FETCH_PAYMENTLOGS_SUCCESS,
    FETCH_PAYMENTLOGS_FAILURE
  } from './actionTypes';
  
  const initialState = {
    logs: [],
    loading: false,
    error: null
  };
  
  const paymentLogReducer = (state = initialState, action) => {
    switch(action.type) {
      case FETCH_PAYMENTLOGS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_PAYMENTLOGS_SUCCESS:
        return { ...state, loading: false, logs: action.payload };
      case FETCH_PAYMENTLOGS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default paymentLogReducer;
  