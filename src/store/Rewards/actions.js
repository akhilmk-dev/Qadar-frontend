import * as types from './actionTypes';

export const fetchRewardsRequest = () => ({ type: types.FETCH_REWARDS_REQUEST });
export const fetchRewardsSuccess = (data) => ({ type: types.FETCH_REWARDS_SUCCESS, payload: data });
export const fetchRewardsFailure = (error) => ({ type: types.FETCH_REWARDS_FAILURE, payload: error });

export const addRewardRequest = (data, onClose) => ({ type: types.ADD_REWARD_REQUEST, payload: data, onClose });
export const addRewardSuccess = (data) => ({ type: types.ADD_REWARD_SUCCESS, payload: data });
export const addRewardFailure = (error) => ({ type: types.ADD_REWARD_FAILURE, payload: error });

export const updateRewardRequest = (id, data, onClose) => ({ type: types.UPDATE_REWARD_REQUEST, payload: { id, data }, onClose });
export const updateRewardSuccess = (data) => ({ type: types.UPDATE_REWARD_SUCCESS, payload: data });
export const updateRewardFailure = (error) => ({ type: types.UPDATE_REWARD_FAILURE, payload: error });

export const deleteRewardRequest = (id) => ({ type: types.DELETE_REWARD_REQUEST, payload: id });
export const deleteRewardSuccess = (id) => ({ type: types.DELETE_REWARD_SUCCESS, payload: id });
export const deleteRewardFailure = (error) => ({ type: types.DELETE_REWARD_FAILURE, payload: error });

export const setRewardFieldErrors = (errors) => ({ type: types.SET_REWARD_FIELD_ERRORS, payload: errors });
