// affirmationReducer.js
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
  
  const initialState = {
    affirmations: [],
    loading: false,
    error: null,
  };
  
  const affirmationReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_AFFIRMATIONS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_AFFIRMATIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          affirmations: action.payload,
        };
      case FETCH_AFFIRMATIONS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case ADD_AFFIRMATION_REQUEST:
      case UPDATE_AFFIRMATION_REQUEST:
      case DELETE_AFFIRMATION_REQUEST:
        return {
          ...state,
          loading: true,
        };
  
      case ADD_AFFIRMATION_SUCCESS:
        return {
          ...state,
          loading: false,
          affirmations: {
            ...state.affirmations,
            data: [action.payload?.data,...state.affirmations.data],
          },
        };
  
      case ADD_AFFIRMATION_FAILURE:
      case UPDATE_AFFIRMATION_FAILURE:
      case DELETE_AFFIRMATION_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case UPDATE_AFFIRMATION_SUCCESS:
        return {
          ...state,
          loading: false,
          affirmations: {
            ...state.affirmations,
            data: state.affirmations.data?.map((item) =>
              item?._id == action.payload?.data?._id ? action.payload.data : item
            ),
          },
        };
  
      case DELETE_AFFIRMATION_SUCCESS:
        return {
          ...state,
          loading: false,
          affirmations: {
            ...state.affirmations,
            data: state.affirmations.data?.filter(
              (item) => item?._id !== action.payload?.data?._id
            ),
          },
        };
  
      default:
        return state;
    }
  };
  
  export default affirmationReducer;
  