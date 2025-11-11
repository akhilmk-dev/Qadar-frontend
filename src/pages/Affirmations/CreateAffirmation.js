import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Switch } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

const CreateAffirmation = ({
  visible,
  handleClose,
  initialData,
  onSubmit,
  moodOptions = [],
}) => {
  const loading = useSelector((state) => state.Affirmation.loading);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      text: initialData?.text || '',
      langCode: initialData?.langCode || '',
      active: initialData?.active ?? true, 
      moodId: initialData?.moodId?._id || null,
    },
    validationSchema: Yup.object({
      text: Yup.string().required('Text is required'),
      langCode: Yup.string()
        .required('Language code is required')
        .length(2, 'Lang code must be 2 characters')
        .uppercase('Lang code must be uppercase'),
      moodId: Yup.string().required('Mood is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload = {
        ...values,
        active: values.active, 
      };
      if (initialData?._id) {
        onSubmit(initialData._id, payload, () => {
          resetForm();
          handleCloseModal();
        });
      } else {
        onSubmit(payload, () => {
          resetForm();
          handleCloseModal();
        });
      }
    },
  });

  const handleCloseModal = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <Modal
      title={initialData?._id ? 'Edit Affirmation' : 'Create New Affirmation'}
      open={visible}
      onCancel={handleCloseModal}
      footer={null}
      destroyOnClose
      centered
      className="custom-modal-header p-0"
      width={500}
      maskClosable={false}
    >
      <form onSubmit={formik.handleSubmit}>
        {/* Text */}
        <div className="mb-3">
          <label>
            Text <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            name="text"
            placeholder="Enter affirmation text"
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.text && formik.errors.text && (
            <span style={{ color: 'red' }}>{formik.errors.text}</span>
          )}
        </div>

        {/* Language Code */}
        <div className="mb-3">
          <label>
            Language Code <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="langCode"
            placeholder="Enter language code (e.g., EN)"
            value={formik.values.langCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.langCode && formik.errors.langCode && (
            <span style={{ color: 'red' }}>{formik.errors.langCode}</span>
          )}
        </div>

        {/* Mood */}
        <div className="mb-3">
          <label>
            Mood <span className="text-danger">*</span>
          </label>
          <Select
            options={moodOptions}
            value={moodOptions?.filter(
              (item) => item?.value === formik.values.moodId
            )}
            onChange={(selected) =>
              formik.setFieldValue('moodId', selected?.value)
            }
            onBlur={() => formik.setFieldTouched('moodId', true)}
            isClearable={true}
            placeholder="Select Mood"
          />
          {formik.touched.moodId && formik.errors.moodId && (
            <span style={{ color: 'red' }}>{formik.errors.moodId}</span>
          )}
        </div>

        {/* Active (Now Switch) */}
        <div className="mb-3 ">
          <label>Active</label><br/>
          <Switch
            checked={formik.values.active}
            onChange={(checked) => formik.setFieldValue('active', checked)}
            style={{
              backgroundColor: formik.values.active ? '#c56797' : '#d9d9d9',
            }}
          />
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end mt-3">
          <button
            type="button"
            className="btn btn-light btn-md"
            onClick={handleCloseModal}
          >
            Close
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-md ms-3"
            style={{ minWidth: '80px' }}
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={18} color="white" />
            ) : initialData ? (
              'Update'
            ) : (
              'Add'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreateAffirmation.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  moodOptions: PropTypes.array,
};

export default CreateAffirmation;
