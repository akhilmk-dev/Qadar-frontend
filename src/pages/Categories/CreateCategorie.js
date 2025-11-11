import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { Switch, Spin } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactMarkdown from "react-markdown";
import axiosInstance from "pages/Utility/axiosInstance";
import Breadcrumb from "components/Common/Breadcrumb2";
import { useTranslation } from "react-i18next";
import { Button } from "reactstrap";
import { updateAddressRequest } from "store/Address/actions";
import { addCategoryRequest, updateCategoryRequest } from "store/actions";

const CategoryFormPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const navigate = useNavigate();
  const loading = useSelector((state) => state.Category.loading);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [initialData, setInitialData] = useState(null);
  const [loadingCategory, setLoadingCategory] = useState(!!id);
  const [previewImage, setPreviewImage] = useState("");
  const [previewThumbnail, setPreviewThumbnail] = useState("");

  // Fetch existing category when editing
  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await axiosInstance.get(`V1/categories/${id}`);
          const data = res?.data?.data;
          setInitialData(data);
          setPreviewImage(data?.category_image || "");
          setPreviewThumbnail(data?.thumbnail_image || "");
        } catch (err) {
          console.error("Error fetching category:", err);
        } finally {
          setLoadingCategory(false);
        }
      })();
    }
  }, [id]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      category_name: initialData?.category_name || "",
      category_image: initialData?.category_image || "",
      thumbnail_image: initialData?.thumbnail_image || "",
      ai_model: initialData?.ai_model || "",
      prompt: initialData?.prompt || "",
      tokens: initialData?.tokens || "",
      xp_points: initialData?.xp_points || "",
      isImageRequired: initialData?.isImageRequired || false,
      instructions: initialData?.instructions || "",
    },
    validationSchema: Yup.object({
      category_name: Yup.string().required("Category name is required"),
      category_image: !initialData
        ? Yup.string().required("Category image is required")
        : Yup.string(),
      thumbnail_image: !initialData
        ? Yup.string().required("Thumbnail image is required")
        : Yup.string(),
      ai_model: Yup.string().required("AI Model is required"),
      prompt: Yup.string().required("Prompt is required"),
      tokens: Yup.number()
        .typeError("Tokens must be a number")
        .required("Tokens is required"),
      xp_points: Yup.number()
        .typeError("XP points must be a number")
        .required("XP points is required"),
      instructions: Yup.string().required("Instructions are required"),
    }),
    onSubmit: async (values,{ resetForm }) => {
      try {
        const onClose = ()=>{
          resetForm();
          navigate('/categories');
        }
          if(initialData){
            dispatch(updateCategoryRequest(id,JSON.stringify(values),onClose))
          }else{
            dispatch(addCategoryRequest(JSON.stringify(values),onClose))
          }
      } catch (err) {
        console.error("Error saving category:", err);
      }
    },
  });

  const handleImageChange = (e, field, setPreview) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        formik.setFieldValue(field, reader.result);
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loadingCategory) {
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
          title={initialData ? "Edit Category" : "Create Category"}
          breadcrumbItems={[
            { title: 'Dashboard', link: '/dashboard' },
            { title: initialData ? "Edit Category" : "Create Category", link: '#' },
          ]}
        />
        <Button className="text-white bg-primary" onClick={() => navigate('/categories')}>
          ← {t('Back')}
        </Button>
      </div>

      <form onSubmit={formik.handleSubmit} className="p-4 shadow-sm bg-white rounded-3">
        {/* Two-column layout for basic fields */}
        <div className="row">
          {/* Category Name */}
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Category Name <span className="text-danger" style={{fontSize:"14px"}}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="category_name"
              value={formik.values.category_name}
              onChange={formik.handleChange}
              placeholder = "Enter category name"
            />
            {formik.touched.category_name && formik.errors.category_name && (
              <small className="text-danger" style={{fontSize:"14px"}}>{formik.errors.category_name}</small>
            )}
          </div>

          {/* AI Model */}
          <div className="col-md-6 mb-3">
            <label className="form-label">
              AI Model <span className="text-danger" style={{fontSize:"14px"}}>*</span>
            </label>
            <input
              type="text"
              className="form-control"
              name="ai_model"
              value={formik.values.ai_model}
              onChange={formik.handleChange}
              placeholder = "Enter Ai model"
            />
            {formik.touched.ai_model && formik.errors.ai_model && (
              <small className="text-danger" style={{fontSize:"14px"}}>{formik.errors.ai_model}</small>
            )}
          </div>

          {/* Tokens */}
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Tokens <span className="text-danger" style={{fontSize:"14px"}}>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              name="tokens"
              value={formik.values.tokens}
              onChange={formik.handleChange}
              placeholder="Enter tokens"
            />
             {formik.touched.tokens && formik.errors.tokens && (
              <small className="text-danger" style={{fontSize:"14px"}}>{formik.errors.tokens}</small>
            )}
          </div>

          {/* XP Points */}
          <div className="col-md-6 mb-3">
            <label className="form-label">
              XP Points <span className="text-danger" style={{fontSize:"14px"}}>*</span>
            </label>
            <input
              type="number"
              className="form-control"
              name="xp_points"
              value={formik.values.xp_points}
              onChange={formik.handleChange}
              placeholder="Enter xp points"
            />
             {formik.touched.xp_points && formik.errors.xp_points && (
              <small className="text-danger" style={{fontSize:"14px"}}>{formik.errors.xp_points}</small>
            )}
          </div>
        </div>

        {/* Category Image & Thumbnail in two columns */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Category Image {!id && <span className="text-danger" style={{fontSize:"14px"}}>*</span>}
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => handleImageChange(e, "category_image", setPreviewImage)}
            />
             {formik.touched.category_image && formik.errors.category_image && (
              <small className="text-danger" style={{fontSize:"14px"}}>{formik.errors.category_image}</small>
            )}
            {initialData?.category_image && (
              <button
                type="button"
                className="btn btn-link p-0 mt-1"
                onClick={() => window.open(initialData?.category_image, "_blank")}
                style={{ color: "#c56797" }}
              >
                View Existing Image
              </button>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">
              Thumbnail Image {!id && <span className="text-danger" style={{fontSize:"14px"}}>*</span>}
            </label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={(e) => handleImageChange(e, "thumbnail_image", setPreviewThumbnail)}
            />
             {formik.touched.thumbnail_image && formik.errors.thumbnail_image && (
              <small className="text-danger" style={{fontSize:"14px"}}>{formik.errors.thumbnail_image}</small>
            )}
            {initialData?.thumbnail_image && (
              <button
                type="button"
                className="btn btn-link p-0 mt-1"
                onClick={() => window.open(initialData?.thumbnail_image, "_blank")}
                style={{ color: "#c56797" }}
              >
                View Existing Image
              </button>
            )}
          </div>
        </div>

        {/* Full-width fields */}
        <div className="mb-3">
          <label className="form-label">
            Prompt <span className="text-danger" style={{fontSize:"14px"}}>*</span>
          </label>
          <textarea
            className="form-control"
            name="prompt"
            rows={4}
            value={formik.values.prompt}
            onChange={formik.handleChange}
            placeholder="Enter the prompt"
          />
           {formik.touched.prompt && formik.errors.prompt && (
              <small className="text-danger" style={{fontSize:"14px"}}>{formik.errors.prompt}</small>
            )}
        </div>

        <div className="mb-3">
          <label className="form-label">
            Instructions (Markdown) <span className="text-danger" style={{fontSize:"14px"}}>*</span>
          </label>
          <textarea
            className="form-control"
            name="instructions"
            rows={6}
            placeholder="Enter markdown content..."
            value={formik.values.instructions}
            onChange={formik.handleChange}
          />
          {(formik.values.instructions) && (
            <div className="mt-3 p-3 border rounded bg-light">
              <h6>Preview:</h6>
              <ReactMarkdown>{formik.values.instructions}</ReactMarkdown>
            </div>
          )}
          {formik.touched.instructions && formik.errors.instructions && (
              <small className="text-danger" style={{fontSize:"14px"}}>{formik.errors.instructions}</small>
            )}
        </div>

        {/* Switch */}
        <div className="d-flex align-items-center mb-4">
          <label className="me-3 fw-semibold mb-0">Is Image Required</label>
          <Switch
            checked={formik.values.isImageRequired}
            onChange={(checked) =>
              formik.setFieldValue("isImageRequired", checked)
            }
            style={{
              backgroundColor: formik.values.isImageRequired ? "#c56797" : "gray"
            }}
          />
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-end mt-4">
          <button
            type="button"
            className="btn btn-light"
            onClick={() => navigate("/categories")}
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

export default CategoryFormPage;
