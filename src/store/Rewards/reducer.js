import * as types from './actionTypes';

const initialState = {
  rewards: [],
  loading: false,
  error: null,
  fieldErrors: null,
};

const rewardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_REWARDS_REQUEST:
    case types.ADD_REWARD_REQUEST:
    case types.UPDATE_REWARD_REQUEST:
    case types.DELETE_REWARD_REQUEST:
      return { ...state, loading: true, error: null, fieldErrors: null };

    case types.FETCH_REWARDS_SUCCESS:
      return { ...state, loading: false, rewards: action.payload };

    case types.ADD_REWARD_SUCCESS:
      return { ...state, loading: false, rewards:{ ...state.rewards,data:[action.payload.data,...state.rewards.data] }};

    case types.UPDATE_REWARD_SUCCESS:
      return {
        ...state,
        loading: false,
        rewards:{
         ...state.rewards,
         data:state.rewards.data.map(reward =>
          reward._id == action.payload.data?._id ? action.payload?.data : reward
        )},
      };

    case types.DELETE_REWARD_SUCCESS:
      return {
        ...state,
        loading: false,
        rewards: {...state.rewards,data:state.rewards.data.filter(reward => reward._id != action.payload.data?._id)},
      };

    case types.FETCH_REWARDS_FAILURE:
    case types.ADD_REWARD_FAILURE:
    case types.UPDATE_REWARD_FAILURE:
    case types.DELETE_REWARD_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case types.SET_REWARD_FIELD_ERRORS:
      return { ...state, fieldErrors: action.payload };

    default:
      return state;
  }
};

export default rewardReducer;
