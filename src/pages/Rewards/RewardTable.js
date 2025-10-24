import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Cookies from "js-cookie";

import ConfirmationModal from "components/Modals/ConfirmationModal";
import CreateReward from "./CreateReward";


import { deleteRewardRequest, updateRewardRequest } from "store/actions";
import RewardDataTable from "components/TableContainers/RewardDataTable";

const RewardTable = ({ rewards, loading, totalrows,levels }) => {
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

  // Permissions
  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
  const hasEditPermission = permissions?.some(
    (item) => item?.permission_name === "Edit Reward"
  );
  const hasDeletePermission = permissions?.some(
    (item) => item?.permission_name === "Delete Reward"
  );

  // Handle Delete
  const handleDeleteConfirmed = (id) => {
    dispatch(deleteRewardRequest(id));
    setOpenModal(false);
    setConfirmAction(false);
  };

  useEffect(() => {
    if (deleteId && confirmAction) {
      handleDeleteConfirmed(deleteId);
    }
  }, [confirmAction]);

  // Table Columns
  const columns = useMemo(() => {
    const baseColumns = [
      {
        header: "Reward Name",
        accessorKey: "reward_name",
      },
      {
        header: "Badge",
        accessorKey: "badge_image",
        cell: ({ row }) => (
          <img
            src={row.original.badge_image}
            alt="badge"
            width="50"
            style={{ objectFit: "contain" }}
          />
        ),
      },
      {
        header: "Level",
        accessorKey: "level_Id.level_name",
        cell: ({ row }) => (
          <span>{row.original?.level_Id?.level_name || "N/A"}</span>
        ),
      },
    ];

    if (hasEditPermission || hasDeletePermission) {
      baseColumns.push({
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
      });
    }

    return baseColumns;
  }, [hasEditPermission, hasDeletePermission]);

  // Handle form submit
  const handleFormSubmit = (id, formData, onClose) => {
    dispatch(updateRewardRequest(id, formData, onClose));
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        okText="Confirm"
        onCancel={() => setOpenModal(false)}
        onOk={() => setConfirmAction(true)}
        isVisible={openModal}
        title="Delete Reward"
        content="Are you sure you want to delete this reward?"
      />

      {/* Create/Edit Modal */}
      <CreateReward
        visible={isOpen}
        handleClose={() => setIsOpen(false)}
        initialData={editData}
        onSubmit={handleFormSubmit}
        levels={levels}
      />

      {/* Table */}
      <div className="container-fluid">
        <RewardDataTable
          columns={columns}
          loading={loading}
          data={rewards || []}
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
          SearchPlaceholder="Search rewards..."
          pagination="pagination"
          docName="Rewards"
          totalrows={totalrows}
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
        />
      </div>
    </>
  );
};

export default RewardTable;
