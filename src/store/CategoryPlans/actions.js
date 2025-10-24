// categoryPlanActions.js
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
  
  // Fetch category plans
  export const fetchCategoryPlansRequest = (data) => ({
    type: FETCH_CATEGORY_PLANS_REQUEST,
    payload: data,
  });
  
  export const fetchCategoryPlansSuccess = (categoryPlans) => ({
    type: FETCH_CATEGORY_PLANS_SUCCESS,
    payload: categoryPlans,
  });
  
  export const fetchCategoryPlansFailure = (error) => ({
    type: FETCH_CATEGORY_PLANS_FAILURE,
    payload: error,
  });
  
  // Add category plan
  export const addCategoryPlanRequest = (categoryPlan, onClose) => ({
    type: ADD_CATEGORY_PLAN_REQUEST,
    payload: { categoryPlan, onClose },
  });
  
  export const addCategoryPlanSuccess = (categoryPlan) => ({
    type: ADD_CATEGORY_PLAN_SUCCESS,
    payload: categoryPlan,
  });
  
  export const addCategoryPlanFailure = (error) => ({
    type: ADD_CATEGORY_PLAN_FAILURE,
    payload: error,
  });
  
  // Update category plan
  export const updateCategoryPlanRequest = (id, categoryPlan, onClose) => ({
    type: UPDATE_CATEGORY_PLAN_REQUEST,
    payload: { id, categoryPlan, onClose },
  });
  
  export const updateCategoryPlanSuccess = (categoryPlan) => ({
    type: UPDATE_CATEGORY_PLAN_SUCCESS,
    payload: categoryPlan,
  });
  
  export const updateCategoryPlanFailure = (error) => ({
    type: UPDATE_CATEGORY_PLAN_FAILURE,
    payload: error,
  });
  
  // Delete category plan
  export const deleteCategoryPlanRequest = (categoryPlanId) => ({
    type: DELETE_CATEGORY_PLAN_REQUEST,
    payload: categoryPlanId,
  });
  
  export const deleteCategoryPlanSuccess = (categoryPlanId) => ({
    type: DELETE_CATEGORY_PLAN_SUCCESS,
    payload: categoryPlanId,
  });
  
  export const deleteCategoryPlanFailure = (error) => ({
    type: DELETE_CATEGORY_PLAN_FAILURE,
    payload: error,
  });
  