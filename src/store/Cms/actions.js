import {
   ADD_CMS_REQUEST,
  ADD_CMS_SUCCESS,
  ADD_CMS_FAILURE,
  UPDATE_CMS_REQUEST,
  UPDATE_CMS_SUCCESS,
  UPDATE_CMS_FAILURE,
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


export const addCmsRequest = (cms, onClose) => ({
  type: ADD_CMS_REQUEST,
  payload: { cms, onClose },
});

export const updateCmsRequest = (id, cms, onClose) => ({
  type: UPDATE_CMS_REQUEST,
  payload: { id, cms, onClose },
});