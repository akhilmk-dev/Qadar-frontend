import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import Select from 'react-select';

const CreateReward = ({ visible, handleClose, initialData = '', onSubmit, levels }) => {
  const [badgePreview, setBadgePreview] = useState(null);
  const error = useSelector(state => state.Reward.error);
  const loading = useSelector(state => state.Reward.loading);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      reward_name: initialData?.reward_name || '',
      level_Id: initialData?.level_Id?._id || '',
      badge_image: '', // base64 string will go here
    },
    validationSchema: Yup.object({
      reward_name: Yup.string().required('Reward name is required'),
      level_Id: Yup.string().required('Level is required'),
      badge_image: initialData ? Yup.mixed() : Yup.mixed().required('Badge image is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload = {
        reward_name: values.reward_name,
        level_Id: values.level_Id,
        badge_image: values.badge_image || null, // null means keep old
      };

      if (initialData) {
        onSubmit(initialData._id, payload, onClose);
      } else {
        onSubmit(payload, onClose);
      }
    }
  });

  const onClose = () => {
    formik.resetForm();
    handleClose();
    setBadgePreview(null);
  };

  useEffect(() => {
    if (initialData?.badge_image) {
      setBadgePreview(initialData.badge_image);
    }
  }, [initialData]);

  // Convert file → base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return (
    <Modal
      title={initialData ? 'Edit Reward' : 'Create Reward'}
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      centered
      className="custom-modal-header p-0"
      width={500}
      maskClosable={false}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-3">
          {/* Reward Name */}
          <div className="col-12">
            <label className="modal-form">Reward Name <span className="text-danger">*</span></label>
            <input
              type="text"
              name="reward_name"
              className="form-control"
              placeholder='Enter reward name'
              value={formik.values.reward_name}
              onChange={formik.handleChange}
            />
            {formik.touched.reward_name && formik.errors.reward_name && (
              <span style={{ color: 'red' }}>{formik.errors.reward_name}</span>
            )}
            {error?.reward_name?.[0] && <span style={{ color: 'red' }}>{error?.reward_name?.[0]}</span>}
          </div>

          {/* Level (React-Select) */}
          <div className="col-12">
            <label className="modal-form">Level <span className="text-danger">*</span></label>
            <Select
              name="level_Id"
              options={levels.map(level => ({
                value: level._id,
                label: level.level_name
              }))}
              value={levels
                .map(level => ({
                value: level._id,
                label: level.level_name
              })).find(option => option.value === formik.values.level_Id) || null}
              onChange={option => formik.setFieldValue('level_Id', option ? option.value : '')}
              placeholder="Select Level"
              isClearable={true}
            />
            {formik.touched.level_Id && formik.errors.level_Id && (
              <span style={{ color: 'red' }}>{formik.errors.level_Id}</span>
            )}
            {error?.level_Id?.[0] && <span style={{ color: 'red' }}>{error?.level_Id?.[0]}</span>}
          </div>

          {/* Badge Image */}
          <div className="col-12">
            <label className="modal-form">
              Badge Image {initialData ? '(leave empty to keep current)' : ''} <span className="text-danger">*</span>
            </label>
            <input
              type="file"
              name="badge_image"
              className="form-control"
              accept="image/*"
              onChange={async (e) => {
                const file = e.currentTarget.files[0];
                if (file) {
                  const base64 = await fileToBase64(file);
                  formik.setFieldValue('badge_image', base64);
                  setBadgePreview(base64);
                }
              }}
            />
            {formik.touched.badge_image && formik.errors.badge_image && (
              <span style={{ color: 'red' }}>{formik.errors.badge_image}</span>
            )}
            {error?.badge_image?.[0] && <span style={{ color: 'red' }}>{error?.badge_image?.[0]}</span>}
            {badgePreview && <img src={badgePreview} alt="Badge" style={{ width: '100px', marginTop: '10px' }} />}
          </div>
        </div>

        <div className="modal-footer mt-4">
          <button type="button" className="btn btn-light" onClick={onClose}>Close</button>
          <button type="submit" className="btn btn-primary btn-md ms-3" style={{ minWidth: '80px' }} disabled={loading}>
            {loading ? <ClipLoader size={18} color='white' /> : initialData?._id ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreateReward.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  levels: PropTypes.array.isRequired,
};

export default CreateReward;
