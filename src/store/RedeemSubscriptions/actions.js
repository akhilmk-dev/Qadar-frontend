// redeemSubscriptionActions.js
import {
    FETCH_REDEEM_SUBSCRIPTIONS_REQUEST,
    FETCH_REDEEM_SUBSCRIPTIONS_SUCCESS,
    FETCH_REDEEM_SUBSCRIPTIONS_FAILURE,
    ADD_REDEEM_SUBSCRIPTION_REQUEST,
    ADD_REDEEM_SUBSCRIPTION_SUCCESS,
    ADD_REDEEM_SUBSCRIPTION_FAILURE,
    UPDATE_REDEEM_SUBSCRIPTION_REQUEST,
    UPDATE_REDEEM_SUBSCRIPTION_SUCCESS,
    UPDATE_REDEEM_SUBSCRIPTION_FAILURE,
    DELETE_REDEEM_SUBSCRIPTION_REQUEST,
    DELETE_REDEEM_SUBSCRIPTION_SUCCESS,
    DELETE_REDEEM_SUBSCRIPTION_FAILURE,
  } from "./actionTypes"; // adjust the import path
  
  // ================= Fetch redeem subscriptions =================
  export const fetchRedeemSubscriptionsRequest = (data) => ({
    type: FETCH_REDEEM_SUBSCRIPTIONS_REQUEST,
    payload: data,
  });
  
  export const fetchRedeemSubscriptionsSuccess = (redeemSubscriptions) => ({
    type: FETCH_REDEEM_SUBSCRIPTIONS_SUCCESS,
    payload: redeemSubscriptions,
  });
  
  export const fetchRedeemSubscriptionsFailure = (error) => ({
    type: FETCH_REDEEM_SUBSCRIPTIONS_FAILURE,
    payload: error,
  });
  
  // ================= Add redeem subscription =================
  export const addRedeemSubscriptionRequest = (redeemSubscription, onClose) => ({
    type: ADD_REDEEM_SUBSCRIPTION_REQUEST,
    payload: { redeemSubscription, onClose },
  });
  
  export const addRedeemSubscriptionSuccess = (redeemSubscription) => ({
    type: ADD_REDEEM_SUBSCRIPTION_SUCCESS,
    payload: redeemSubscription,
  });
  
  export const addRedeemSubscriptionFailure = (error) => ({
    type: ADD_REDEEM_SUBSCRIPTION_FAILURE,
    payload: error,
  });
  
  // ================= Update redeem subscription =================
  export const updateRedeemSubscriptionRequest = (id, redeemSubscription, onClose) => ({
    type: UPDATE_REDEEM_SUBSCRIPTION_REQUEST,
    payload: { id, redeemSubscription, onClose },
  });
  
  export const updateRedeemSubscriptionSuccess = (redeemSubscription) => ({
    type: UPDATE_REDEEM_SUBSCRIPTION_SUCCESS,
    payload: redeemSubscription,
  });
  
  export const updateRedeemSubscriptionFailure = (error) => ({
    type: UPDATE_REDEEM_SUBSCRIPTION_FAILURE,
    payload: error,
  });
  
  // ================= Delete redeem subscription =================
  export const deleteRedeemSubscriptionRequest = (redeemSubscriptionId) => ({
    type: DELETE_REDEEM_SUBSCRIPTION_REQUEST,
    payload: redeemSubscriptionId,
  });
  
  export const deleteRedeemSubscriptionSuccess = (redeemSubscriptionId) => ({
    type: DELETE_REDEEM_SUBSCRIPTION_SUCCESS,
    payload: redeemSubscriptionId,
  });
  
  export const deleteRedeemSubscriptionFailure = (error) => ({
    type: DELETE_REDEEM_SUBSCRIPTION_FAILURE,
    payload: error,
  });
  