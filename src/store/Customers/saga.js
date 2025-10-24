import { call, put, takeLatest } from 'redux-saga/effects';

import {
  FETCH_CUSTOMERS_REQUEST,
  ADD_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_REQUEST,
  DELETE_CUSTOMER_REQUEST,
} from './actionTypes';

import {
  fetchCustomersSuccess,
  fetchCustomersFailure,
  addCustomerSuccess,
  addCustomerFailure,
  updateCustomerSuccess,
  updateCustomerFailure,
  deleteCustomerSuccess,
  deleteCustomerFailure,
} from './actions';

import axiosInstance from 'pages/Utility/axiosInstance';
import { showSuccess } from 'helpers/notification_helper';

// ============================
// API calls
// ============================

const fetchCustomersApi = async (params) => {
  return await axiosInstance.get('V1/customers', { params });
};

const addCustomerApi = async (customer) => {
  return await axiosInstance.post('V1/customers', customer);
};

const updateCustomerApi = async ({ id, customer }) => {
  return await axiosInstance.put(`V1/customers/${id}`, customer);
};

const deleteCustomerApi = async (customerId) => {
  return await axiosInstance.delete(`V1/customers/${customerId}`);
};

// ============================
// Worker Sagas
// ============================

function* fetchCustomersSaga(action) {
  try {
    const response = yield call(fetchCustomersApi, action.payload);
    yield put(fetchCustomersSuccess(response.data));
  } catch (error) {
    yield put(fetchCustomersFailure(error.message));
  }
}

function* addCustomerSaga(action) {
  try {
    const response = yield call(addCustomerApi, action.payload.customer);
    action.payload.onClose();
    yield put(addCustomerSuccess(response.data));
    showSuccess('Customer added successfully!');
  } catch (error) {
    yield put(addCustomerFailure(error?.response?.data?.errors));
  }
}

function* updateCustomerSaga(action) {
  try {
    const response = yield call(updateCustomerApi, action.payload);
    action.payload.onClose();
    yield put(updateCustomerSuccess(response.data));
    showSuccess('Customer updated successfully!');
  } catch (error) {
    yield put(updateCustomerFailure(error?.response?.data?.errors));
  }
}

function* deleteCustomerSaga(action) {
  try {
    const { data } = yield call(deleteCustomerApi, action.payload);
    yield put(deleteCustomerSuccess(data));
    showSuccess('Customer deleted successfully!');
  } catch (error) {
    yield put(deleteCustomerFailure(error.message));
  }
}

// ============================
// Watcher Saga
// ============================

export default function* customerSaga() {
  yield takeLatest(FETCH_CUSTOMERS_REQUEST, fetchCustomersSaga);
  yield takeLatest(ADD_CUSTOMER_REQUEST, addCustomerSaga);
  yield takeLatest(UPDATE_CUSTOMER_REQUEST, updateCustomerSaga);
  yield takeLatest(DELETE_CUSTOMER_REQUEST, deleteCustomerSaga);
}
