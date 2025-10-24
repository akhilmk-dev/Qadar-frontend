import {
    FETCH_PAYMENTLOGS_REQUEST,
    FETCH_PAYMENTLOGS_SUCCESS,
    FETCH_PAYMENTLOGS_FAILURE
  } from './actionTypes';
  
  // Fetch payment logs
  export const fetchPaymentLogsRequest = (params) => ({
    type: FETCH_PAYMENTLOGS_REQUEST,
    payload: params,
  });
  
  export const fetchPaymentLogsSuccess = (logs) => ({
    type: FETCH_PAYMENTLOGS_SUCCESS,
    payload: logs,
  });
  
  export const fetchPaymentLogsFailure = (error) => ({
    type: FETCH_PAYMENTLOGS_FAILURE,
    payload: error,
  });
  