// moodReducer.js
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
  } from './actionTypes';
  
  const initialState = {
    moods: [],
    loading: false,
    error: null,
  };
  
  const moodReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_MOODS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_MOODS_SUCCESS:
        return {
          ...state,
          loading: false,
          moods: action.payload,
        };
      case FETCH_MOODS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case ADD_MOOD_REQUEST:
      case UPDATE_MOOD_REQUEST:
      case DELETE_MOOD_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case ADD_MOOD_SUCCESS:
        return {
          ...state,
          loading: false,
          moods: {
            ...state.moods,
            data: [action.payload?.data,...state.moods.data],
          },
        };
  
      case ADD_MOOD_FAILURE:
      case UPDATE_MOOD_FAILURE:
      case DELETE_MOOD_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case UPDATE_MOOD_SUCCESS:
        return {
          ...state,
          loading: false,
          moods: {
            ...state.moods,
            data: state.moods.data?.map((item) =>
              item?._id == action.payload?.data?._id
                ? action.payload.data
                : item
            ),
          },
        };
  
      case DELETE_MOOD_SUCCESS:
        return {
          ...state,
          loading: false,
          moods: {
            ...state.moods,
            data: state.moods.data?.filter(
              (item) => item?._id !== action.payload?.data?._id
            ),
          },
        };
  
      default:
        return state;
    }
  };
  
  export default moodReducer;
  