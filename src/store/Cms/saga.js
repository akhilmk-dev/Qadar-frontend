import { call, put, takeLatest } from "redux-saga/effects";
import axiosInstance from "pages/Utility/axiosInstance";
import {
  FETCH_CMS_REQUEST,
} from "./actionTypes";
import {
  fetchCmsSuccess,
  fetchCmsFailure,
} from "./actions";

// API
const fetchCmsApi = async (params) => {
  return await axiosInstance.get("V1/cmspages", { params });
};

// Saga
function* fetchCmsSaga(action) {
  try {
    const response = yield call(fetchCmsApi, action.payload);
    yield put(fetchCmsSuccess(response.data));
  } catch (error) {
    yield put(fetchCmsFailure(error.message));
  }
}

export default function* cmsSaga() {
  yield takeLatest(FETCH_CMS_REQUEST, fetchCmsSaga);
}
