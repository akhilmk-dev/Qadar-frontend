import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import {
  deleteAffirmationRequest,
  updateAffirmationRequest,
} from "store/actions"; // adjust import paths
import ConfirmationModal from "components/Modals/ConfirmationModal";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { formatISOToDDMMYYYY } from "helpers/dateFormat_helper";
import AffirmationDataTable from "components/TableContainers/AffirmationDataTable"; // generic table container
import CreateAffirmation from "./CreateAffirmation";

const AffirmationTable = ({ affirmations, loading, totalrows, moodOptions }) => {
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
    (item) => item?.permission_name === "Affirmation Edit"
  );
  const hasDeletePermission = permissions?.some(
    (item) => item?.permission_name === "Affirmation Delete"
  );

  // Handle deletion
  const handleDeleteConfirmed = (id) => {
    dispatch(deleteAffirmationRequest(id));
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
        header: "Text",
        accessorKey: "text",
        cell: ({ row }) => (
          <span
            title={row.original.text} 
            style={{
              display: "inline-block",
              maxWidth: "250px", 
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              verticalAlign: "middle",
            }}
          >
            {row.original.text}
          </span>
        )
      },
      {
        header: "Language",
        accessorKey: "langCode",
      },
      {
        header: "Mood",
        accessorKey: "moodId",
        cell: ({ row }) => <span>{row.original.moodId?.mood_name}</span>,
      },
      {
        header: "Active",
        accessorKey: "active",
        cell: ({ row }) => <span>{row.original.active ? "Yes" : "No"}</span>,
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
                      <Button
                        color="primary"
                        title="Edit"
                        onClick={handleEdit}
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

  const handleFormSubmit = (id, data, onClose) => {
    dispatch(updateAffirmationRequest(id, data));
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
        title="Delete Affirmation"
        content="Are you sure you want to delete this affirmation?"
      />

      {/* Edit/Create Modal */}
      <CreateAffirmation
        visible={isOpen}
        initialData={editData}
        onSubmit={handleFormSubmit}
        handleClose={() => setIsOpen(false)}
        moodOptions={moodOptions}
      />

      {/* Data Table */}
      <div className="container-fluid">
        <AffirmationDataTable
          columns={columns}
          loading={loading}
          data={affirmations || []}
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
          SearchPlaceholder="Search affirmations..."
          pagination="pagination"
          docName="Affirmations"
          totalrows={totalrows}
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
        />
      </div>
    </>
  );
};

export default AffirmationTable;
