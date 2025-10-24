// userTokenSaga.js
import { call, put, takeLatest } from "redux-saga/effects";
import {
  FETCH_USER_TOKENS_REQUEST,
} from "./actionTypes";
import {
  fetchUserTokensSuccess,
  fetchUserTokensFailure,
} from "./actions";
import axiosInstance from "pages/Utility/axiosInstance";
import { showSuccess } from "helpers/notification_helper";

// ================= API calls =================
const fetchUserTokensApi = async (params) => {
  return await axiosInstance.get("V1/users/user-tokens/list", { params });
};

// ================= Sagas =================

// Fetch user tokens
function* fetchUserTokensSaga(action) {
  try {
    const response = yield call(fetchUserTokensApi, action.payload);
    yield put(fetchUserTokensSuccess(response.data));
  } catch (error) {
    yield put(fetchUserTokensFailure(error.message));
  }
}

// ================= Watcher =================
export default function* userTokenSaga() {
  yield takeLatest(FETCH_USER_TOKENS_REQUEST, fetchUserTokensSaga);
}
