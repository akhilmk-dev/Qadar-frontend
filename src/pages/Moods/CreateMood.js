import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

const CreateMood = ({ visible, handleClose, initialData ="", onSubmit }) => {
  const loading = useSelector((state) => state.Mood.loading);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      mood_name: initialData?.mood_name || '',
      mood_name_ar:initialData?.mood_name_ar ||'',
      description: initialData?.description || '',
      description_ar:initialData?.description_ar || ''
    },
    validationSchema: Yup.object({
      mood_name: Yup.string().required('Mood name is required'),
      mood_name_ar:Yup.string().required('Mood name in arabic is required'),
      description: Yup.string().required('Mood description is required'),
      description_ar: Yup.string().required('Mood description in arabic is required'),
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
      title={initialData?._id ? 'Edit Mood' : 'Create New Mood'}
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
        {/* Mood Name */}
        <div className="mb-3">
          <label>
            Mood Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="mood_name"
            placeholder='Enter mood name'
            value={formik.values.mood_name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mood_name && formik.errors.mood_name && (
            <span style={{ color: 'red' }}>{formik.errors.mood_name}</span>
          )}
        </div>


          {/* Mood Name  ar*/}
                <div className="mb-3">
          <label>
            Mood Name (ar) <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="mood_name_ar"
            placeholder='Enter mood name in arabic'
            value={formik.values.mood_name_ar}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.mood_name_ar && formik.errors.mood_name_ar && (
            <span style={{ color: 'red' }}>{formik.errors.mood_name_ar}</span>
          )}
        </div>

        {/* Description */}
        <div className="mb-3">
          <label>
            Description <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            name="description"
            placeholder='Enter the description'
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <span style={{ color: 'red' }}>{formik.errors.description}</span>
          )}
        </div>

                {/* Description ar */}
        <div className="mb-3">
          <label>
            Description (ar) <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            name="description_ar"
            placeholder='Enter the description in arabic'
            value={formik.values.description_ar}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description_ar && formik.errors.description_ar && (
            <span style={{ color: 'red' }}>{formik.errors.description_ar}</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="d-flex justify-content-end mt-3">
        <button type="button" className="btn btn-light btn-md" onClick={handleCloseModal}>
            Close
          </button>
          <button type="submit" className="btn btn-primary btn-md ms-3" style={{minWidth:'80px'}} disabled={loading}>
              {loading ? <ClipLoader size={18} color='white' />: initialData?._id ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreateMood.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateMood;
