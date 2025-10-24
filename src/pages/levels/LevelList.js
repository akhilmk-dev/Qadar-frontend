import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row, Button } from 'reactstrap';
import { addLevelRequest, fetchLevelsRequest } from 'store/actions';
import CreateLevel from './CreateLevel';
import Breadcrumb from 'components/Common/Breadcrumb2';
import LevelTable from './LevelTable';
import Cookies from 'js-cookie';

const LevelList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const levels = useSelector((state) => state.Level.levels);
  const loading = useSelector((state) => state.Level.loading);
  const error = useSelector((state) => state.Level.error);

  const permissions = JSON.parse(localStorage.getItem('permissions'));
  const hasAddPermission = permissions?.some(
    (item) => item?.permission_name === 'Add level'
  );


  const handleSubmit = (data, onClose) => {
    dispatch(addLevelRequest(data, onClose));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Modal for create/edit level */}
      <CreateLevel visible={isOpen} onSubmit={handleSubmit} handleClose={handleClose} />

      <div className="page-content container-fluid">
        {/* Page header */}
        <div className="d-flex justify-content-between align-items-center mx-3">
          <Breadcrumb
            title="Levels"
            breadcrumbItems={[
              { title: 'Dashboard', link: '/dashboard' },
              { title: 'Levels', link: '#' },
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

        {/* Level list table */}
        <LevelTable
          levels={levels?.data || []}
          totalrows={levels?.total}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
};

export default LevelList;
