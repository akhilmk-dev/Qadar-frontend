import * as types from './actionTypes'; // updated import

const initialState = {
  redeemSubscriptions: [],
  loading: false,
  error: null,
  fieldErrors: null,
};

const redeemSubscriptionReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_REDEEM_SUBSCRIPTIONS_REQUEST:
    case types.ADD_REDEEM_SUBSCRIPTION_REQUEST:
    case types.UPDATE_REDEEM_SUBSCRIPTION_REQUEST:
    case types.DELETE_REDEEM_SUBSCRIPTION_REQUEST:
      return { ...state, loading: true, error: null, fieldErrors: null };

    case types.FETCH_REDEEM_SUBSCRIPTIONS_SUCCESS:
      return { ...state, loading: false, redeemSubscriptions: action.payload };

    case types.ADD_REDEEM_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        redeemSubscriptions: [...state.redeemSubscriptions, action.payload],
      };

    case types.UPDATE_REDEEM_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        redeemSubscriptions: state.redeemSubscriptions.map((sub) =>
          sub._id === action.payload._id ? action.payload : sub
        ),
      };

    case types.DELETE_REDEEM_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        redeemSubscriptions: state.redeemSubscriptions.filter(
          (sub) => sub._id !== action.payload
        ),
      };

    case types.FETCH_REDEEM_SUBSCRIPTIONS_FAILURE:
    case types.ADD_REDEEM_SUBSCRIPTION_FAILURE:
    case types.UPDATE_REDEEM_SUBSCRIPTION_FAILURE:
    case types.DELETE_REDEEM_SUBSCRIPTION_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export default redeemSubscriptionReducer;
