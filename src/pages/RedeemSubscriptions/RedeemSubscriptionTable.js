// RedeemSubscriptionTable.js
import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import {
  deleteRedeemSubscriptionRequest,
  updateRedeemSubscriptionRequest,
} from "store/actions"; // adjust import paths
import ConfirmationModal from "components/Modals/ConfirmationModal";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import RedeemSubscriptionDataTable from "components/TableContainers/RedeemSubscriptionDataTable";

const RedeemSubscriptionTable = ({ redeemSubscriptions, loading, totalrows }) => {
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
    (item) => item?.permission_name === "Redeem Subscription Edit"
  );
  const hasDeletePermission = permissions?.some(
    (item) => item?.permission_name === "Redeem Subscription Delete"
  );

  // Handle deletion
  const handleDeleteConfirmed = (id) => {
    dispatch(deleteRedeemSubscriptionRequest(id));
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
        header: "Customer",
        accessorKey: "customer.name",
        cell: ({ row }) => <span>{row.original.customer?.name}</span>,
      },
      {
        header: "Redeem Plan",
        accessorKey: "plan.reedem_plan_name",
        cell: ({ row }) => <span>{row.original.plan?.reedem_plan_name}</span>,
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ row }) => (
          <span>{new Date(row.original.createdAt).toLocaleDateString()}</span>
        ),
      },
      // Uncomment below if actions are needed
      // ...(hasEditPermission || hasDeletePermission
      //   ? [
      //       {
      //         header: "Actions",
      //         id: "actions",
      //         cell: ({ row }) => {
      //           const handleEdit = () => {
      //             setEditData(row.original);
      //             setIsOpen(true);
      //           };

      //           const handleDelete = () => {
      //             setDeleteId(row.original._id);
      //             setOpenModal(true);
      //           };

      //           return (
      //             <div className="d-flex gap-2">
      //               {hasEditPermission && (
      //                 <Button color="primary" title="Edit" onClick={handleEdit}>
      //                   <FaRegEdit size={18} />
      //                 </Button>
      //               )}
      //               {hasDeletePermission && (
      //                 <Button color="danger" title="Delete" onClick={handleDelete}>
      //                   <MdDeleteOutline size={18} />
      //                 </Button>
      //               )}
      //             </div>
      //           );
      //         },
      //       },
      //     ]
      //   : []),
    ],
    [hasEditPermission, hasDeletePermission]
  );

  const handleFormSubmit = (id, data, onClose) => {
    dispatch(updateRedeemSubscriptionRequest(id, data));
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
        title="Delete Redeem Subscription"
        content="Are you sure you want to delete this redeem subscription?"
      />

      {/* Edit/Create Modal */}
      {/* <CreateRedeemSubscription
        visible={isOpen}
        initialData={editData}
        onSubmit={handleFormSubmit}
        handleClose={() => setIsOpen(false)}
      /> */}

      {/* Data Table */}
      <div className="container-fluid">
        <RedeemSubscriptionDataTable
          columns={columns}
          loading={loading}
          data={redeemSubscriptions || []}
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
          SearchPlaceholder="Search redeem subscriptions..."
          pagination="pagination"
          docName="RedeemSubscriptions"
          totalrows={totalrows}
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
        />
      </div>
    </>
  );
};

export default RedeemSubscriptionTable;
