import React, { useMemo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { deleteCategoryRequest } from "store/actions";
import ConfirmationModal from "components/Modals/ConfirmationModal";
import CategoryDataTable from "components/TableContainers/CategoryDataTable";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { formatISOToDDMMYYYY } from "helpers/dateFormat_helper";

const CategoryTable = ({ categories, loading, totalrows, onEdit }) => {
  const dispatch = useDispatch();
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [selectedSortData, setSelectedSortData] = useState({
    value: "createdAt",
    direction: "desc",
  })
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const hasEditPermission = permissions?.some(
    (item) => item?.permission_name === "Category Edit"
  );
  const hasDeletePermission = permissions?.some(
    (item) => item?.permission_name === "Category Delete"
  );

  useEffect(() => {
    if (deleteId && confirmAction) {
      dispatch(deleteCategoryRequest(deleteId));
      setOpenModal(false);
      setConfirmAction(false);
    }
  }, [confirmAction]);

const columns = useMemo(
  () => [
    {
      header: "Category Name",
      accessorKey: "category_name",
      cell: ({ getValue }) => getValue() || "N/A",
    },
    {
      header: "Category Name (ar)",
      accessorKey: "category_name_ar",
      cell: ({ getValue }) => getValue() || "N/A",
    },
    {
      header: "AI Model",
      accessorKey: "ai_model",
      cell: ({ getValue }) => getValue() || "N/A",
    },
    {
      header: "Tokens",
      accessorKey: "tokens",
      cell: ({ getValue }) => getValue() || "N/A",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) =>
        row.original.createdAt
          ? formatISOToDDMMYYYY(row.original.createdAt)
          : "N/A",
    },
    ...(hasEditPermission || hasDeletePermission
      ? [
          {
            header: "Actions",
            id: "actions",
            cell: ({ row }) => {
              const category = row.original;
              const handleDelete = () => {
                setDeleteId(category._id);
                setOpenModal(true);
              };

              return (
                <div className="d-flex gap-2">
                  {hasEditPermission && (
                    <Button
                      color="primary"
                      title="Edit"
                      onClick={() => onEdit(category._id)}
                    >
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


  return (
    <>
      <ConfirmationModal
        okText="Confirm"
        onCancel={() => setOpenModal(false)}
        onOk={() => setConfirmAction(true)}
        isVisible={openModal}
        title="Delete Category"
        content="Are you sure you want to delete this category?"
      />

      <div className="container-fluid">
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
      </div>
    </>
  );
};

export default CategoryTable;
