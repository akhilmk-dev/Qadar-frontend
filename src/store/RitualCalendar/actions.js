import {
    FETCH_RITUALS_REQUEST,
    FETCH_RITUALS_SUCCESS,
    FETCH_RITUALS_FAILURE,
    ADD_RITUAL_REQUEST,
    ADD_RITUAL_SUCCESS,
    ADD_RITUAL_FAILURE,
    UPDATE_RITUAL_REQUEST,
    UPDATE_RITUAL_SUCCESS,
    UPDATE_RITUAL_FAILURE,
    DELETE_RITUAL_REQUEST,
    DELETE_RITUAL_SUCCESS,
    DELETE_RITUAL_FAILURE,
  } from "./actionTypes";
  
  // Fetch rituals
  export const fetchRitualsRequest = (data) => ({
    type: FETCH_RITUALS_REQUEST,
    payload: data,
  });
  
  export const fetchRitualsSuccess = (rituals) => ({
    type: FETCH_RITUALS_SUCCESS,
    payload: rituals,
  });
  
  export const fetchRitualsFailure = (error) => ({
    type: FETCH_RITUALS_FAILURE,
    payload: error,
  });
  
  // Add ritual
  export const addRitualRequest = (ritual, onClose) => ({
    type: ADD_RITUAL_REQUEST,
    payload: { ritual, onClose },
  });
  
  export const addRitualSuccess = (ritual) => ({
    type: ADD_RITUAL_SUCCESS,
    payload: ritual,
  });
  
  export const addRitualFailure = (error) => ({
    type: ADD_RITUAL_FAILURE,
    payload: error,
  });
  
  // Update ritual
  export const updateRitualRequest = (id, ritual, onClose) => ({
    type: UPDATE_RITUAL_REQUEST,
    payload: { id, ritual, onClose },
  });
  
  export const updateRitualSuccess = (ritual) => ({
    type: UPDATE_RITUAL_SUCCESS,
    payload: ritual,
  });
  
  export const updateRitualFailure = (error) => ({
    type: UPDATE_RITUAL_FAILURE,
    payload: error,
  });
  
  // Delete ritual
  export const deleteRitualRequest = (ritualId) => ({
    type: DELETE_RITUAL_REQUEST,
    payload: ritualId,
  });
  
  export const deleteRitualSuccess = (ritualId) => ({
    type: DELETE_RITUAL_SUCCESS,
    payload: ritualId,
  });
  
  export const deleteRitualFailure = (error) => ({
    type: DELETE_RITUAL_FAILURE,
    payload: error,
  });
  