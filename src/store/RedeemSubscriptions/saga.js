// redeemSubscriptionSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_REDEEM_SUBSCRIPTIONS_REQUEST,
  ADD_REDEEM_SUBSCRIPTION_REQUEST,
  UPDATE_REDEEM_SUBSCRIPTION_REQUEST,
  DELETE_REDEEM_SUBSCRIPTION_REQUEST,
} from './actionTypes';
import {
  fetchRedeemSubscriptionsSuccess,
  fetchRedeemSubscriptionsFailure,
  addRedeemSubscriptionSuccess,
  addRedeemSubscriptionFailure,
  updateRedeemSubscriptionSuccess,
  updateRedeemSubscriptionFailure,
  deleteRedeemSubscriptionSuccess,
  deleteRedeemSubscriptionFailure,
} from './actions';
import axiosInstance from 'pages/Utility/axiosInstance';
import { showSuccess } from 'helpers/notification_helper';

// ================= API calls =================
const fetchRedeemSubscriptionsApi = async (params) => {
  return await axiosInstance.get('V1/redeem-subscriptions', { params });
};

const addRedeemSubscriptionApi = async (redeemSubscription) => {
  return await axiosInstance.post('V1/redeem-subscriptions', redeemSubscription);
};

const updateRedeemSubscriptionApi = async ({ id, redeemSubscription }) => {
  return await axiosInstance.put(`V1/redeem-subscriptions/${id}`, redeemSubscription);
};

const deleteRedeemSubscriptionApi = async (redeemSubscriptionId) => {
  return await axiosInstance.delete(`V1/redeem-subscriptions/${redeemSubscriptionId}`);
};

// ================= Sagas =================

// Fetch redeem subscriptions
function* fetchRedeemSubscriptionsSaga(action) {
  try {
    const response = yield call(fetchRedeemSubscriptionsApi, action.payload);
    yield put(fetchRedeemSubscriptionsSuccess(response.data));
  } catch (error) {
    yield put(fetchRedeemSubscriptionsFailure(error.message));
  }
}

// Add redeem subscription
function* addRedeemSubscriptionSaga(action) {
  try {
    const response = yield call(addRedeemSubscriptionApi, action.payload.redeemSubscription);
    action.payload.onClose?.();
    yield put(addRedeemSubscriptionSuccess(response.data));
    showSuccess('Redeem subscription added successfully!');
  } catch (error) {
    yield put(addRedeemSubscriptionFailure(error?.response?.data?.errors));
  }
}

// Update redeem subscription
function* updateRedeemSubscriptionSaga(action) {
  try {
    const response = yield call(updateRedeemSubscriptionApi, action.payload);
    yield put(updateRedeemSubscriptionSuccess(response.data));
    showSuccess('Redeem subscription updated successfully!');
    action.payload.onClose?.();
  } catch (error) {
    yield put(updateRedeemSubscriptionFailure(error?.response?.data?.errors));
  }
}

// Delete redeem subscription
function* deleteRedeemSubscriptionSaga(action) {
  try {
    const { data } = yield call(deleteRedeemSubscriptionApi, action.payload);
    yield put(deleteRedeemSubscriptionSuccess(data));
    showSuccess('Redeem subscription deleted successfully!');
  } catch (error) {
    yield put(deleteRedeemSubscriptionFailure(error.message));
  }
}

// ================= Watcher =================
export default function* redeemSubscriptionSaga() {
  yield takeLatest(FETCH_REDEEM_SUBSCRIPTIONS_REQUEST, fetchRedeemSubscriptionsSaga);
  yield takeLatest(ADD_REDEEM_SUBSCRIPTION_REQUEST, addRedeemSubscriptionSaga);
  yield takeLatest(UPDATE_REDEEM_SUBSCRIPTION_REQUEST, updateRedeemSubscriptionSaga);
  yield takeLatest(DELETE_REDEEM_SUBSCRIPTION_REQUEST, deleteRedeemSubscriptionSaga);
}
