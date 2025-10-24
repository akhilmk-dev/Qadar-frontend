import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import Breadcrumb from "components/Common/Breadcrumb2";
import RitualTable from "./RitualTable";
import { fetchRitualsRequest, addRitualRequest } from "store/actions";
import CreateRitual from "./CreateRitual";

const RitualList = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const rituals = useSelector((state) => state.Ritual.rituals);
  const loading = useSelector((state) => state.Ritual.loading);
  const error = useSelector((state) => state.Ritual.error);

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const hasAddPermission = permissions?.some(
    (item) => item?.permission_name === "Ritual Add"
  );

  const handleSubmit = (data, onClose) => {
    dispatch(addRitualRequest(data, onClose));
  };

  const handleClose = () => setIsOpen(false);

  return (
    <>
      {/* Modal for creating a ritual */}
      {isOpen && (
        <CreateRitual
        visible={isOpen}
        onSubmit={handleSubmit}
        handleClose={handleClose}
        />
      )}

      <div className="page-content container-fluid">
        {/* Page header */}
        <div className="d-flex justify-content-between align-items-center mx-3 mb-3">
          <Breadcrumb
            title="Rituals"
            breadcrumbItems={[
              { title: "Dashboard", link: "/dashboard" },
              { title: "Rituals", link: "#" },
            ]}
          />

          {hasAddPermission && (
            <Button
              className="bg-primary text-white d-flex justify-content-center gap-1 align-items-center"
              onClick={() => setIsOpen(true)}
            >
              <i className="ti-plus"></i> Add New
            </Button>
          )}
        </div>

        {/* Rituals table */}
        <RitualTable
          rituals={rituals?.data || []}
          totalrows={rituals?.total}
          loading={loading}
          error={error}
        />
      </div>
    </>
  );
};

export default RitualList;
