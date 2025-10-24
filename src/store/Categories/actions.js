// categoryActions.js
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
  } from "./actionTypes";
  
  // Fetch categories action creators
  export const fetchCategoriesRequest = (data) => ({
    type: FETCH_CATEGORIES_REQUEST,
    payload: data,
  });
  
  export const fetchCategoriesSuccess = (categories) => ({
    type: FETCH_CATEGORIES_SUCCESS,
    payload: categories,
  });
  
  export const fetchCategoriesFailure = (error) => ({
    type: FETCH_CATEGORIES_FAILURE,
    payload: error,
  });
  
  // Add category action creators
  export const addCategoryRequest = (category, onClose) => ({
    type: ADD_CATEGORY_REQUEST,
    payload: { category, onClose },
  });
  
  export const addCategorySuccess = (category) => ({
    type: ADD_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const addCategoryFailure = (error) => ({
    type: ADD_CATEGORY_FAILURE,
    payload: error,
  });
  
  // Update category action creators
  export const updateCategoryRequest = (id, category, onClose) => ({
    type: UPDATE_CATEGORY_REQUEST,
    payload: { id, category, onClose },
  });
  
  export const updateCategorySuccess = (category) => ({
    type: UPDATE_CATEGORY_SUCCESS,
    payload: category,
  });
  
  export const updateCategoryFailure = (error) => ({
    type: UPDATE_CATEGORY_FAILURE,
    payload: error,
  });
  
  // Delete category action creators
  export const deleteCategoryRequest = (categoryId) => ({
    type: DELETE_CATEGORY_REQUEST,
    payload: categoryId,
  });
  
  export const deleteCategorySuccess = (categoryId) => ({
    type: DELETE_CATEGORY_SUCCESS,
    payload: categoryId,
  });
  
  export const deleteCategoryFailure = (error) => ({
    type: DELETE_CATEGORY_FAILURE,
    payload: error,
  });
  