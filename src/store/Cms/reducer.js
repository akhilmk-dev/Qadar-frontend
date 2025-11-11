import {
  FETCH_CMS_REQUEST,
  FETCH_CMS_SUCCESS,
  FETCH_CMS_FAILURE,
} from "./actionTypes";

const initialState = {
  cmsPages: [],
  loading: false,
  error: null,
};

const cmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CMS_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_CMS_SUCCESS:
      return { ...state, loading: false, cmsPages: action.payload };

    case FETCH_CMS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default cmsReducer;
