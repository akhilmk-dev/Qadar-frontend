// SubscriptionList.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import Breadcrumb from 'components/Common/Breadcrumb2';
import SubscriptionTable from './SubscriptionTable';
import CreateSubscription from './CreateSubscription';
import { addSubscriptionRequest } from 'store/actions'; // adjust the import path

const SubscriptionList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const subscriptions = useSelector((state) => state.Subscription.subscriptions);
  const loading = useSelector((state) => state.Subscription.loading);
  const error = useSelector((state) => state.Subscription.error);

  const permissions = JSON.parse(localStorage.getItem('permissions'));
  const hasAddPermission = permissions?.some(
    (item) => item?.permission_name === 'Subscription Add'
  );

  const handleSubmit = (data, onClose) => {
    dispatch(addSubscriptionRequest(data, onClose));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Modal for creating or editing subscriptions */}
      <CreateSubscription
        visible={isOpen}
        onSubmit={handleSubmit}
        handleClose={handleClose}
      />

      <div className="page-content container-fluid">
        {/* Page header */}
        <div className="d-flex justify-content-between align-items-center mx-3">
          <Breadcrumb
            title="Subscriptions"
            breadcrumbItems={[
              { title: 'Dashboard', link: '/dashboard' },
              { title: 'Subscriptions', link: '#' },
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

        {/* Subscription list table */}
        <SubscriptionTable
          subscriptions={subscriptions?.data || []}
          totalrows={subscriptions?.total}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
};

export default SubscriptionList;
