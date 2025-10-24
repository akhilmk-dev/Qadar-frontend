// RedeemSubscriptionList.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import Breadcrumb from 'components/Common/Breadcrumb2';
import RedeemSubscriptionTable from './RedeemSubscriptionTable';
import CreateRedeemSubscription from './CreateRedeemSubscription';
import { addRedeemSubscriptionRequest } from 'store/actions'; // adjust the import path

const RedeemSubscriptionList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const redeemSubscriptions = useSelector(
    (state) => state.RedeemSubscription.redeemSubscriptions
  );
  const loading = useSelector((state) => state.RedeemSubscription.loading);
  const error = useSelector((state) => state.RedeemSubscription.error);

  const permissions = JSON.parse(localStorage.getItem('permissions'));
  const hasAddPermission = permissions?.some(
    (item) => item?.permission_name === 'Redeem Subscription Add'
  );

  const handleSubmit = (data, onClose) => {
    dispatch(addRedeemSubscriptionRequest(data, onClose));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Modal for creating or editing redeem subscriptions */}
      <CreateRedeemSubscription
        visible={isOpen}
        onSubmit={handleSubmit}
        handleClose={handleClose}
      />

      <div className="page-content container-fluid">
        {/* Page header */}
        <div className="d-flex justify-content-between align-items-center mx-3">
          <Breadcrumb
            title="Redeem Subscriptions"
            breadcrumbItems={[
              { title: 'Dashboard', link: '/dashboard' },
              { title: 'Redeem Subscriptions', link: '#' },
            ]}
          />

          {/* {hasAddPermission && (
            <Button
              className="bg-primary text-white d-flex justify-content-center gap-1 align-items-center"
              onClick={() => setIsOpen(true)}
            >
              <i className="ti-plus"></i> Add New
            </Button>
          )} */}
        </div>

        {/* Redeem subscription list table */}
        <RedeemSubscriptionTable
          redeemSubscriptions={redeemSubscriptions?.data || []}
          totalrows={redeemSubscriptions?.total}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
};

export default RedeemSubscriptionList;
