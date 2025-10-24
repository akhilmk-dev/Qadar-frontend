// affirmationSaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  FETCH_AFFIRMATIONS_REQUEST,
  ADD_AFFIRMATION_REQUEST,
  UPDATE_AFFIRMATION_REQUEST,
  DELETE_AFFIRMATION_REQUEST,
} from './actionTypes';
import {
  fetchAffirmationsSuccess,
  fetchAffirmationsFailure,
  addAffirmationSuccess,
  addAffirmationFailure,
  updateAffirmationSuccess,
  updateAffirmationFailure,
  deleteAffirmationSuccess,
  deleteAffirmationFailure,
} from './actions';
import axiosInstance from 'pages/Utility/axiosInstance';
import { showSuccess } from 'helpers/notification_helper';

// API calls
const fetchAffirmationsApi = async (params) => {
  return await axiosInstance.get('V1/affirmations', { params });
};

const addAffirmationApi = async (affirmation) => {
  return await axiosInstance.post('V1/affirmations', affirmation);
};

const updateAffirmationApi = async ({ id, affirmation }) => {
  return await axiosInstance.put(`V1/affirmations/${id}`, affirmation);
};

const deleteAffirmationApi = async (id) => {
  return await axiosInstance.delete(`V1/affirmations/${id}`);
};

// Fetch affirmations
function* fetchAffirmationsSaga(action) {
  try {
    const response = yield call(fetchAffirmationsApi, action.payload);
    yield put(fetchAffirmationsSuccess(response.data));
  } catch (error) {
    yield put(fetchAffirmationsFailure(error.message));
  }
}

// Add affirmation
function* addAffirmationSaga(action) {
  try {
    const response = yield call(addAffirmationApi, action.payload.affirmation);
    action.payload.onClose();
    yield put(addAffirmationSuccess(response.data));
    showSuccess('Affirmation added successfully!');
  } catch (error) {
    yield put(addAffirmationFailure(error?.response?.data?.errors));
  }
}

// Update affirmation
function* updateAffirmationSaga(action) {
  try {
    const response = yield call(updateAffirmationApi, action.payload);
    yield put(updateAffirmationSuccess(response.data));
    showSuccess("Affirmation updated successfully");
    action.payload.onClose();
  } catch (error) {
    yield put(updateAffirmationFailure(error?.response?.data?.errors));
  }
}

// Delete affirmation
function* deleteAffirmationSaga(action) {
  try {
    const { data } = yield call(deleteAffirmationApi, action.payload);
    yield put(deleteAffirmationSuccess(data));
    showSuccess('Affirmation deleted successfully!');
  } catch (error) {
    yield put(deleteAffirmationFailure(error.message));
  }
}

// Watcher saga
export default function* affirmationSaga() {
  yield takeLatest(FETCH_AFFIRMATIONS_REQUEST, fetchAffirmationsSaga);
  yield takeLatest(ADD_AFFIRMATION_REQUEST, addAffirmationSaga);
  yield takeLatest(UPDATE_AFFIRMATION_REQUEST, updateAffirmationSaga);
  yield takeLatest(DELETE_AFFIRMATION_REQUEST, deleteAffirmationSaga);
}
