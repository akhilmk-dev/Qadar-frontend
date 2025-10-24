// categoryPlanSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_CATEGORY_PLANS_REQUEST,
  ADD_CATEGORY_PLAN_REQUEST,
  UPDATE_CATEGORY_PLAN_REQUEST,
  DELETE_CATEGORY_PLAN_REQUEST,
} from "./actionTypes";
import {
  fetchCategoryPlansSuccess,
  fetchCategoryPlansFailure,
  addCategoryPlanSuccess,
  addCategoryPlanFailure,
  updateCategoryPlanSuccess,
  updateCategoryPlanFailure,
  deleteCategoryPlanSuccess,
  deleteCategoryPlanFailure,
} from "./actions";
import axiosInstance from "pages/Utility/axiosInstance";
import { showSuccess } from "helpers/notification_helper";

// ================= API calls =================
const fetchCategoryPlansApi = async (params) => {
  return await axiosInstance.get("V1/categorie-plans", { params });
};

const addCategoryPlanApi = async (categoryPlan) => {
  return await axiosInstance.post("V1/categorie-plans", categoryPlan);
};

const updateCategoryPlanApi = async ({ id, categoryPlan }) => {
  return await axiosInstance.put(`V1/categorie-plans/${id}`, categoryPlan);
};

const deleteCategoryPlanApi = async (categoryPlanId) => {
  return await axiosInstance.delete(`V1/categorie-plans/${categoryPlanId}`);
};

// ================= Sagas =================

// Fetch category plans
function* fetchCategoryPlansSaga(action) {
  try {
    const response = yield call(fetchCategoryPlansApi, action.payload);
    yield put(fetchCategoryPlansSuccess(response.data));
  } catch (error) {
    yield put(fetchCategoryPlansFailure(error.message));
  }
}

// Add category plan
function* addCategoryPlanSaga(action) {
  try {
    const response = yield call(addCategoryPlanApi, action.payload.categoryPlan);
    action.payload.onClose();
    yield put(addCategoryPlanSuccess(response.data));
    showSuccess("Category Plan added successfully!");
  } catch (error) {
    yield put(addCategoryPlanFailure(error?.response?.data?.errors));
  }
}

// Update category plan
function* updateCategoryPlanSaga(action) {
  try {
    const response = yield call(updateCategoryPlanApi, action.payload);
    yield put(updateCategoryPlanSuccess(response.data));
    showSuccess("Category Plan updated successfully!");
    action.payload.onClose();
  } catch (error) {
    yield put(updateCategoryPlanFailure(error?.response?.data?.errors));
  }
}

// Delete category plan
function* deleteCategoryPlanSaga(action) {
  try {
    const { data } = yield call(deleteCategoryPlanApi, action.payload);
    yield put(deleteCategoryPlanSuccess(data));
    showSuccess("Category Plan deleted successfully!");
  } catch (error) {
    yield put(deleteCategoryPlanFailure(error.message));
  }
}

// ================= Watcher =================
export default function* categoryPlanSaga() {
  yield takeLatest(FETCH_CATEGORY_PLANS_REQUEST, fetchCategoryPlansSaga);
  yield takeLatest(ADD_CATEGORY_PLAN_REQUEST, addCategoryPlanSaga);
  yield takeLatest(UPDATE_CATEGORY_PLAN_REQUEST, updateCategoryPlanSaga);
  yield takeLatest(DELETE_CATEGORY_PLAN_REQUEST, deleteCategoryPlanSaga);
}
