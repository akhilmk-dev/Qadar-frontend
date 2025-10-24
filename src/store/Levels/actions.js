import {
    FETCH_LEVELS_REQUEST,
    FETCH_LEVELS_SUCCESS,
    FETCH_LEVELS_FAILURE,
    ADD_LEVEL_REQUEST,
    ADD_LEVEL_SUCCESS,
    ADD_LEVEL_FAILURE,
    UPDATE_LEVEL_REQUEST,
    UPDATE_LEVEL_SUCCESS,
    UPDATE_LEVEL_FAILURE,
    DELETE_LEVEL_REQUEST,
    DELETE_LEVEL_SUCCESS,
    DELETE_LEVEL_FAILURE,
    SET_LEVEL_FIELD_ERRORS,
  } from './actionTypes'; 
  
  // 📥 FETCH Levels
  export const fetchLevelsRequest = (params) => ({
    type: FETCH_LEVELS_REQUEST,
    payload: params
  });
  
  export const fetchLevelsSuccess = (data) => ({
    type: FETCH_LEVELS_SUCCESS,
    payload: data,
  });
  
  export const fetchLevelsFailure = (error) => ({
    type: FETCH_LEVELS_FAILURE,
    payload: error,
  });
  
  // ➕ ADD Level
  export const addLevelRequest = (data, onClose) => ({
    type: ADD_LEVEL_REQUEST,
    payload: { data, onClose },
  });
  
  export const addLevelSuccess = (data) => ({
    type: ADD_LEVEL_SUCCESS,
    payload:data
  });
  
  export const addLevelFailure = (error) => ({
    type: ADD_LEVEL_FAILURE,
    payload: error,
  });
  
  // ✏️ UPDATE Level
  export const updateLevelRequest = (id, data, onClose) => ({
    type: UPDATE_LEVEL_REQUEST,
    payload: { id, data, onClose },
  });
  
  export const updateLevelSuccess = (data) => ({
    type: UPDATE_LEVEL_SUCCESS,
    payload: data
  });
  
  export const updateLevelFailure = (error) => ({
    type: UPDATE_LEVEL_FAILURE,
    payload: error,
  });
  
  //  DELETE Level
  export const deleteLevelRequest = (id) => ({
    type: DELETE_LEVEL_REQUEST,
    payload: id,
  });
  
  export const deleteLevelSuccess = (data) => ({
    type: DELETE_LEVEL_SUCCESS,
    payload:data
  });
  
  export const deleteLevelFailure = (error) => ({
    type: DELETE_LEVEL_FAILURE,
    payload: error,
  });
  
  export const setLevelFieldErrors = (errors) => ({
    type: SET_LEVEL_FIELD_ERRORS,
    payload: errors,
  });