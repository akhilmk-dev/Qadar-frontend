// planActions.js
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
  } from "./actionTypes";
  
  // Fetch plans
  export const fetchPlansRequest = (data) => ({
    type: FETCH_PLANS_REQUEST,
    payload: data,
  });
  
  export const fetchPlansSuccess = (plans) => ({
    type: FETCH_PLANS_SUCCESS,
    payload: plans,
  });
  
  export const fetchPlansFailure = (error) => ({
    type: FETCH_PLANS_FAILURE,
    payload: error,
  });
  
  // Add plan
  export const addPlanRequest = (plan, onClose) => ({
    type: ADD_PLAN_REQUEST,
    payload: { plan, onClose },
  });
  
  export const addPlanSuccess = (plan) => ({
    type: ADD_PLAN_SUCCESS,
    payload: plan,
  });
  
  export const addPlanFailure = (error) => ({
    type: ADD_PLAN_FAILURE,
    payload: error,
  });
  
  // Update plan
  export const updatePlanRequest = (id, plan, onClose) => ({
    type: UPDATE_PLAN_REQUEST,
    payload: { id, plan, onClose },
  });
  
  export const updatePlanSuccess = (plan) => ({
    type: UPDATE_PLAN_SUCCESS,
    payload: plan,
  });
  
  export const updatePlanFailure = (error) => ({
    type: UPDATE_PLAN_FAILURE,
    payload: error,
  });
  
  // Delete plan
  export const deletePlanRequest = (planId) => ({
    type: DELETE_PLAN_REQUEST,
    payload: planId,
  });
  
  export const deletePlanSuccess = (planId) => ({
    type: DELETE_PLAN_SUCCESS,
    payload: planId,
  });
  
  export const deletePlanFailure = (error) => ({
    type: DELETE_PLAN_FAILURE,
    payload: error,
  });
  