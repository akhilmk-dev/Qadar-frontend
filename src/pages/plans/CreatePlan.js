import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

const CreatePlan = ({ visible, handleClose, initialData, onSubmit }) => {
  const loading = useSelector((state) => state.Plan.loading);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      plan_name: initialData?.plan_name || '',
      plan_name_ar: initialData?.plan_name_ar || '',
      tokens: initialData?.tokens || '',
      per_day_limit: initialData?.per_day_limit || '',
      days: initialData?.days || '',
      amount: initialData?.amount || '',
      currency: initialData?.currency || '',
    },
    validationSchema: Yup.object({
      plan_name: Yup.string().required('Plan name is required'),
       plan_name_ar: Yup.string().required('Plan name in arabic is required'),

      tokens: Yup.number()
        .typeError('Tokens must be a number')
        .positive('Tokens must be positive')
        .required('Tokens are required'),
      per_day_limit: Yup.number()
        .typeError('Per day limit must be a number')
        .positive('Per day limit must be positive')
        .required('Per day limit is required'),
      days: Yup.number()
        .typeError('Days must be a number')
        .positive('Days must be positive')
        .required('Days are required'),
      amount: Yup.number()
        .typeError('Amount must be a number')
        .positive('Amount must be positive')
        .required('Amount is required'),
      currency: Yup.string().required('Currency is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (initialData?._id) {
        // Edit mode
        onSubmit(initialData._id, values, () => {
          resetForm();
          handleCloseModal();
        });
      } else {
        // Create mode
        onSubmit(values, () => {
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
      title={initialData?._id ? 'Edit Plan' : 'Create New Plan'}
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
        {/* Plan Name */}
        <div className="mb-3">
          <label>
            Plan Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="plan_name"
            placeholder="Enter plan name"
            value={formik.values.plan_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.plan_name && formik.errors.plan_name && (
            <span style={{ color: 'red' }}>{formik.errors.plan_name}</span>
          )}
        </div>

                <div className="mb-3">
          <label>
            Plan Name (ar) <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="plan_name_ar"
            placeholder="Enter plan name in arabic"
            value={formik.values.plan_name_ar}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.plan_name_ar && formik.errors.plan_name_ar && (
            <span style={{ color: 'red' }}>{formik.errors.plan_name_ar}</span>
          )}
        </div>

        {/* Tokens */}
        <div className="mb-3">
          <label>
            Tokens <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="tokens"
            placeholder="Enter tokens"
            value={formik.values.tokens}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.tokens && formik.errors.tokens && (
            <span style={{ color: 'red' }}>{formik.errors.tokens}</span>
          )}
        </div>

        {/* Per Day Limit */}
        <div className="mb-3">
          <label>
            Per Day Limit <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="per_day_limit"
            placeholder="Enter per day limit"
            value={formik.values.per_day_limit}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.per_day_limit && formik.errors.per_day_limit && (
            <span style={{ color: 'red' }}>{formik.errors.per_day_limit}</span>
          )}
        </div>

        {/* Days */}
        <div className="mb-3">
          <label>
            Days <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="days"
            placeholder="Enter number of days"
            value={formik.values.days}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.days && formik.errors.days && (
            <span style={{ color: 'red' }}>{formik.errors.days}</span>
          )}
        </div>

        {/* Amount */}
        <div className="mb-3">
          <label>
            Amount <span className="text-danger">*</span>
          </label>
          <input
            type="number"
            className="form-control"
            name="amount"
            placeholder="Enter amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.amount && formik.errors.amount && (
            <span style={{ color: 'red' }}>{formik.errors.amount}</span>
          )}
        </div>

        {/* Currency */}
        <div className="mb-3">
          <label>
            Currency <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="currency"
            placeholder="Enter currency code"
            value={formik.values.currency}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.currency && formik.errors.currency && (
            <span style={{ color: 'red' }}>{formik.errors.currency}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end mt-3">
        <button type="button" className="btn btn-light btn-md" onClick={handleCloseModal}>
            Close
          </button>
          <button type="submit" className="btn btn-primary btn-md ms-3" style={{minWidth:'80px'}} disabled={loading}>
              {loading ? <ClipLoader size={18} color='white' />: initialData ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreatePlan.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default CreatePlan;
