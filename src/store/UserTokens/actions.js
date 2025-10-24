import {
    FETCH_USER_TOKENS_REQUEST,
    FETCH_USER_TOKENS_SUCCESS,
    FETCH_USER_TOKENS_FAILURE,
  } from "./actionTypes";
  
  // Request
  export const fetchUserTokensRequest = (params = {}) => ({
    type: FETCH_USER_TOKENS_REQUEST,
    payload: params,
  });
  
  // Success
  export const fetchUserTokensSuccess = (data) => ({
    type: FETCH_USER_TOKENS_SUCCESS,
    payload: data,
  });
  
  // Failure
  export const fetchUserTokensFailure = (error) => ({
    type: FETCH_USER_TOKENS_FAILURE,
    payload: error,
  });
  