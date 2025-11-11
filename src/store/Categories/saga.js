// categorySaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_CATEGORIES_REQUEST,
  ADD_CATEGORY_REQUEST,
  UPDATE_CATEGORY_REQUEST,
  DELETE_CATEGORY_REQUEST,
} from './actionTypes';
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
  addCategorySuccess,
  addCategoryFailure,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategorySuccess,
  deleteCategoryFailure,
} from './actions';
import axiosInstance from 'pages/Utility/axiosInstance';
import { showSuccess } from 'helpers/notification_helper';
import toast from 'react-hot-toast';

// API calls
const fetchCategoriesApi = async (params) => {
  return await axiosInstance.get('V1/categories', { params });
};

const addCategoryApi = async (category) => {
  return await axiosInstance.post('V1/categories', category);
};

const updateCategoryApi = async ({ id, category }) => {
  return await axiosInstance.put(`V1/categories/${id}`, category);
};

const deleteCategoryApi = async (categoryId) => {
  return await axiosInstance.delete(`V1/categories/${categoryId}`);
};

// Fetch categories
function* fetchCategoriesSaga(action) {
  try {
    const response = yield call(fetchCategoriesApi, action.payload);
    yield put(fetchCategoriesSuccess(response.data));
  } catch (error) {
    yield put(fetchCategoriesFailure(error.message));
  }
}

// Add category
function* addCategorySaga(action) {
  try {
    const response = yield call(addCategoryApi, action.payload.category);
    action.payload.onClose();
    yield put(addCategorySuccess(response.data));
    showSuccess('Category added successfully!');
  } catch (error) {
    yield put(addCategoryFailure(error?.response?.data?.errors));
  }
}

// Update category
function* updateCategorySaga(action) {
  try {
    const response = yield call(updateCategoryApi, action.payload);
    showSuccess("Category updated successfully");
    action.payload.onClose();
    yield put(updateCategorySuccess(response?.data));
  } catch (error) {
    yield put(updateCategoryFailure(error?.response?.data?.errors));
  }
}

// Delete category
function* deleteCategorySaga(action) {
  try {
    const { data } = yield call(deleteCategoryApi, action.payload);
    yield put(deleteCategorySuccess(data));
    showSuccess('Category deleted successfully!');
  } catch (error) {
    yield put(deleteCategoryFailure(error.message));
  }
}

// Watcher saga
export default function* categorySaga() {
  yield takeLatest(FETCH_CATEGORIES_REQUEST, fetchCategoriesSaga);
  yield takeLatest(ADD_CATEGORY_REQUEST, addCategorySaga);
  yield takeLatest(UPDATE_CATEGORY_REQUEST, updateCategorySaga);
  yield takeLatest(DELETE_CATEGORY_REQUEST, deleteCategorySaga);
}
