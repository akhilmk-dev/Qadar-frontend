// userXPPointsActions.js
import {
    FETCH_USER_XP_POINTS_REQUEST,
    FETCH_USER_XP_POINTS_SUCCESS,
    FETCH_USER_XP_POINTS_FAILURE,
  } from "./actionTypes"; // adjust the import path
  
  // ================= Fetch User XP Points =================
  export const fetchUserXPPointsRequest = (params) => ({
    type: FETCH_USER_XP_POINTS_REQUEST,
    payload: params, // can include page, limit, search, customerId, etc.
  });
  
  export const fetchUserXPPointsSuccess = (xpPoints) => ({
    type: FETCH_USER_XP_POINTS_SUCCESS,
    payload: xpPoints,
  });
  
  export const fetchUserXPPointsFailure = (error) => ({
    type: FETCH_USER_XP_POINTS_FAILURE,
    payload: error,
  });
  