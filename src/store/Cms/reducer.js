import {
  FETCH_CMS_REQUEST,
  FETCH_CMS_SUCCESS,
  FETCH_CMS_FAILURE,
  ADD_CMS_REQUEST,
  ADD_CMS_SUCCESS,
  ADD_CMS_FAILURE,
  UPDATE_CMS_REQUEST,
  UPDATE_CMS_SUCCESS,
  UPDATE_CMS_FAILURE,
} from "./actionTypes";

const initialState = {
 cmsPages: { data: [], total: 0 },
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

    case ADD_CMS_REQUEST:
      return { ...state, loading: true };

    case ADD_CMS_SUCCESS:
      return {
        ...state,
        loading: false,
        cmsPages: {
          ...state.cmsPages,
          data: [action.payload.data, ...state.cmsPages.data],
        },
      };

    case ADD_CMS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    // === Update ===
    case UPDATE_CMS_REQUEST:
      return { ...state, loading: true };

    case UPDATE_CMS_SUCCESS:
      return {
        ...state,
        loading: false,
        cmsPages: {
          ...state.cmsPages,
          data: state.cmsPages.data.map((item) =>
            item._id === action.payload.data._id ? action.payload.data : item
          ),
        },
      };

    case UPDATE_CMS_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default cmsReducer;