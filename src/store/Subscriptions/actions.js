// subscriptionActions.js
import {
    FETCH_SUBSCRIPTIONS_REQUEST,
    FETCH_SUBSCRIPTIONS_SUCCESS,
    FETCH_SUBSCRIPTIONS_FAILURE,
    ADD_SUBSCRIPTION_REQUEST,
    ADD_SUBSCRIPTION_SUCCESS,
    ADD_SUBSCRIPTION_FAILURE,
    UPDATE_SUBSCRIPTION_REQUEST,
    UPDATE_SUBSCRIPTION_SUCCESS,
    UPDATE_SUBSCRIPTION_FAILURE,
    DELETE_SUBSCRIPTION_REQUEST,
    DELETE_SUBSCRIPTION_SUCCESS,
    DELETE_SUBSCRIPTION_FAILURE,
  } from "./actionTypes"; // adjust the import path
  
  // ================= Fetch subscriptions =================
  export const fetchSubscriptionsRequest = (data) => ({
    type: FETCH_SUBSCRIPTIONS_REQUEST,
    payload: data,
  });
  
  export const fetchSubscriptionsSuccess = (subscriptions) => ({
    type: FETCH_SUBSCRIPTIONS_SUCCESS,
    payload: subscriptions,
  });
  
  export const fetchSubscriptionsFailure = (error) => ({
    type: FETCH_SUBSCRIPTIONS_FAILURE,
    payload: error,
  });
  
  // ================= Add subscription =================
  export const addSubscriptionRequest = (subscription, onClose) => ({
    type: ADD_SUBSCRIPTION_REQUEST,
    payload: { subscription, onClose },
  });
  
  export const addSubscriptionSuccess = (subscription) => ({
    type: ADD_SUBSCRIPTION_SUCCESS,
    payload: subscription,
  });
  
  export const addSubscriptionFailure = (error) => ({
    type: ADD_SUBSCRIPTION_FAILURE,
    payload: error,
  });
  
  // ================= Update subscription =================
  export const updateSubscriptionRequest = (id, subscription, onClose) => ({
    type: UPDATE_SUBSCRIPTION_REQUEST,
    payload: { id, subscription, onClose },
  });
  
  export const updateSubscriptionSuccess = (subscription) => ({
    type: UPDATE_SUBSCRIPTION_SUCCESS,
    payload: subscription,
  });
  
  export const updateSubscriptionFailure = (error) => ({
    type: UPDATE_SUBSCRIPTION_FAILURE,
    payload: error,
  });
  
  // ================= Delete subscription =================
  export const deleteSubscriptionRequest = (subscriptionId) => ({
    type: DELETE_SUBSCRIPTION_REQUEST,
    payload: subscriptionId,
  });
  
  export const deleteSubscriptionSuccess = (subscriptionId) => ({
    type: DELETE_SUBSCRIPTION_SUCCESS,
    payload: subscriptionId,
  });
  
  export const deleteSubscriptionFailure = (error) => ({
    type: DELETE_SUBSCRIPTION_FAILURE,
    payload: error,
  });
  