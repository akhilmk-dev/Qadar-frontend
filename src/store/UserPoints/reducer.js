import * as types from "./actionTypes"; // adjust the import path

const initialState = {
  userXPPoints: [], // list of user XP points
  loading: false,
  error: null,
};

const userXPPointsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_USER_XP_POINTS_REQUEST:
      return { ...state, loading: true, error: null };

    case types.FETCH_USER_XP_POINTS_SUCCESS:
      return { ...state, loading: false, userXPPoints: action.payload };

    case types.FETCH_USER_XP_POINTS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default userXPPointsReducer;
