import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

const CreateCategoryPlan = ({
  visible,
  handleClose,
  initialData = {},
  onSubmit,
  planOptions = [],
  categoryOptions = [],
}) => {
  const loading = useSelector((state) => state.Category.loading);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      plan_Id: initialData?.plan_Id || '',
      category_Id: initialData?.category_Id || '',
      per_day_limit: initialData?.per_day_limit || '',
    },
    validationSchema: Yup.object({
      plan_Id: Yup.string().required('Plan is required'),
      category_Id: Yup.string().required('Category is required'),
      per_day_limit: Yup.number()
        .typeError('Per day limit must be a number')
        .positive('Per day limit must be greater than zero')
        .required('Per day limit is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (initialData?._id) {
        onSubmit(initialData._id, values, () => {
          resetForm();
          handleCloseModal();
        });
      } else {
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
      title={initialData?._id ? 'Edit Category Plan' : 'Create New Category Plan'}
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
        {/* Plan */}
        <div className="mb-3">
          <label>
            Plan <span className="text-danger">*</span>
          </label>
          <Select
            name="plan_Id"
            options={planOptions}
            value={planOptions.find((opt) => opt.value === formik.values.plan_Id)}
            onChange={(option) => formik.setFieldValue('plan_Id', option?.value || '')}
            onBlur={() => formik.setFieldTouched('plan_Id', true)}
            placeholder="Select Plan"
          />
          {formik.touched.plan_Id && formik.errors.plan_Id && (
            <span style={{ color: 'red' }}>{formik.errors.plan_Id}</span>
          )}
        </div>

        {/* Category */}
        <div className="mb-3">
          <label>
            Category <span className="text-danger">*</span>
          </label>
          <Select
            name="category_Id"
            options={categoryOptions}
            value={categoryOptions.find((opt) => opt.value === formik.values.category_Id)}
            onChange={(option) => formik.setFieldValue('category_Id', option?.value || '')}
            onBlur={() => formik.setFieldTouched('category_Id', true)}
            placeholder="Select Category"
          />
          {formik.touched.category_Id && formik.errors.category_Id && (
            <span style={{ color: 'red' }}>{formik.errors.category_Id}</span>
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

        {/* Action Buttons */}
        <div className="d-flex justify-content-end mt-3">
          <Button type="button" onClick={handleCloseModal}>
            Close
          </Button>
          <button type="submit" className="btn btn-primary btn-md ms-3" style={{minWidth:'80px'}} disabled={loading}>
              {loading ? <ClipLoader size={18} color='white' />: initialData?._id ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreateCategoryPlan.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  planOptions: PropTypes.array,
  categoryOptions: PropTypes.array,
};

export default CreateCategoryPlan;
