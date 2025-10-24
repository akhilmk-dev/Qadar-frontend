import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'reactstrap';
import Breadcrumb from 'components/Common/Breadcrumb2';
import AffirmationTable from './AffirmationTable';
import CreateAffirmation from './CreateAffirmation';
import { addAffirmationRequest, fetchMoodsRequest } from 'store/actions'; 

const AffirmationList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [moodOptions, setMoodOptions] = useState([]);
  const dispatch = useDispatch();

  const affirmations = useSelector((state) => state.Affirmation.affirmations);
  const loading = useSelector((state) => state.Affirmation.loading);
  const error = useSelector((state) => state.Affirmation.error);

  const moods = useSelector((state) => state.Mood.moods?.data || []);

  // Permissions
  const permissions = JSON.parse(localStorage.getItem('permissions'));
  const hasAddPermission = permissions?.some(
    (item) => item?.permission_name === 'Affirmation Add'
  );

  // Convert moods to react-select options
  useEffect(() => {
    if (moods) {
      const options = moods.map((m) => ({
        value: m._id,
        label: m.mood_name,
      }));
      setMoodOptions(options);
    }
  }, [moods]);

  // Fetch moods for select dropdown
  useEffect(() => {
    dispatch(fetchMoodsRequest());
  }, [dispatch]);

  const handleSubmit = (data, onClose) => {
    dispatch(addAffirmationRequest(data, onClose));
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Modal for creating or editing affirmations */}
      <CreateAffirmation
        visible={isOpen}
        onSubmit={handleSubmit}
        handleClose={handleClose}
        moodOptions={moodOptions}
      />

      <div className="page-content container-fluid">
        {/* Page header */}
        <div className="d-flex justify-content-between align-items-center mx-3">
          <Breadcrumb
            title="Affirmations"
            breadcrumbItems={[
              { title: 'Dashboard', link: '/dashboard' },
              { title: 'Affirmations', link: '#' },
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

        {/* Affirmation list table */}
        <AffirmationTable
          affirmations={affirmations?.data || []}
          totalrows={affirmations?.total}
          loading={loading}
          error={error}
          moodOptions={moodOptions}
        />
      </div>
    </>
  );
};

export default AffirmationList;
