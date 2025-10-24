import { call, put, takeLatest } from 'redux-saga/effects';
import axiosInstance from 'pages/Utility/axiosInstance';
import {
  FETCH_PAYMENTLOGS_REQUEST
} from './actionTypes';
import {
  fetchPaymentLogsSuccess,
  fetchPaymentLogsFailure
} from './actions';

// API call
const fetchPaymentLogsApi = async (params) => {
  return await axiosInstance.get('V1/payments/logs', { params });
};

// Saga
function* fetchPaymentLogsSaga(action) {
  try {
    const response = yield call(fetchPaymentLogsApi, action.payload);
    yield put(fetchPaymentLogsSuccess(response.data));
  } catch (error) {
    yield put(fetchPaymentLogsFailure(error?.response?.data || error.message));
  }
}

// Watcher
export default function* paymentLogSaga() {
  yield takeLatest(FETCH_PAYMENTLOGS_REQUEST, fetchPaymentLogsSaga);
}
