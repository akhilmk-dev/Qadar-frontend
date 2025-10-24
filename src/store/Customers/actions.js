import {
    FETCH_CUSTOMERS_REQUEST,
    FETCH_CUSTOMERS_SUCCESS,
    FETCH_CUSTOMERS_FAILURE,
    ADD_CUSTOMER_REQUEST,
    ADD_CUSTOMER_SUCCESS,
    ADD_CUSTOMER_FAILURE,
    UPDATE_CUSTOMER_REQUEST,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_FAILURE,
    DELETE_CUSTOMER_REQUEST,
    DELETE_CUSTOMER_SUCCESS,
    DELETE_CUSTOMER_FAILURE,
  } from './actionTypes';
  
  // =======================
  // FETCH CUSTOMERS
  // =======================
  export const fetchCustomersRequest = (params) => ({
    type: FETCH_CUSTOMERS_REQUEST,
    payload: params,
  });
  
  export const fetchCustomersSuccess = (customers) => ({
    type: FETCH_CUSTOMERS_SUCCESS,
    payload: customers,
  });
  
  export const fetchCustomersFailure = (error) => ({
    type: FETCH_CUSTOMERS_FAILURE,
    payload: error,
  });
  
  // =======================
  // ADD CUSTOMER
  // =======================
  export const addCustomerRequest = (customer, onClose) => ({
    type: ADD_CUSTOMER_REQUEST,
    payload: { customer, onClose },
  });
  
  export const addCustomerSuccess = (customer) => ({
    type: ADD_CUSTOMER_SUCCESS,
    payload: customer,
  });
  
  export const addCustomerFailure = (error) => ({
    type: ADD_CUSTOMER_FAILURE,
    payload: error,
  });
  
  // =======================
  // UPDATE CUSTOMER
  // =======================
  export const updateCustomerRequest = (id, customer, onClose) => ({
    type: UPDATE_CUSTOMER_REQUEST,
    payload: { id, customer, onClose },
  });
  
  export const updateCustomerSuccess = (customer) => ({
    type: UPDATE_CUSTOMER_SUCCESS,
    payload: customer,
  });
  
  export const updateCustomerFailure = (error) => ({
    type: UPDATE_CUSTOMER_FAILURE,
    payload: error,
  });
  
  // =======================
  // DELETE CUSTOMER
  // =======================
  export const deleteCustomerRequest = (customerId) => ({
    type: DELETE_CUSTOMER_REQUEST,
    payload: customerId,
  });
  
  export const deleteCustomerSuccess = (customerId) => ({
    type: DELETE_CUSTOMER_SUCCESS,
    payload: customerId,
  });
  
  export const deleteCustomerFailure = (error) => ({
    type: DELETE_CUSTOMER_FAILURE,
    payload: error,
  });
  