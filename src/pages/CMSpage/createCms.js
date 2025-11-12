import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "reactstrap";
import { ClipLoader } from "react-spinners";
import Breadcrumb from "components/Common/Breadcrumb2";
import axiosInstance from "pages/Utility/axiosInstance";
import ReactQuill from "react-quill";
import { addCmsRequest, updateCmsRequest } from "store/Cms/actions"; 

const CmsFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const loading = useSelector((state) => state.Cms.loading);
  const [initialData, setInitialData] = useState(null);
  const [loadingPage, setLoadingPage] = useState(!!id);
  const [backendErrors, setBackendErrors] = useState({});

 
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await axiosInstance.get(`V1/cmspages/${id}`);
          setInitialData(res?.data?.data);
        } catch (err) {
          console.error("Error fetching CMS page:", err);
        } finally {
          setLoadingPage(false);
        }
      })();
    }
  }, [id]);

  //  Formik Setup
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      page_name: initialData?.page_name || "",
      page_name_ar: initialData?.page_name_ar || "",
      content: initialData?.content || "",
      content_ar: initialData?.content_ar || "",
    },
    validationSchema: Yup.object({
      page_name: Yup.string().required("Page name is required"),
      page_name_ar: Yup.string().required("Page name (Arabic) is required"),
      content: Yup.string().required("Content is required"),
      content_ar: Yup.string().required("Content (Arabic) is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      const onClose = () => {
        resetForm();
        navigate("/cms");
      };

      if (initialData) {
        dispatch(updateCmsRequest(id, values, onClose));
      } else {
        dispatch(addCmsRequest(values, onClose));
      }
    },
  });

  if (loadingPage) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <ClipLoader color="#c56797" size={35} />
      </div>
    );
  }

  return (
    <div className="page-content container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center ms-2 mb-3">
        <Breadcrumb
          title={id ? "Edit CMS Page" : "Create CMS Page"}
          breadcrumbItems={[
            { title: "Dashboard", link: "/dashboard" },
            { title: id ? "Edit CMS Page" : "Create CMS Page", link: "#" },
          ]}
        />
        <Button
          className="text-white bg-primary"
          onClick={() => navigate("/cms")}
        >
          ← Back
        </Button>
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="p-4 shadow-sm bg-white rounded-3"
      >
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Page Name <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="page_name"
              className="form-control"
              value={formik.values.page_name}
              onChange={formik.handleChange}
              placeholder="Enter page name"
            />
            {formik.touched.page_name && formik.errors.page_name && (
              <small className="text-danger">{formik.errors.page_name}</small>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Page Name (Arabic) <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              name="page_name_ar"
              className="form-control"
              value={formik.values.page_name_ar}
              onChange={formik.handleChange}
              placeholder="Enter page name in Arabic"
            />
            {formik.touched.page_name_ar && formik.errors.page_name_ar && (
              <small className="text-danger">{formik.errors.page_name_ar}</small>
            )}
          </div>
        </div>

        {/* English Content */}
        <div className="mb-4">
          <label className="form-label">
            Content <span className="text-danger">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={formik.values.content}
            onChange={(value) => formik.setFieldValue("content", value)}
            placeholder="Enter content..."
          />
          {formik.touched.content && formik.errors.content && (
            <small className="text-danger">{formik.errors.content}</small>
          )}
        </div>

        {/* Arabic Content */}
        <div className="mb-4">
          <label className="form-label">
            Content (Arabic) <span className="text-danger">*</span>
          </label>
          <ReactQuill
            theme="snow"
            value={formik.values.content_ar}
            onChange={(value) => formik.setFieldValue("content_ar", value)}
            placeholder="Enter Arabic content..."
          />
          {formik.touched.content_ar && formik.errors.content_ar && (
            <small className="text-danger">{formik.errors.content_ar}</small>
          )}
        </div>

        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => navigate("/cms")}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary ms-3 px-4"
            disabled={loading}
          >
            {loading ? (
              <ClipLoader size={18} color="white" />
            ) : id ? (
              "Update"
            ) : (
              "Add"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CmsFormPage;
