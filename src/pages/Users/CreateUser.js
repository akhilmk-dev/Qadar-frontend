import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Switch } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import Select from 'react-select';
import { ClipLoader } from 'react-spinners';

const CreateUser = ({ visible, handleClose, initialData = '', onSubmit, roles = [] }) => {
  const [showPassword, setShowPassword] = useState(false);
  const error = useSelector((state) => state.User.error);
  const loading = useSelector((state) => state.User.loading);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      phone: initialData?.phone || '',
      password: '',
      role: initialData?.role?._id || '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      phone: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{10}$/, 'Phone number must be exactly 8 digits'),
      password: initialData
        ? Yup.string()
        : Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
      role: Yup.string().required('Role is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const payload = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        role: values.role,
      };

      if (!initialData) {
        payload.password = values.password;
        onSubmit(payload, onClose);
      } else {
        onSubmit(initialData?._id, payload, onClose);
      }
    },
  });

  useEffect(()=>{
    if(initialData){
        formik.setFieldValue('role',initialData?.role?._id)
    }
  },[initialData,roles])

  const onClose = () => {
    formik.resetForm();
    handleClose();
  };

  return (
    <Modal
      title={initialData ? 'Edit User' : 'Create New User'}
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
            {/* Name */}
            <div className="col-12">
              <label className="modal-form">
                Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control fs-7"
                placeholder="Enter name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name && (
                <span style={{ color: 'red' }}>{formik.errors.name}</span>
              )}
              {error?.name?.[0] && <span style={{ color: 'red' }}>{error?.name?.[0]}</span>}
            </div>

            {/* Email */}
            <div className="col-12">
              <label className="modal-form">
                Email <span className="text-danger">*</span>
              </label>
              <input
                type="email"
                className="form-control fs-7"
                placeholder="Enter email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              {formik.touched.email && formik.errors.email && (
                <span style={{ color: 'red' }}>{formik.errors.email}</span>
              )}
              {error?.email?.[0] && <span style={{ color: 'red' }}>{error?.email?.[0]}</span>}
            </div>

            {/* Phone */}
            <div className="col-12">
              <label className="modal-form">
                Phone <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control fs-7"
                placeholder="Enter phone number"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
              />
              {formik.touched.phone && formik.errors.phone && (
                <span style={{ color: 'red' }}>{formik.errors.phone}</span>
              )}
              {error?.phone?.[0] && <span style={{ color: 'red' }}>{error?.phone?.[0]}</span>}
            </div>

            {/* Password */}
            {!initialData && (
              <div className="col-12 position-relative">
                <label className="modal-form">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="form-control fs-7"
                    placeholder="Enter password"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <span
                    className="input-group-text"
                    style={{ cursor: 'pointer' }}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                  </span>
                </div>
                {formik.touched.password && formik.errors.password && (
                  <span style={{ color: 'red' }}>{formik.errors.password}</span>
                )}
              </div>
            )}

            {/* Role */}
            <div className="col-12">
              <label className="modal-form">
                Role <span className="text-danger">*</span>
              </label>
              <Select
                placeholder="Select role"
                options={roles?.map(item=>({label:item?.role_name,value:item?._id}))}
                className="w-100"
                value={
                    roles
                      ?.map(item => ({
                        label: item?.role_name,
                        value: item?._id
                      }))
                      ?.find(option => option.value === formik.values.role) || null
                  }
                  
                onChange={(option) => formik.setFieldValue('role', option?.value ||"")}
                isClearable={true}
              />
              {formik.touched.role && formik.errors.role && (
                <span style={{ color: 'red' }}>{formik.errors.role}</span>
              )}
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

CreateUser.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  roles: PropTypes.array.isRequired, // [{ _id, name }]
};

export default CreateUser;
