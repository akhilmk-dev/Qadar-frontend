// moodActions.js
import {
    FETCH_MOODS_REQUEST,
    FETCH_MOODS_SUCCESS,
    FETCH_MOODS_FAILURE,
    ADD_MOOD_REQUEST,
    ADD_MOOD_SUCCESS,
    ADD_MOOD_FAILURE,
    UPDATE_MOOD_REQUEST,
    UPDATE_MOOD_SUCCESS,
    UPDATE_MOOD_FAILURE,
    DELETE_MOOD_REQUEST,
    DELETE_MOOD_SUCCESS,
    DELETE_MOOD_FAILURE,
  } from "./actionTypes";
  
  // Fetch moods action creators
  export const fetchMoodsRequest = (data) => ({
    type: FETCH_MOODS_REQUEST,
    payload: data,
  });
  
  export const fetchMoodsSuccess = (moods) => ({
    type: FETCH_MOODS_SUCCESS,
    payload: moods,
  });
  
  export const fetchMoodsFailure = (error) => ({
    type: FETCH_MOODS_FAILURE,
    payload: error,
  });
  
  // Add mood action creators
  export const addMoodRequest = (mood, onClose) => ({
    type: ADD_MOOD_REQUEST,
    payload: { mood, onClose },
  });
  
  export const addMoodSuccess = (mood) => ({
    type: ADD_MOOD_SUCCESS,
    payload: mood,
  });
  
  export const addMoodFailure = (error) => ({
    type: ADD_MOOD_FAILURE,
    payload: error,
  });
  
  // Update mood action creators
  export const updateMoodRequest = (id, mood, onClose) => ({
    type: UPDATE_MOOD_REQUEST,
    payload: { id, mood, onClose },
  });
  
  export const updateMoodSuccess = (mood) => ({
    type: UPDATE_MOOD_SUCCESS,
    payload: mood,
  });
  
  export const updateMoodFailure = (error) => ({
    type: UPDATE_MOOD_FAILURE,
    payload: error,
  });
  
  // Delete mood action creators
  export const deleteMoodRequest = (moodId) => ({
    type: DELETE_MOOD_REQUEST,
    payload: moodId,
  });
  
  export const deleteMoodSuccess = (moodId) => ({
    type: DELETE_MOOD_SUCCESS,
    payload: moodId,
  });
  
  export const deleteMoodFailure = (error) => ({
    type: DELETE_MOOD_FAILURE,
    payload: error,
  });
  