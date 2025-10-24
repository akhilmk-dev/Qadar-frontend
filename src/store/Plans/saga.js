// planSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_PLANS_REQUEST,
  ADD_PLAN_REQUEST,
  UPDATE_PLAN_REQUEST,
  DELETE_PLAN_REQUEST,
} from './actionTypes';
import {
  fetchPlansSuccess,
  fetchPlansFailure,
  addPlanSuccess,
  addPlanFailure,
  updatePlanSuccess,
  updatePlanFailure,
  deletePlanSuccess,
  deletePlanFailure,
} from './actions';
import axiosInstance from 'pages/Utility/axiosInstance';
import { showSuccess } from 'helpers/notification_helper';

// ================= API calls =================
const fetchPlansApi = async (params) => {
  return await axiosInstance.get('V1/plans', { params });
};

const addPlanApi = async (plan) => {
  return await axiosInstance.post('V1/plans', plan);
};

const updatePlanApi = async ({ id, plan }) => {
  return await axiosInstance.put(`V1/plans/${id}`, plan);
};

const deletePlanApi = async (planId) => {
  return await axiosInstance.delete(`V1/plans/${planId}`);
};

// ================= Sagas =================

// Fetch plans
function* fetchPlansSaga(action) {
  try {
    const response = yield call(fetchPlansApi, action.payload);
    yield put(fetchPlansSuccess(response.data));
  } catch (error) {
    yield put(fetchPlansFailure(error.message));
  }
}

// Add plan
function* addPlanSaga(action) {
  try {
    const response = yield call(addPlanApi, action.payload.plan);
    action.payload.onClose?.();
    yield put(addPlanSuccess(response.data));
    showSuccess('Plan added successfully!');
  } catch (error) {
    yield put(addPlanFailure(error?.response?.data?.errors));
  }
}

// Update plan
function* updatePlanSaga(action) {
  try {
    const response = yield call(updatePlanApi, action.payload);
    yield put(updatePlanSuccess(response.data));
    showSuccess('Plan updated successfully!');
    action.payload.onClose?.();
  } catch (error) {
    yield put(updatePlanFailure(error?.response?.data?.errors));
  }
}

// Delete plan
function* deletePlanSaga(action) {
  try {
    const { data } = yield call(deletePlanApi, action.payload);
    yield put(deletePlanSuccess(data));
    showSuccess('Plan deleted successfully!');
  } catch (error) {
    yield put(deletePlanFailure(error.message));
  }
}

// ================= Watcher =================
export default function* planSaga() {
  yield takeLatest(FETCH_PLANS_REQUEST, fetchPlansSaga);
  yield takeLatest(ADD_PLAN_REQUEST, addPlanSaga);
  yield takeLatest(UPDATE_PLAN_REQUEST, updatePlanSaga);
  yield takeLatest(DELETE_PLAN_REQUEST, deletePlanSaga);
}
