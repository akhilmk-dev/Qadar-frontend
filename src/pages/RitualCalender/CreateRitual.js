import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Modal, Button, Switch } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

const recurrenceTypeOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
];

const visibilityOptions = [
  { value: "private", label: "Private" },
  { value: "global", label: "Global" },
];

const CreateRitual = ({ visible, handleClose, initialData = "", onSubmit }) => {
  const [previewImage, setPreviewImage] = useState(initialData?.image || "");
  const loading = useSelector((state) => state.Ritual.loading);

  useEffect(() => {
    setPreviewImage(initialData?.image || "");
  }, [initialData]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: initialData?.title || "",
      source: "admin",
      date: initialData?.date ? new Date(initialData.date).toISOString().split("T")[0] : "",
      time: initialData?.time || "",
      description: initialData?.description || "",
      recurring: initialData?.recurring || false,
      recurrenceType: initialData?.recurrenceType || "",
      visibility: "global",
      reminder: initialData?.reminder || false,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      source: Yup.string().required("Source is required"),
      date: Yup.string().required("Date is required"),
      recurrenceType: Yup.string().when("recurring", {
        is: true,
        then: (schema) => schema.required("Recurring type is required"),
        otherwise: (schema) => schema.nullable().notRequired(),
      }),
      visibility: Yup.string(),
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue("image", reader.result);
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCloseModal = () => {
    formik.resetForm();
    setPreviewImage(initialData?.image || "");
    handleClose();
  };

  return (
    <Modal
      title={initialData?._id ? "Edit Ritual" : "Create New Ritual"}
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
        <div className="row">
          {/* Title */}
          <div className="mb-3 col-md-6 col-12">
            <label>
              Title <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Enter ritual title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
            {formik.touched.title && formik.errors.title && (
              <span className="text-danger small">{formik.errors.title}</span>
            )}
          </div>

          {/* Date */}
          <div className="mb-3 col-md-6 col-12">
            <label>
              Date <span className="text-danger">*</span>
            </label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formik.values.date}
              min={new Date().toISOString().split("T")[0]} // 
              onChange={(e) => {
                const selectedDate = e.target.value;
                const today = new Date().toISOString().split("T")[0];

                // Prevent selecting/typing a past date
                if (selectedDate < today) {
                  formik.setFieldValue("date", today);
                } else {
                  formik.handleChange(e);
                }
              }}
            />
            {formik.touched.date && formik.errors.date && (
              <span className="text-danger small">{formik.errors.date}</span>
            )}
          </div>

          {/* Time */}
          <div className="mb-3 col-md-6 col-12">
            <label>Time</label>
            <input
              type="time"
              className="form-control"
              name="time"
              value={formik.values.time}
              onChange={formik.handleChange}
            />
          </div>


          {/* Description */}
          <div className="mb-3 col-12">
            <label>Description</label>
            <textarea
              className="form-control"
              rows="3"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>

          {/* Recurring */}
          <div className="mb-3 col-md-6 col-12 d-flex align-items-start  justify-content-between">
            {/* Reminder */}
            <div className="mb-3  d-flex align-items-start flex-column justify-content-center">
              <label className="mb-2">Reminder</label>
              <Switch
                checked={formik.values.reminder}
                onChange={(checked) => formik.setFieldValue("reminder", checked)}
                style={{
                  backgroundColor: formik.values.reminder ? "#c56797" : "#d9d9d9",
                }}
              />
            </div>
            <div className="mb-3  d-flex align-items-start flex-column justify-content-center">
              <label className="mb-2">Recurring</label>
              <Switch
                checked={formik.values.recurring}
                onChange={(checked) => formik.setFieldValue("recurring", checked)}
                style={{
                  backgroundColor: formik.values.recurring ? "#c56797" : "#d9d9d9",
                }}
              />
            </div>
          </div>

          {formik.values.recurring && (
            <div className="mb-3 col-md-6 col-12">
              <label>
                Recurring Type <span className="text-danger">*</span>
              </label>
              <Select
                options={recurrenceTypeOptions}
                name="recurrenceType"
                value={recurrenceTypeOptions.find(
                  (opt) => opt.value === formik.values.recurrenceType
                )}
                onChange={(option) =>
                  formik.setFieldValue("recurrenceType", option?.value)
                }
                isClearable={true}
              />
              {formik.touched.recurrenceType && formik.errors.recurrenceType && (
                <span className="text-danger small">
                  {formik.errors.recurrenceType}
                </span>
              )}
            </div>
          )}

          {/* Buttons */}
          <div className="d-flex justify-content-end mt-3">
            <button
              type="button"
              className="btn btn-light btn-md"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary btn-md ms-3" style={{ minWidth: '80px' }} disabled={loading}>
              {loading ? <ClipLoader size={18} color='white' /> : initialData ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

CreateRitual.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
};

export default CreateRitual;
