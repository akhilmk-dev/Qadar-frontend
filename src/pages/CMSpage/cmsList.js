import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "components/Common/Breadcrumb2";
import { fetchCmsRequest } from "store/Cms/actions";
import CmsTable from "./CmsTable";

const CmsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cmsPages = useSelector((state) => state.Cms.cmsPages);
  const loading = useSelector((state) => state.Cms.loading);
  const error = useSelector((state) => state.Cms.error);

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const hasAddPermission = permissions?.some(
    (item) => item?.permission_name === "CMS Page Add"
  );

  const handleAddNew = () => navigate("/createCms");
  const handleEdit = (id) => navigate(`/createCms?id=${id}`);

  //  Fetch data on mount
  useEffect(() => {
    const params = { page: 0, limit: 10 };
    console.log(" Dispatching fetchCmsRequest:", params);
    dispatch(fetchCmsRequest(params));
  }, [dispatch]);

  return (
    <div className="page-content container-fluid">
      <div className="d-flex justify-content-between align-items-center mx-3">
        <Breadcrumb
          title="CMS Pages"
          breadcrumbItems={[
            { title: "Dashboard", link: "/dashboard" },
            { title: "CMS Pages", link: "#" },
          ]}
        />

        {hasAddPermission && (
          <Button
            className="bg-primary text-white d-flex justify-content-center gap-1 align-items-center"
            onClick={handleAddNew}
          >
            <i className="ti-plus"></i> Add New
          </Button>
        )}
      </div>

      <CmsTable
        cmsPages={cmsPages?.data || []}
        totalrows={cmsPages?.total}
        loading={loading}
        error={error}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default CmsList;
