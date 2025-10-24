import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import {
  deleteCategoryPlanRequest,
  updateCategoryPlanRequest,
} from "store/actions"; // adjust path
import ConfirmationModal from "components/Modals/ConfirmationModal";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { formatISOToDDMMYYYY } from "helpers/dateFormat_helper";
import CreateCategoryPlan from "./CreateCategoryPlan";
import CategoryPlanDataTable from "components/TableContainers/CategoryPlanDataTable";

const CategoryPlanTable = ({ categoryPlans, loading, totalrows, planOptions, categoryOptions }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);
  const [selectedSortData, setSelectedSortData] = useState({
    value: "createdAt",
    direction: "desc",
  });
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchString, setSearchString] = useState("");

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const hasEditPermission = permissions?.some(
    (item) => item?.permission_name === "Category plan Edit"
  );
  const hasDeletePermission = permissions?.some(
    (item) => item?.permission_name === "Category plan Delete"
  );

  // Handle deletion
  const handleDeleteConfirmed = (id) => {
    dispatch(deleteCategoryPlanRequest(id));
    setOpenModal(false);
    setConfirmAction(false);
  };

  useEffect(() => {
    if (deleteId && confirmAction) {
      handleDeleteConfirmed(deleteId);
    }
  }, [confirmAction]);

  // Table columns
  const columns = useMemo(
    () => [
      {
        header: "Plan",
        accessorKey: "plan_Id.name", // adjust based on API response
        cell: ({ row }) => <span>{row.original.plan_Id?.plan_name || "N/A"}</span>,
      },
      {
        header: "Category",
        accessorKey: "category_Id.name", // adjust based on API response
        cell: ({ row }) => <span>{row.original.category_Id?.category_name || "N/A"}</span>,
      },
      {
        header: "Per Day Limit",
        accessorKey: "per_day_limit",
      },
      {
        header: "Created At",
        accessorKey: "created_at",
        cell: ({ row }) => (
          <span>{formatISOToDDMMYYYY(row.original.createdAt)}</span>
        ),
      },
      ...(hasEditPermission || hasDeletePermission
        ? [
            {
              header: "Actions",
              id: "actions",
              cell: ({ row }) => {
                const handleEdit = () => {
                  setEditData(row.original);
                  setIsOpen(true);
                };

                const handleDelete = () => {
                  setDeleteId(row.original._id);
                  setOpenModal(true);
                };

                return (
                  <div className="d-flex gap-2">
                    {hasEditPermission && (
                      <Button color="primary" title="Edit" onClick={handleEdit}>
                        <FaRegEdit size={18} />
                      </Button>
                    )}
                    {hasDeletePermission && (
                      <Button
                        color="danger"
                        title="Delete"
                        onClick={handleDelete}
                      >
                        <MdDeleteOutline size={18} />
                      </Button>
                    )}
                  </div>
                );
              },
            },
          ]
        : []),
    ],
    [hasEditPermission, hasDeletePermission]
  );

  const handleFormSubmit = (id, data, onClose) => {
    dispatch(updateCategoryPlanRequest(id, data));
    if (onClose) onClose();
  };

  return (
    <>
      {/* Confirmation Modal */}
      <ConfirmationModal
        okText="Confirm"
        onCancel={() => setOpenModal(false)}
        onOk={() => setConfirmAction(true)}
        isVisible={openModal}
        title="Delete Category Plan"
        content="Are you sure you want to delete this category plan?"
      />

      {/* Edit/Create Modal */}
      <CreateCategoryPlan
        visible={isOpen}
        initialData={editData}
        onSubmit={handleFormSubmit}
        handleClose={() => setIsOpen(false)}
        planOptions={planOptions}
        categoryOptions={categoryOptions}
      />

      {/* Data Table */}
      <div className="container-fluid">
        <CategoryPlanDataTable
          columns={columns}
          loading={loading}
          data={categoryPlans || []}
          isGlobalFilter
          isPagination
          selectedSortData={selectedSortData}
          setSelectedSortData={setSelectedSortData}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
          pageSize={pageSize}
          setSearchString={setSearchString}
          searchString={searchString}
          SearchPlaceholder="Search category plans..."
          pagination="pagination"
          docName="Category Plans"
          totalrows={totalrows}
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
        />
      </div>
    </>
  );
};

export default CategoryPlanTable;
