import * as types from './actionTypes'; // updated import

const initialState = {
  subscriptions: [],
  loading: false,
  error: null,
  fieldErrors: null,
};

const subscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_SUBSCRIPTIONS_REQUEST:
    case types.ADD_SUBSCRIPTION_REQUEST:
    case types.UPDATE_SUBSCRIPTION_REQUEST:
    case types.DELETE_SUBSCRIPTION_REQUEST:
      return { ...state, loading: true, error: null, fieldErrors: null };

    case types.FETCH_SUBSCRIPTIONS_SUCCESS:
      return { ...state, loading: false, subscriptions: action.payload };

    case types.ADD_SUBSCRIPTION_SUCCESS:
      return { ...state, loading: false, subscriptions: [...state.subscriptions, action.payload] };

    case types.UPDATE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriptions: state.subscriptions.map(sub =>
          sub._id === action.payload._id ? action.payload : sub
        ),
      };

    case types.DELETE_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        subscriptions: state.subscriptions.filter(sub => sub._id !== action.payload),
      };

    case types.FETCH_SUBSCRIPTIONS_FAILURE:
    case types.ADD_SUBSCRIPTION_FAILURE:
    case types.UPDATE_SUBSCRIPTION_FAILURE:
    case types.DELETE_SUBSCRIPTION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default subscriptionReducer;
