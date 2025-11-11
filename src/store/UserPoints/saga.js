// userXPSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_USER_XP_POINTS_REQUEST,
} from "./actionTypes"; // adjust path if needed
import {
  fetchUserXPPointsSuccess,
  fetchUserXPPointsFailure,
} from "./actions"; // adjust path
import axiosInstance from "pages/Utility/axiosInstance";

// ================= API call =================
const fetchUserXPPointsApi = async (params) => {
  return await axiosInstance.get("V1/users/user-points/list", { params });
};

// ================= Worker Saga =================
function* fetchUserXPPointsSaga(action) {
  try {
    const response = yield call(fetchUserXPPointsApi, action.payload);
    yield put(fetchUserXPPointsSuccess(response.data));
  } catch (error) {
    yield put(fetchUserXPPointsFailure(error.message || "Failed to fetch XP points"));
  }
}

// ================= Watcher Saga =================
export default function* userXPSaga() {
  yield takeLatest(FETCH_USER_XP_POINTS_REQUEST, fetchUserXPPointsSaga);
}
