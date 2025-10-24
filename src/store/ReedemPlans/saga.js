// redeemPlanSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_REDEEM_PLANS_REQUEST,
  ADD_REDEEM_PLAN_REQUEST,
  UPDATE_REDEEM_PLAN_REQUEST,
  DELETE_REDEEM_PLAN_REQUEST,
} from "./actionTypes";
import {
  fetchRedeemPlansSuccess,
  fetchRedeemPlansFailure,
  addRedeemPlanSuccess,
  addRedeemPlanFailure,
  updateRedeemPlanSuccess,
  updateRedeemPlanFailure,
  deleteRedeemPlanSuccess,
  deleteRedeemPlanFailure,
} from "./actions";
import axiosInstance from "pages/Utility/axiosInstance";
import { showSuccess } from "helpers/notification_helper";

// ================= API calls =================
const fetchRedeemPlansApi = async (params) => {
  return await axiosInstance.get("V1/redeem-plans", { params });
};

const addRedeemPlanApi = async (plan) => {
  return await axiosInstance.post("V1/redeem-plans", plan);
};

const updateRedeemPlanApi = async ({ id, plan }) => {
  return await axiosInstance.put(`V1/redeem-plans/${id}`, plan);
};

const deleteRedeemPlanApi = async (planId) => {
  return await axiosInstance.delete(`V1/redeem-plans/${planId}`);
};

// ================= Sagas =================

// Fetch redeem plans
function* fetchRedeemPlansSaga(action) {
  try {
    const response = yield call(fetchRedeemPlansApi, action.payload);
    yield put(fetchRedeemPlansSuccess(response.data));
  } catch (error) {
    yield put(fetchRedeemPlansFailure(error.message));
  }
}

// Add redeem plan
function* addRedeemPlanSaga(action) {
  try {
    const response = yield call(addRedeemPlanApi, action.payload.plan);
    action.payload.onClose?.();
    yield put(addRedeemPlanSuccess(response.data));
    showSuccess("Redeem Plan added successfully!");
  } catch (error) {
    yield put(addRedeemPlanFailure(error?.response?.data?.errors));
  }
}

// Update redeem plan
function* updateRedeemPlanSaga(action) {
  try {
    const response = yield call(updateRedeemPlanApi, action.payload);
    yield put(updateRedeemPlanSuccess(response.data));
    showSuccess("Redeem Plan updated successfully!");
    action.payload.onClose?.();
  } catch (error) {
    yield put(updateRedeemPlanFailure(error?.response?.data?.errors));
  }
}

// Delete redeem plan
function* deleteRedeemPlanSaga(action) {
  try {
    const { data } = yield call(deleteRedeemPlanApi, action.payload);
    yield put(deleteRedeemPlanSuccess(data));
    showSuccess("Redeem Plan deleted successfully!");
  } catch (error) {
    yield put(deleteRedeemPlanFailure(error.message));
  }
}

// ================= Watcher =================
export default function* redeemPlanSaga() {
  yield takeLatest(FETCH_REDEEM_PLANS_REQUEST, fetchRedeemPlansSaga);
  yield takeLatest(ADD_REDEEM_PLAN_REQUEST, addRedeemPlanSaga);
  yield takeLatest(UPDATE_REDEEM_PLAN_REQUEST, updateRedeemPlanSaga);
  yield takeLatest(DELETE_REDEEM_PLAN_REQUEST, deleteRedeemPlanSaga);
}
