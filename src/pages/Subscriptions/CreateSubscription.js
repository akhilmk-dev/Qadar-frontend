import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";

// Validation Schema
const validationSchema = Yup.object({
  customer_Id: Yup.string().required("Customer is required"),
  plan_Id: Yup.string().required("Plan is required"),
});

const CreateSubscription = ({
  visible,
  handleClose,
  initialData = "",
  onSubmit,
  customerOptions = [],
  planOptions = [],
}) => {
  const loading = useSelector((state) => state.Subscription.loading);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      customer_Id: initialData?.customer_Id || "",
      plan_Id: initialData?.plan_Id || "",
    },
    validationSchema,
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
      title={initialData?._id ? "Edit Subscription" : "Create Subscription"}
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
        {/* Customer Dropdown */}
        <div className="mb-3">
          <label>
            Customer <span className="text-danger">*</span>
          </label>
          <Select
            name="customer_Id"
            options={customerOptions}
            value={customerOptions.find(
              (opt) => opt.value === formik.values.customer_Id
            )}
            onChange={(option) =>
              formik.setFieldValue("customer_Id", option?.value || "")
            }
            onBlur={() => formik.setFieldTouched("customer_Id", true)}
            placeholder="Select customer"
          />
          {formik.touched.customer_Id && formik.errors.customer_Id && (
            <span style={{ color: "red" }}>{formik.errors.customer_Id}</span>
          )}
        </div>

        {/* Plan Dropdown */}
        <div className="mb-3">
          <label>
            Plan <span className="text-danger">*</span>
          </label>
          <Select
            name="plan_Id"
            options={planOptions}
            value={planOptions.find(
              (opt) => opt.value === formik.values.plan_Id
            )}
            onChange={(option) =>
              formik.setFieldValue("plan_Id", option?.value || "")
            }
            onBlur={() => formik.setFieldTouched("plan_Id", true)}
            placeholder="Select plan"
          />
          {formik.touched.plan_Id && formik.errors.plan_Id && (
            <span style={{ color: "red" }}>{formik.errors.plan_Id}</span>
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
              {loading ? <ClipLoader size={18} color='white' />: initialData?._id ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

CreateSubscription.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  initialData: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  customerOptions: PropTypes.array.isRequired, // [{value, label}]
  planOptions: PropTypes.array.isRequired, // [{value, label}]
};

export default CreateSubscription;
