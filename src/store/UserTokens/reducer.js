import {
    FETCH_USER_TOKENS_REQUEST,
    FETCH_USER_TOKENS_SUCCESS,
    FETCH_USER_TOKENS_FAILURE,
  } from "./actionTypes";
  
  const initialState = {
    userTokens: [],
    loading: false,
    error: null,
  };
  
  const tokenReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USER_TOKENS_REQUEST:
        return { ...state, loading: true, error: null };
  
      case FETCH_USER_TOKENS_SUCCESS:
        return { ...state, loading: false, userTokens: action.payload, error: null };
  
      case FETCH_USER_TOKENS_FAILURE:
        return { ...state, loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  
  export default tokenReducer;
  