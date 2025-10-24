// moodSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_MOODS_REQUEST,
  ADD_MOOD_REQUEST,
  UPDATE_MOOD_REQUEST,
  DELETE_MOOD_REQUEST,
} from './actionTypes';
import {
  fetchMoodsSuccess,
  fetchMoodsFailure,
  addMoodSuccess,
  addMoodFailure,
  updateMoodSuccess,
  updateMoodFailure,
  deleteMoodSuccess,
  deleteMoodFailure,
} from './actions';
import axiosInstance from 'pages/Utility/axiosInstance';
import { showSuccess } from 'helpers/notification_helper';
import toast from 'react-hot-toast';

// API calls
const fetchMoodsApi = async (params) => {
  return await axiosInstance.get('V1/moods', { params });
};

const addMoodApi = async (mood) => {
  return await axiosInstance.post('V1/moods', mood);
};

const updateMoodApi = async ({ id, mood }) => {
  return await axiosInstance.put(`V1/moods/${id}`, mood);
};

const deleteMoodApi = async (moodId) => {
  return await axiosInstance.delete(`V1/moods/${moodId}`);
};

// Fetch moods
function* fetchMoodsSaga(action) {
  try {
    const response = yield call(fetchMoodsApi, action.payload);
    yield put(fetchMoodsSuccess(response.data));
  } catch (error) {
    yield put(fetchMoodsFailure(error.message));
  }
}

// Add mood
function* addMoodSaga(action) {
  try {
    const response = yield call(addMoodApi, action.payload.mood);
    action.payload.onClose();
    yield put(addMoodSuccess(response.data));
    showSuccess('Mood added successfully!');
  } catch (error) {
    yield put(addMoodFailure(error?.response?.data?.errors));
  }
}

// Update mood
function* updateMoodSaga(action) {
  try {
    const response = yield call(updateMoodApi, action.payload);
    yield put(updateMoodSuccess(response.data));
    showSuccess("Mood updated successfully");
    action.payload.onClose();
  } catch (error) {
    yield put(updateMoodFailure(error?.response?.data?.errors));
  }
}

// Delete mood
function* deleteMoodSaga(action) {
  try {
    const { data } = yield call(deleteMoodApi, action.payload);
    yield put(deleteMoodSuccess(data));
    showSuccess('Mood deleted successfully!');
  } catch (error) {
    yield put(deleteMoodFailure(error.message));
  }
}

// Watcher saga
export default function* moodSaga() {
  yield takeLatest(FETCH_MOODS_REQUEST, fetchMoodsSaga);
  yield takeLatest(ADD_MOOD_REQUEST, addMoodSaga);
  yield takeLatest(UPDATE_MOOD_REQUEST, updateMoodSaga);
  yield takeLatest(DELETE_MOOD_REQUEST, deleteMoodSaga);
}
