import { call, put, takeEvery } from 'redux-saga/effects';
import {
  FETCH_LEVELS_REQUEST,
  ADD_LEVEL_REQUEST,
  UPDATE_LEVEL_REQUEST,
  DELETE_LEVEL_REQUEST,
} from './actionTypes';
import {
  fetchLevelsSuccess,
  fetchLevelsFailure,
  addLevelSuccess,
  addLevelFailure,
  updateLevelSuccess,
  updateLevelFailure,
  deleteLevelSuccess,
  deleteLevelFailure,
  setLevelFieldErrors,
} from './actions';
import axiosInstance from 'pages/Utility/axiosInstance';
import toast from 'react-hot-toast';
import { showSuccess } from 'helpers/notification_helper';

// API calls
const fetchLevelsApi = (params) => axiosInstance.get('V1/levels',{params});
const addLevelApi = (data) => axiosInstance.post('V1/levels', data);
const updateLevelApi = ({ id, data }) => axiosInstance.put(`V1/levels/${id}`, data);
const deleteLevelApi = (id) => axiosInstance.delete(`V1/levels/${id}`);

// Sagas
function* fetchLevelsSaga(action) {
  try {
    console.log(action.payload)
    const { data } = yield call(fetchLevelsApi,action.payload);
    yield put(fetchLevelsSuccess(data));
  } catch (error) {
    yield put(fetchLevelsFailure(error.response?.data || error.message));
  }
}

function* addLevelSaga(action) {
  try {
    const { data, onClose } = action.payload;
    const response = yield call(addLevelApi, data);
    showSuccess('Level added successfully!');
    onClose();
    yield put(addLevelSuccess(response.data?.data));
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.fieldErrors) {
      yield put(setLevelFieldErrors(error.response.data.fieldErrors));
    } else {
      yield put(addLevelFailure(error.response?.data || error.message));
    }
  }
}

function* updateLevelSaga(action) {
  try {
    const { id, data, onClose } = action.payload;
    const response = yield call(updateLevelApi, { id, data });
    onClose();
    showSuccess('Level updated successfully!');
    yield put(updateLevelSuccess(response.data?.data));
    
  } catch (error) {
    if (error.response?.status === 400 && error.response?.data?.fieldErrors) {
      yield put(setLevelFieldErrors(error.response.data.fieldErrors));
    } else {
      yield put(updateLevelFailure(error.response?.data || error.message));
    }
  }
}

function* deleteLevelSaga(action) {
  try {
    const response = yield call(deleteLevelApi, action.payload);
    yield put(deleteLevelSuccess(response.data)); // deleted level object
    toast.success('Level deleted successfully!');
  } catch (error) {
    yield put(deleteLevelFailure(error.response?.data || error.message));
  }
}

// Watcher saga
function* levelSaga() {
  yield takeEvery(FETCH_LEVELS_REQUEST, fetchLevelsSaga);
  yield takeEvery(ADD_LEVEL_REQUEST, addLevelSaga);
  yield takeEvery(UPDATE_LEVEL_REQUEST, updateLevelSaga);
  yield takeEvery(DELETE_LEVEL_REQUEST,deleteLevelSaga);
}

export default levelSaga;