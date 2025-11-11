import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

const CreateReedemPlan = ({ visible, handleClose, initialData , onSubmit }) => {
  const loading = useSelector((state) => state.ReedemPlan.loading);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      reedem_plan_name: initialData?.reedem_plan_name || '',
      tokens: initialData?.tokens || '',
      days: initialData?.days || '',
      amount: initialData?.amount || '',
      currency: initialData?.currency || '',
    },
    validationSchema: Yup.object({
      reedem_plan_name: Yup.string().required('Reedem plan name is required'),
      tokens: Yup.number()
        .typeError('Tokens must be a number')
        .positive('Tokens must be positive')
        .required('Tokens are required'),
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
      title={initialData?._id ? 'Edit Reedem Plan' : 'Create New Reedem Plan'}
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
        {/* Reedem Plan Name */}
        <div className="mb-3">
          <label>
            Reedem Plan Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="reedem_plan_name"
            placeholder="Enter reedem plan name"
            value={formik.values.reedem_plan_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.reedem_plan_name && formik.errors.reedem_plan_name && (
            <span style={{ color: 'red' }}>{formik.errors.reedem_plan_name}</span>
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
            onChange={(e) => {
              const value = e.target.value;
              if (value === '' || Number(value) >= 1) {
                formik.handleChange(e);
              }
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.tokens && formik.errors.tokens && (
            <span style={{ color: 'red' }}>{formik.errors.tokens}</span>
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
          <button
            type="button"
            className="btn btn-light btn-md"
            onClick={handleCloseModal}
          >
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

CreateReedemPlan.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateReedemPlan;
