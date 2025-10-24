import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import Breadcrumb from 'components/Common/Breadcrumb2';
import PlanTable from './PlanTable';
import CreatePlan from './CreatePlan';
import { addPlanRequest } from 'store/actions'; // Adjust the import path

const PlanList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const plans = useSelector((state) => state.Plan.plans);
  const loading = useSelector((state) => state.Plan.loading);
  const error = useSelector((state) => state.Plan.error);

  const permissions = JSON.parse(localStorage.getItem('permissions'));
  const hasAddPermission = permissions?.some(
    (item) => item?.permission_name === 'Plan Add'
  );

  const handleSubmit = (data, onClose) => {
    dispatch(addPlanRequest(data, onClose));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Modal for creating or editing plans */}
      <CreatePlan
        visible={isOpen}
        onSubmit={handleSubmit}
        handleClose={handleClose}
      />

      <div className="page-content container-fluid">
        {/* Page header */}
        <div className="d-flex justify-content-between align-items-center mx-3">
          <Breadcrumb
            title="Plans"
            breadcrumbItems={[
              { title: 'Dashboard', link: '/dashboard' },
              { title: 'Plans', link: '#' },
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

        {/* Plan list table */}
        <PlanTable
          plans={plans?.data || []}
          totalrows={plans?.total}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
};

export default PlanList;
