// subscriptionSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_SUBSCRIPTIONS_REQUEST,
  ADD_SUBSCRIPTION_REQUEST,
  UPDATE_SUBSCRIPTION_REQUEST,
  DELETE_SUBSCRIPTION_REQUEST,
} from './actionTypes';
import {
  fetchSubscriptionsSuccess,
  fetchSubscriptionsFailure,
  addSubscriptionSuccess,
  addSubscriptionFailure,
  updateSubscriptionSuccess,
  updateSubscriptionFailure,
  deleteSubscriptionSuccess,
  deleteSubscriptionFailure,
} from './actions';
import axiosInstance from 'pages/Utility/axiosInstance';
import { showSuccess } from 'helpers/notification_helper';

// ================= API calls =================
const fetchSubscriptionsApi = async (params) => {
  return await axiosInstance.get('V1/subscriptions', { params });
};

const addSubscriptionApi = async (subscription) => {
  return await axiosInstance.post('V1/subscriptions', subscription);
};

const updateSubscriptionApi = async ({ id, subscription }) => {
  return await axiosInstance.put(`V1/subscriptions/${id}`, subscription);
};

const deleteSubscriptionApi = async (subscriptionId) => {
  return await axiosInstance.delete(`V1/subscriptions/${subscriptionId}`);
};

// ================= Sagas =================

// Fetch subscriptions
function* fetchSubscriptionsSaga(action) {
  try {
    const response = yield call(fetchSubscriptionsApi, action.payload);
    yield put(fetchSubscriptionsSuccess(response.data));
  } catch (error) {
    yield put(fetchSubscriptionsFailure(error.message));
  }
}

// Add subscription
function* addSubscriptionSaga(action) {
  try {
    const response = yield call(addSubscriptionApi, action.payload.subscription);
    action.payload.onClose?.();
    yield put(addSubscriptionSuccess(response.data));
    showSuccess('Subscription added successfully!');
  } catch (error) {
    yield put(addSubscriptionFailure(error?.response?.data?.errors));
  }
}

// Update subscription
function* updateSubscriptionSaga(action) {
  try {
    const response = yield call(updateSubscriptionApi, action.payload);
    yield put(updateSubscriptionSuccess(response.data));
    showSuccess('Subscription updated successfully!');
    action.payload.onClose?.();
  } catch (error) {
    yield put(updateSubscriptionFailure(error?.response?.data?.errors));
  }
}

// Delete subscription
function* deleteSubscriptionSaga(action) {
  try {
    const { data } = yield call(deleteSubscriptionApi, action.payload);
    yield put(deleteSubscriptionSuccess(data));
    showSuccess('Subscription deleted successfully!');
  } catch (error) {
    yield put(deleteSubscriptionFailure(error.message));
  }
}

// ================= Watcher =================
export default function* subscriptionSaga() {
  yield takeLatest(FETCH_SUBSCRIPTIONS_REQUEST, fetchSubscriptionsSaga);
  yield takeLatest(ADD_SUBSCRIPTION_REQUEST, addSubscriptionSaga);
  yield takeLatest(UPDATE_SUBSCRIPTION_REQUEST, updateSubscriptionSaga);
  yield takeLatest(DELETE_SUBSCRIPTION_REQUEST, deleteSubscriptionSaga);
}
