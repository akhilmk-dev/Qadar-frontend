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
  } from "./actionTypes"; 
  
  const initialState = {
    levels: [],
    loading: false,
    error: null,
    fieldErrors: {},
  };
  
  const levelReducer = (state = initialState, action) => {
    switch (action.type) {
      // 📥 FETCH
      case FETCH_LEVELS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_LEVELS_SUCCESS:
        return {
          ...state,
          loading: false,
          levels: action.payload,
          error: null,
        };
      case FETCH_LEVELS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // ➕ ADD
      case ADD_LEVEL_REQUEST:
        return {
          ...state,
          loading: true,
          fieldErrors: {},
          error: null,
        };
      case ADD_LEVEL_SUCCESS:
        return {
          ...state,
          loading: false,
          fieldErrors: {},
          error: null,
          levels: {...state.levels, data:[action.payload,...state?.levels?.data]},
        };
      case ADD_LEVEL_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // ✏️ UPDATE
      case UPDATE_LEVEL_REQUEST:
        return {
          ...state,
          loading: true,
          fieldErrors: {},
          error: null,
        };
      case UPDATE_LEVEL_SUCCESS:
        return {
          ...state,
          loading: false,
          fieldErrors: {},
          error: null,
          levels: {...state?.levels,data:state.levels.data?.map((level) =>
            level._id == action.payload._id ? action.payload : level
          ), //  Replace updated level in list
        }};
      case UPDATE_LEVEL_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      //  DELETE
      case DELETE_LEVEL_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case DELETE_LEVEL_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          levels:{ ...state.levels,data:state.levels?.data?.filter((level) => level._id !== action.payload._id)}, //  Remove deleted level from list
        };
      case DELETE_LEVEL_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      // 🧾 FIELD ERRORS
      case SET_LEVEL_FIELD_ERRORS:
        return {
          ...state,
          fieldErrors: action.payload,
        };
  
      default:
        return state;
    }
  };
  
  export default levelReducer;
  