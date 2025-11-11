import {
  FETCH_CMS_REQUEST,
  FETCH_CMS_SUCCESS,
  FETCH_CMS_FAILURE,
} from "./actionTypes";

export const fetchCmsRequest = (params) => ({
  type: FETCH_CMS_REQUEST,
  payload: params,
});

export const fetchCmsSuccess = (data) => ({
  type: FETCH_CMS_SUCCESS,
  payload: data,
});

export const fetchCmsFailure = (error) => ({
  type: FETCH_CMS_FAILURE,
  payload: error,
});
