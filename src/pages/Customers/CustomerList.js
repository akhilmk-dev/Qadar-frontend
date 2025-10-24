import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button } from 'reactstrap';
import { addCustomerRequest, fetchCustomersRequest } from 'store/actions';
import CreateCustomer from './CreateCustomer';
import Breadcrumb from 'components/Common/Breadcrumb2';
import CustomerTable from './CustomerTable';
import Cookies from 'js-cookie';

const CustomerList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.Customer.customers);
  const loading = useSelector((state) => state.Customer.loading);
  const error = useSelector((state) => state.Customer.error);
  const permissions  =  JSON.parse(localStorage.getItem('permissions'));
  
  const hasAddPermission = permissions?.some(item=> item?.permission_name == "Customer Add")

  const handleSubmit = (data, onClose) => {
    dispatch(addCustomerRequest(data, onClose));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Modal for create/edit customer */}
      <CreateCustomer
        visible={isOpen}
        onSubmit={handleSubmit}
        handleClose={handleClose}
      />

      <div className="page-content container-fluid">
        {/* Page header */}
        <div className="d-flex justify-content-between align-items-center mx-3">
          <Breadcrumb
            title="Customers"
            breadcrumbItems={[
              { title: 'Dashboard', link: '/dashboard' },
              { title: 'Customers', link: '#' }
            ]}
          />
      {/* {hasAddPermission && <Button
            className="bg-primary text-white d-flex justify-content-center gap-1 align-items-center"
            onClick={() => setIsOpen(true)}
          >
            <i className="ti-plus"></i> Add New
          </Button>} */}
        </div>

        {/* Customer list table */}
        <CustomerTable
          customers={customers?.data || []}
          totalrows={customers?.total}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
};

export default CustomerList;
