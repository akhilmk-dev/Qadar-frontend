import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { deleteRitualRequest, updateRitualRequest } from "store/actions";
import ConfirmationModal from "components/Modals/ConfirmationModal";
import RitualDataTable from "components/TableContainers/RitualDataTable"; // generic table
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { formatISOToDDMMYYYY } from "helpers/dateFormat_helper";
import CreateRitual from "./CreateRitual";

const RitualTable = ({ rituals, loading, totalrows }) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);
  const [selectedSortData, setSelectedSortData] = useState({
    value: "date",
    direction: "desc",
  });
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchString, setSearchString] = useState("");

  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const hasEditPermission = permissions?.some(
    (item) => item?.permission_name === "Ritual Edit"
  );
  const hasDeletePermission = permissions?.some(
    (item) => item?.permission_name === "Ritual Delete"
  );

  // Handle deletion
  const handleDeleteConfirmed = (id) => {
    dispatch(deleteRitualRequest(id));
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
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Source",
        accessorKey: "source",
      },
      {
        header: "Date",
        accessorKey: "date",
        cell: ({ row }) => <span>{formatISOToDDMMYYYY(row.original.date)}</span>,
      },
      {
        header: "Time",
        accessorKey: "time",
      },
      {
        header: "Recurring",
        accessorKey: "recurring",
        cell: ({ row }) => <span>{row.original.recurring ? "Yes" : "No"}</span>,
      },
      {
        header: "Recurring Type",
        accessorKey: "recurrenceType",
        cell: ({ row }) => <span>{row.original.recurrenceType || 'N/A'}</span>,
      },
      {
        header: "Visibility",
        accessorKey: "visibility",
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
                      <Button color="danger" title="Delete" onClick={handleDelete}>
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
    dispatch(updateRitualRequest(id, data, onClose));
  };

  return (
    <>
      {/* Confirmation Modal */}
      <ConfirmationModal
        okText="Confirm"
        onCancel={() => setOpenModal(false)}
        onOk={() => setConfirmAction(true)}
        isVisible={openModal}
        title="Delete Ritual"
        content="Are you sure you want to delete this ritual?"
      />

      {/* Edit/Create Modal */}
      {isOpen && (
        <CreateRitual
        visible={isOpen}
        initialData={editData}
        onSubmit={handleFormSubmit}
        handleClose={() => setIsOpen(false)}
        />
      )}

      {/* Data Table */}
      <div className="container-fluid">
        <RitualDataTable
          columns={columns}
          loading={loading}
          data={rituals || []}
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
          SearchPlaceholder="Search rituals..."
          pagination="pagination"
          docName="Rituals"
          totalrows={totalrows}
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
        />
      </div>
    </>
  );
};

export default RitualTable;
