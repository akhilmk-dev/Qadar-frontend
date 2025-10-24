import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { deleteCategoryRequest, updateCategoryRequest } from "store/actions";
import ConfirmationModal from "components/Modals/ConfirmationModal";
import DataTable from "components/TableContainers/UserDataTable"; // reuse your generic table container
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { formatISOToDDMMYYYY } from "helpers/dateFormat_helper";
import CreateCategory from "./CreateCategorie";
import CategoryDataTable from "components/TableContainers/CategoryDataTable";

const CategoryTable = ({ categories, loading, totalrows }) => {
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
    (item) => item?.permission_name === "Categorie Edit"
  );
  const hasDeletePermission = permissions?.some(
    (item) => item?.permission_name === "Categorie Delete"
  );

  // Handle deletion
  const handleDeleteConfirmed = (id) => {
    dispatch(deleteCategoryRequest(id));
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
        header: "Category Name",
        accessorKey: "category_name",
      },
      {
        header: "AI Model",
        accessorKey: "ai_model",
      },
      {
        header: "Tokens",
        accessorKey: "tokens",
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
    dispatch(updateCategoryRequest(id, data, onClose));
  };

  return (
    <>
      {/* Confirmation Modal */}
      <ConfirmationModal
        okText="Confirm"
        onCancel={() => setOpenModal(false)}
        onOk={() => setConfirmAction(true)}
        isVisible={openModal}
        title="Delete Category"
        content="Are you sure you want to delete this category?"
      />

      {/* Edit/Create Modal */}
      <CreateCategory
        visible={isOpen}
        initialData={editData}
        onSubmit={handleFormSubmit}
        handleClose={() => setIsOpen(false)}
      />

      {/* Data Table */}
      <div className="container-fluid">
        <CategoryDataTable
          columns={columns}
          loading={loading}
          data={categories || []}
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
          SearchPlaceholder="Search categories..."
          pagination="pagination"
          docName="Categories"
          totalrows={totalrows}
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
        />
      </div>
    </>
  );
};

export default CategoryTable;
