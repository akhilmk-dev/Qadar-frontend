// redeemPlanActions.js
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
  
  // Fetch redeem plans
  export const fetchRedeemPlansRequest = (data) => ({
    type: FETCH_REDEEM_PLANS_REQUEST,
    payload: data,
  });
  
  export const fetchRedeemPlansSuccess = (plans) => ({
    type: FETCH_REDEEM_PLANS_SUCCESS,
    payload: plans,
  });
  
  export const fetchRedeemPlansFailure = (error) => ({
    type: FETCH_REDEEM_PLANS_FAILURE,
    payload: error,
  });
  
  // Add redeem plan
  export const addRedeemPlanRequest = (plan, onClose) => ({
    type: ADD_REDEEM_PLAN_REQUEST,
    payload: { plan, onClose },
  });
  
  export const addRedeemPlanSuccess = (plan) => ({
    type: ADD_REDEEM_PLAN_SUCCESS,
    payload: plan,
  });
  
  export const addRedeemPlanFailure = (error) => ({
    type: ADD_REDEEM_PLAN_FAILURE,
    payload: error,
  });
  
  // Update redeem plan
  export const updateRedeemPlanRequest = (id, plan, onClose) => ({
    type: UPDATE_REDEEM_PLAN_REQUEST,
    payload: { id, plan, onClose },
  });
  
  export const updateRedeemPlanSuccess = (plan) => ({
    type: UPDATE_REDEEM_PLAN_SUCCESS,
    payload: plan,
  });
  
  export const updateRedeemPlanFailure = (error) => ({
    type: UPDATE_REDEEM_PLAN_FAILURE,
    payload: error,
  });
  
  // Delete redeem plan
  export const deleteRedeemPlanRequest = (planId) => ({
    type: DELETE_REDEEM_PLAN_REQUEST,
    payload: planId,
  });
  
  export const deleteRedeemPlanSuccess = (planId) => ({
    type: DELETE_REDEEM_PLAN_SUCCESS,
    payload: planId,
  });
  
  export const deleteRedeemPlanFailure = (error) => ({
    type: DELETE_REDEEM_PLAN_FAILURE,
    payload: error,
  });
  