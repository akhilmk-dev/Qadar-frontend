import { call, put, takeEvery } from 'redux-saga/effects';
import * as types from './actionTypes';
import * as actions from './actions';
import axiosInstance from 'pages/Utility/axiosInstance';
import toast from 'react-hot-toast';

// API calls
const fetchRewardsApi = () => axiosInstance.get('V1/rewards');
const addRewardApi = (data) => axiosInstance.post('V1/rewards', data);
const updateRewardApi = ({ id, data }) => axiosInstance.put(`V1/rewards/${id}`, data);
const deleteRewardApi = (id) => axiosInstance.delete(`V1/rewards/${id}`);

// Sagas
function* fetchRewardsSaga() {
  try {
    const { data } = yield call(fetchRewardsApi);
    yield put(actions.fetchRewardsSuccess(data));
  } catch (error) {
    yield put(actions.fetchRewardsFailure(error.response?.data || error.message));
  }
}

function* addRewardSaga(action) {
  try {
    const { data } = yield call(addRewardApi, action.payload);
     action.onClose();
    yield put(actions.addRewardSuccess(data));
    toast.success('Reward added successfully!');
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.fieldErrors) {
      yield put(actions.setRewardFieldErrors(error.response.data.fieldErrors));
    } else {
      yield put(actions.addRewardFailure(error.response?.data || error.message));
    }
  }
}

function* updateRewardSaga(action) {
  try {
    const { data } = yield call(updateRewardApi, action.payload);
    action.onClose();
    yield put(actions.updateRewardSuccess(data));
    toast.success('Reward updated successfully!');
    
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.fieldErrors) {
      yield put(actions.setRewardFieldErrors(error.response.data.fieldErrors));
    } else {
      yield put(actions.updateRewardFailure(error.response?.data || error.message));
    }
  }
}

function* deleteRewardSaga(action) {
  try {
    const { data } = yield call(deleteRewardApi, action.payload);
    yield put(actions.deleteRewardSuccess(data));
    action.onClose();
    toast.success('Reward deleted successfully!');
  } catch (error) {
    yield put(actions.deleteRewardFailure(error.response?.data || error.message));
  }
}

export default function* rewardSaga() {
  yield takeEvery(types.FETCH_REWARDS_REQUEST, fetchRewardsSaga);
  yield takeEvery(types.ADD_REWARD_REQUEST, addRewardSaga);
  yield takeEvery(types.UPDATE_REWARD_REQUEST, updateRewardSaga);
  yield takeEvery(types.DELETE_REWARD_REQUEST, deleteRewardSaga);
}
