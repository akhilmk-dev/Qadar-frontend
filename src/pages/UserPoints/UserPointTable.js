// UserXPPointsTable.js
import React, { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import ConfirmationModal from "components/Modals/ConfirmationModal";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import UserXPPointsDataTable from "components/TableContainers/UserXPPointsDataTable"; // similar to your RedeemSubscriptionDataTable
import {
  deleteUserXPPointsRequest,
  updateUserXPPointsRequest,
} from "store/actions"; // adjust the paths to your actual store

const UserXPPointsTable = ({ xpPoints = [], loading, totalrows }) => {
  const dispatch = useDispatch();
  const [editData, setEditData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);
  const [selectedSortData, setSelectedSortData] = useState({
    value: "totalXP",
    direction: "desc",
  });
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchString, setSearchString] = useState("");

  // Get permissions (if you have them)
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const hasEditPermission = permissions?.some(
    (item) => item?.permission_name === "XP Points Edit"
  );
  const hasDeletePermission = permissions?.some(
    (item) => item?.permission_name === "XP Points Delete"
  );

  // Handle delete confirmation
  const handleDeleteConfirmed = (id) => {
    dispatch(deleteUserXPPointsRequest(id));
    setOpenModal(false);
    setConfirmAction(false);
  };

  React.useEffect(() => {
    if (deleteId && confirmAction) {
      handleDeleteConfirmed(deleteId);
    }
  }, [confirmAction]);

  // Table columns
  const columns = useMemo(
    () => [
      {
        header: "Customer Name",
        accessorKey: "customer.name",
        cell: ({ row }) => <span>{row.original.customer?.name || "—"}</span>,
      },
      {
        header: "Email",
        accessorKey: "customer.email",
        cell: ({ row }) => <span>{row.original.customer?.email || "—"}</span>,
      },
      {
        header: "Phone",
        accessorKey: "customer.phone",
        cell: ({ row }) => <span>{row.original.customer?.phone || "—"}</span>,
      },
      {
        header: "Remarks",
        accessorKey: "remarks",
        cell: ({ row }) => (
          <span
            title={row.original.remarks}
            style={{
              display: "inline-block",
              maxWidth: "180px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {row.original.remarks || "—"}
          </span>
        ),
      },
      {
        header: "Total XP",
        accessorKey: "totalXP",
        cell: ({ row }) => <span>{row.original.totalXP || 0}</span>,
      },
      {
        header: "Joined On",
        accessorKey: "customer.createdAt",
        cell: ({ row }) => (
          <span>
            {row.original.customer?.createdAt
              ? new Date(row.original.customer.createdAt).toLocaleDateString()
              : "—"}
          </span>
        ),
      },
      // Optional Actions
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
    dispatch(updateUserXPPointsRequest(id, data));
    if (onClose) onClose();
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        okText="Confirm"
        onCancel={() => setOpenModal(false)}
        onOk={() => setConfirmAction(true)}
        isVisible={openModal}
        title="Delete XP Entry"
        content="Are you sure you want to delete this XP point entry?"
      />

      {/* Data Table */}
      <div className="container-fluid">
        <UserXPPointsDataTable
          columns={columns}
          loading={loading}
          data={xpPoints || []}
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
          SearchPlaceholder="Search XP points..."
          pagination="pagination"
          docName="UserXPPoints"
          totalrows={totalrows}
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
        />
      </div>
    </>
  );
};

export default UserXPPointsTable;
