import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';

const CreateLevel = ({ visible, handleClose, initialData = '', onSubmit }) => {
  const error = useSelector((state) => state.Level?.error);
  const loading = useSelector((state) => state.Level.loading);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      xp_points: initialData?.xp_points || '',
      level_name: initialData?.level_name || '',
    },
    validationSchema: Yup.object({
      xp_points: Yup.number()
        .typeError('XP Points must be a number')
        .required('XP Points are required')
        .min(0, 'XP Points cannot be negative'),
      level_name: Yup.string().required('Level name is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      if (!initialData) {
        onSubmit(values, onClose);
      } else {
        onSubmit(initialData?._id, values, onClose);
      }
    },
  });

  const onClose = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <Modal
      title={initialData ? 'Edit Level' : 'Create New Level'}
      visible={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      centered
      width={500}
      className="custom-modal-header p-0"
      maskClosable={false}
    >
      <form onSubmit={formik.handleSubmit}>
        <div role="document">
          <div className="row g-3">
            {/* XP Points */}
            <div className="col-12">
              <label className="modal-form">
                XP Points <span className="text-danger">*</span>
              </label>
              <input
                type="number"
                className="form-control fs-7"
                placeholder="Enter XP points"
                name="xp_points"
                value={formik.values.xp_points}
                onChange={formik.handleChange}
              />
              {formik.touched.xp_points && formik.errors.xp_points && (
                <span style={{ color: 'red' }}>{formik.errors.xp_points}</span>
              )}
              {error?.xp_points?.[0] && <span style={{ color: 'red' }}>{error?.xp_points?.[0]}</span>}
            </div>

            {/* Level Name */}
            <div className="col-12">
              <label className="modal-form">
                Level Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control fs-7"
                placeholder="Enter level name"
                name="level_name"
                value={formik.values.level_name}
                onChange={formik.handleChange}
              />
              {formik.touched.level_name && formik.errors.level_name && (
                <span style={{ color: 'red' }}>{formik.errors.level_name}</span>
              )}
              {error?.level_name?.[0] && <span style={{ color: 'red' }}>{error?.level_name?.[0]}</span>}
            </div>
          </div>

          {/* Footer */}
          <div className="modal-footer mt-3">
            <button type="button" className="btn btn-light btn-md" onClick={onClose}>
              Close
            </button>
          <button type="submit" className="btn btn-primary btn-md ms-3" style={{minWidth:'80px'}} disabled={loading}>
              {loading ? <ClipLoader size={18} color='white' />: initialData?._id ? 'Update' : 'Add'}
          </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

CreateLevel.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateLevel;
