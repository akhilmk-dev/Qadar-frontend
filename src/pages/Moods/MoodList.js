import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import {  addMoodRequest } from 'store/actions'; // adjust import paths
import Breadcrumb from 'components/Common/Breadcrumb2';
import MoodTable from './MoodTable';
import CreateMood from './CreateMood';

const MoodList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const moods = useSelector((state) => state.Mood.moods);
  const loading = useSelector((state) => state.Mood.loading);
  const error = useSelector((state) => state.Mood.error);

  const permissions = JSON.parse(localStorage.getItem('permissions'));
  const hasAddPermission = permissions?.some(
    (item) => item?.permission_name === 'Mood Add'
  );

  const handleSubmit = (data, onClose) => {
    dispatch(addMoodRequest(data, onClose));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Modal for creating or editing moods */}
      <CreateMood
        visible={isOpen}
        onSubmit={handleSubmit}
        handleClose={handleClose}
      />

      <div className="page-content container-fluid">
        {/* Page header */}
        <div className="d-flex justify-content-between align-items-center mx-3">
          <Breadcrumb
            title="Moods"
            breadcrumbItems={[
              { title: 'Dashboard', link: '/dashboard' },
              { title: 'Moods', link: '#' },
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

        {/* Mood list table */}
        <MoodTable
          moods={moods?.data || []}
          totalrows={moods?.total}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
};

export default MoodList;
