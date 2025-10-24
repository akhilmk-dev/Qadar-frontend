import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import Breadcrumb from 'components/Common/Breadcrumb2';
import ReedemPlanTable from './ReedemPlanTable';
import CreateReedemPlan from './CreateReedemPlan';
import { addRedeemPlanRequest } from 'store/actions';


const ReedemPlanList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const reedemPlans = useSelector((state) => state.ReedemPlan.redeemPlans);
  const loading = useSelector((state) => state.ReedemPlan.loading);
  const error = useSelector((state) => state.ReedemPlan.error);

  const permissions = JSON.parse(localStorage.getItem('permissions'));
  const hasAddPermission = permissions?.some(
    (item) => item?.permission_name === 'Redeem Plan Add'
  );

  const handleSubmit = (data, onClose) => {
    dispatch(addRedeemPlanRequest(data, onClose));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Modal for creating or editing reedem plans */}
      <CreateReedemPlan
        visible={isOpen}
        onSubmit={handleSubmit}
        handleClose={handleClose}
      />

      <div className="page-content container-fluid">
        {/* Page header */}
        <div className="d-flex justify-content-between align-items-center mx-3">
          <Breadcrumb
            title="Reedem Plans"
            breadcrumbItems={[
              { title: 'Dashboard', link: '/dashboard' },
              { title: 'Reedem Plans', link: '#' },
            ]}
          />

          {hasAddPermission && (
            <Button
              className="bg-primary text-white d-flex justify-content-center gap-1 align-items-center"
              onClick={() => setIsOpen(true)}
            >
              <i className="ti-plus"></i> Add New
            </Button>
          )}
        </div>

        {/* Reedem Plan list table */}
        <ReedemPlanTable
          plans={reedemPlans?.data || []}
          totalrows={reedemPlans?.total}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
};

export default ReedemPlanList;
