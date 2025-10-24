import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_RITUALS_REQUEST,
  ADD_RITUAL_REQUEST,
  UPDATE_RITUAL_REQUEST,
  DELETE_RITUAL_REQUEST,
} from "./actionTypes";
import {
  fetchRitualsSuccess,
  fetchRitualsFailure,
  addRitualSuccess,
  addRitualFailure,
  updateRitualSuccess,
  updateRitualFailure,
  deleteRitualSuccess,
  deleteRitualFailure,
} from "./actions";
import axiosInstance from "pages/Utility/axiosInstance";
import { showSuccess } from "helpers/notification_helper";

// --- API calls ---
const fetchRitualsApi = async (params) => {
  return await axiosInstance.get("V1/rituals", { params });
};

const addRitualApi = async (ritual) => {
  return await axiosInstance.post("V1/rituals", ritual);
};

const updateRitualApi = async ({ id, ritual }) => {
  return await axiosInstance.put(`V1/rituals/${id}`, ritual);
};

const deleteRitualApi = async (ritualId) => {
  return await axiosInstance.delete(`V1/rituals/${ritualId}`);
};

// --- Sagas ---

// Fetch rituals
function* fetchRitualsSaga(action) {
  try {
    const response = yield call(fetchRitualsApi, action.payload);
    yield put(fetchRitualsSuccess(response.data));
  } catch (error) {
    yield put(fetchRitualsFailure(error.message));
  }
}

// Add ritual
function* addRitualSaga(action) {
  try {
    const response = yield call(addRitualApi, action.payload.ritual);
    if (action.payload.onClose) action.payload.onClose();
    yield put(addRitualSuccess(response.data));
    showSuccess("Ritual added successfully!");
  } catch (error) {
    yield put(addRitualFailure(error?.response?.data?.errors || error.message));
  }
}

// Update ritual
function* updateRitualSaga(action) {
  try {
    const response = yield call(updateRitualApi, action.payload);
    if (action.payload.onClose) action.payload.onClose();
    yield put(updateRitualSuccess(response.data));
    showSuccess(response?.data?.message || "Ritual updated successfully!");
  } catch (error) {
    yield put(updateRitualFailure(error?.response?.data?.errors || error.message));
  }
}

// Delete ritual
function* deleteRitualSaga(action) {
  try {
    const { data } = yield call(deleteRitualApi, action.payload);
    yield put(deleteRitualSuccess(data));
    showSuccess("Ritual deleted successfully!");
  } catch (error) {
    yield put(deleteRitualFailure(error.message));
  }
}

// Watcher saga
export default function* ritualSaga() {
  yield takeLatest(FETCH_RITUALS_REQUEST, fetchRitualsSaga);
  yield takeLatest(ADD_RITUAL_REQUEST, addRitualSaga);
  yield takeLatest(UPDATE_RITUAL_REQUEST, updateRitualSaga);
  yield takeLatest(DELETE_RITUAL_REQUEST, deleteRitualSaga);
}
