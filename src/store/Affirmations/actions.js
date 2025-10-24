// affirmationActions.js
import {
    FETCH_AFFIRMATIONS_REQUEST,
    FETCH_AFFIRMATIONS_SUCCESS,
    FETCH_AFFIRMATIONS_FAILURE,
    ADD_AFFIRMATION_REQUEST,
    ADD_AFFIRMATION_SUCCESS,
    ADD_AFFIRMATION_FAILURE,
    UPDATE_AFFIRMATION_REQUEST,
    UPDATE_AFFIRMATION_SUCCESS,
    UPDATE_AFFIRMATION_FAILURE,
    DELETE_AFFIRMATION_REQUEST,
    DELETE_AFFIRMATION_SUCCESS,
    DELETE_AFFIRMATION_FAILURE,
  } from './actionTypes';
  
  // Fetch affirmations
  export const fetchAffirmationsRequest = (data) => ({
    type: FETCH_AFFIRMATIONS_REQUEST,
    payload: data,
  });
  
  export const fetchAffirmationsSuccess = (affirmations) => ({
    type: FETCH_AFFIRMATIONS_SUCCESS,
    payload: affirmations,
  });
  
  export const fetchAffirmationsFailure = (error) => ({
    type: FETCH_AFFIRMATIONS_FAILURE,
    payload: error,
  });
  
  // Add affirmation
  export const addAffirmationRequest = (affirmation, onClose) => ({
    type: ADD_AFFIRMATION_REQUEST,
    payload: { affirmation, onClose },
  });
  
  export const addAffirmationSuccess = (affirmation) => ({
    type: ADD_AFFIRMATION_SUCCESS,
    payload: affirmation,
  });
  
  export const addAffirmationFailure = (error) => ({
    type: ADD_AFFIRMATION_FAILURE,
    payload: error,
  });
  
  // Update affirmation
  export const updateAffirmationRequest = (id, affirmation, onClose) => ({
    type: UPDATE_AFFIRMATION_REQUEST,
    payload: { id, affirmation, onClose },
  });
  
  export const updateAffirmationSuccess = (affirmation) => ({
    type: UPDATE_AFFIRMATION_SUCCESS,
    payload: affirmation,
  });
  
  export const updateAffirmationFailure = (error) => ({
    type: UPDATE_AFFIRMATION_FAILURE,
    payload: error,
  });
  
  // Delete affirmation
  export const deleteAffirmationRequest = (id) => ({
    type: DELETE_AFFIRMATION_REQUEST,
    payload: id,
  });
  
  export const deleteAffirmationSuccess = (id) => ({
    type: DELETE_AFFIRMATION_SUCCESS,
    payload: id,
  });
  
  export const deleteAffirmationFailure = (error) => ({
    type: DELETE_AFFIRMATION_FAILURE,
    payload: error,
  });
  