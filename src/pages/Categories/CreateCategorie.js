import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';

const CreateCategory = ({ visible, handleClose, initialData = {}, onSubmit }) => {
  const [previewImage, setPreviewImage] = useState(initialData?.category_image || '');
  const loading = useSelector((state) => state.Category.loading);
  useEffect(() => {
    setPreviewImage(initialData?.category_image || '');
  }, [initialData]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      category_name: initialData?.category_name || '',
      category_image: initialData?.category_image || '',
      ai_model: initialData?.ai_model || '',
      prompt: initialData?.prompt || '',
      tokens: initialData?.tokens || '',
      xp_points: initialData?.xp_points || '',
    },
    validationSchema: Yup.object({
      category_name: Yup.string().required('Category name is required'),
      category_image: !initialData?._id
        ? Yup.string().required('Category image is required')
        : Yup.string(), // optional on edit
      ai_model: Yup.string().required('AI Model is required'),
      prompt: Yup.string().required('Prompt is required'),
      tokens: Yup.number().typeError('Tokens must be a number').required('Tokens is required'),
      xp_points: Yup.number().typeError('XP points must be a number').required('XP points is required'),
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue('category_image', reader.result);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseModal = () => {
    formik.resetForm();
    setPreviewImage(initialData?.category_image || '');
    handleClose();
  };

  return (
    <Modal
      title={initialData?._id ? 'Edit Category' : 'Create New Category'}
      visible={visible}
      onCancel={handleCloseModal}
      footer={null}
      destroyOnClose
      centered
      className="custom-modal-header p-0"
      width={500}
      maskClosable={false}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label>Category Name <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            name="category_name"
            placeholder='Enter category name'
            value={formik.values.category_name}
            onChange={formik.handleChange}
          />
          {formik.touched.category_name && formik.errors.category_name && (
            <span style={{ color: 'red' }}>{formik.errors.category_name}</span>
          )}
        </div>

        <div className="mb-3">
          <label>Category Image {!initialData?._id && <span className="text-danger">*</span>}</label>
          <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
          {previewImage && (
            <img
              src={previewImage}
              alt="Preview"
              style={{ marginTop: '10px', width: '100px', height: '100px', objectFit: 'cover' }}
            />
          )}
        </div>

        <div className="mb-3">
          <label>AI Model <span className="text-danger">*</span></label>
          <input
            type="text"
            className="form-control"
            placeholder='Enter Ai model'
            name="ai_model"
            value={formik.values.ai_model}
            onChange={formik.handleChange}
          />
          {formik.touched.ai_model && formik.errors.ai_model && (
            <span style={{ color: 'red' }}>{formik.errors.ai_model}</span>
          )}
        </div>

        <div className="mb-3">
          <label>Prompt <span className="text-danger">*</span></label>
          <textarea
            className="form-control"
            placeholder='Enter the prompt'
            name="prompt"
            value={formik.values.prompt}
            onChange={formik.handleChange}
          />
          {formik.touched.prompt && formik.errors.prompt && (
            <span style={{ color: 'red' }}>{formik.errors.prompt}</span>
          )}
        </div>

        <div className="mb-3">
          <label>Tokens <span className="text-danger">*</span></label>
          <input
            type="number"
            className="form-control"
            name="tokens"
            placeholder='Enter number of tokens'
            value={formik.values.tokens}
            onChange={formik.handleChange}
          />
          {formik.touched.tokens && formik.errors.tokens && (
            <span style={{ color: 'red' }}>{formik.errors.tokens}</span>
          )}
        </div>

        <div className="mb-3">
          <label>XP Points <span className="text-danger">*</span></label>
          <input
            type="number"
            className="form-control"
            placeholder='Enter the xp points'
            name="xp_points"
            value={formik.values.xp_points}
            onChange={formik.handleChange}
          />
          {formik.touched.xp_points && formik.errors.xp_points && (
            <span style={{ color: 'red' }}>{formik.errors.xp_points}</span>
          )}
        </div>

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

CreateCategory.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateCategory;
