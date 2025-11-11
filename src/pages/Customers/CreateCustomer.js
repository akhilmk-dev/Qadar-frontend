import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { ClipLoader } from 'react-spinners';
import {PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const CreateCustomer = ({ visible, handleClose, initialData = '', onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const error = useSelector((state) => state.Customer.error);
  const loading = useSelector((state) => state.Customer.loading);

  const [phoneData, setPhoneData] = useState({
    country_code: initialData?.country_code || '',
    phone: initialData?.phone || '',
  });
  useEffect(() => {
    if (initialData) {
      setPhoneData({
        country_code: initialData.country_code || '',
        phone: initialData.phone || '',
      });
    }
  }, [initialData]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: initialData?.name || '',
      email: initialData?.email || '',
      date_of_birth: initialData?.date_of_birth
        ? new Date(initialData.date_of_birth).toISOString().split('T')[0]
        : '',
      password: '',
      gender: initialData?.gender || '',
      relationship_status: initialData?.relationship_status || '',
      work_status: initialData?.work_status || '',
      phone:initialData?.phone,
      country_code: initialData?.country_code
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      date_of_birth: Yup.string().required('Date of birth is required'),
      password: initialData
        ? Yup.string()
        : Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
      gender: initialData ? Yup.string().required('Gender is required') : Yup.string(),
      relationship_status: initialData ? Yup.string().required('Relationship status is required') : Yup.string(),
      work_status: initialData ? Yup.string().required('Work status is required') : Yup.string(),
    }),
    onSubmit: (values) => {
      const payload = {
        name: values.name,
        email: values.email,
        country_code: phoneData.country_code,
        phone: phoneData.phone,
        date_of_birth: values.date_of_birth,
        ...(initialData && {
          gender: values.gender,
          relationship_status: values.relationship_status,
          work_status: values.work_status,
        }),
      };

      if (!initialData) {
        payload.password = values.password;
        onSubmit(payload, onClose);
      } else {
        onSubmit(initialData._id, payload, onClose);
      }
    },
  });

  const onClose = () => {
    formik.resetForm();
    setPhoneData({ country_code: '+968', phone: '' });
    handleClose();
  };

  const handlePhoneChange = (phone) => {
    if (!phone) {
      setPhoneData({ country_code: '', phone: '' });
      return;
    }

    // Split country code and number
    const match = phone.match(/^(\+\d{1,4})(.*)$/);
    const countryCode = match ? match[1] : '';
    const phoneNumber = match ? match[2].trim() : '';

    setPhoneData({ country_code:countryCode, phone:phoneNumber });
  };

  return (
    <Modal
      title={initialData ? 'Edit Customer' : 'Create New Customer'}
      open={visible}
      onCancel={onClose}
      footer={null}
      destroyOnClose
      centered
      width={500}
      className="custom-modal-header p-0"
      maskClosable={false}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="row g-3">

          {/* Name */}
          <div className="col-12">
            <label className="modal-form">Name <span className="text-danger">*</span></label>
            <input
              type="text"
              className="form-control fs-7"
              placeholder="Enter name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <span className="text-danger">{formik.errors.name}</span>
            )}
          </div>

          {/* Email */}
          <div className="col-12">
            <label className="modal-form">Email <span className="text-danger">*</span></label>
            <input
              type="email"
              className="form-control fs-7"
              placeholder="Enter email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {formik.touched.email && formik.errors.email && (
              <span className="text-danger">{formik.errors.email}</span>
            )}
          </div>

          {/* Date of Birth */}
          <div className="col-12">
            <label className="modal-form">Date of Birth <span className="text-danger">*</span></label>
            <input
              type="date"
              className="form-control fs-7"
              name="date_of_birth"
              value={formik.values.date_of_birth}
              onChange={formik.handleChange}
            />
            {formik.touched.date_of_birth && formik.errors.date_of_birth && (
              <span className="text-danger">{formik.errors.date_of_birth}</span>
            )}
          </div>

          {/* Phone */}
          <div className="col-12">
            <label className="modal-form">Phone <span className="text-danger">*</span></label>
            <PhoneInput
              
              value={`${phoneData.country_code}${phoneData.phone}`}
              onChange={handlePhoneChange}
              inputStyle={{
                width: '100%',
                border: '1px solid rgb(233 236 240)',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                padding: '0.375rem 0.75rem',
              }}
              enableSearch={true}
              specialLabel=""
              countryCodeEditable={true}
            />
          </div>

          {/* Password */}
          {!initialData && (
            <div className="col-12 position-relative">
              <label className="modal-form">Password <span className="text-danger">*</span></label>
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
                <span className="text-danger">{formik.errors.password}</span>
              )}
            </div>
          )}

          {/* Edit-only fields */}
          {initialData && (
            <>
              <div className="col-12">
                <label className="modal-form">Gender <span className="text-danger">*</span></label>
                <select
                  className="form-control fs-7"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div className="col-12">
                <label className="modal-form">Relationship Status <span className="text-danger">*</span></label>
                <select
                  className="form-control fs-7"
                  name="relationship_status"
                  value={formik.values.relationship_status}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Status</option>
                  <option value="single">Single</option>
                  <option value="married">Married</option>
                  <option value="divorced">Divorced</option>
                </select>
              </div>

              <div className="col-12">
                <label className="modal-form">Work Status <span className="text-danger">*</span></label>
                <select
                  className="form-control fs-7"
                  name="work_status"
                  value={formik.values.work_status}
                  onChange={formik.handleChange}
                >
                  <option value="">Select Work Status</option>
                  <option value="employee">Employee</option>
                  <option value="self-employed">Self-employed</option>
                  <option value="not working">Not working</option>
                </select>
              </div>
            </>
          )}

        </div>

        {/* Footer */}
        <div className="modal-footer mt-3">
          <button type="button" className="btn btn-light btn-md" onClick={onClose}>
            Close
          </button>
          <button
            type="submit"
            className="btn btn-primary btn-md ms-3"
            style={{ minWidth: '80px' }}
            disabled={loading}
          >
            {loading ? <ClipLoader size={18} color="white" /> : initialData?._id ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreateCustomer.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateCustomer;
 