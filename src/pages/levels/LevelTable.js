import React, { useState, useMemo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { formatISOToDDMMYYYY } from "helpers/dateFormat_helper";

import ConfirmationModal from "components/Modals/ConfirmationModal";
import CreateLevel from "./CreateLevel";
import LevelDataTable from "components/TableContainers/LevelDataTable";

import {
  deleteLevelRequest,
  updateLevelRequest,
} from "store/actions";

const LevelTable = ({ levels, loading, totalrows }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const permissions = JSON.parse(localStorage.getItem("permissions") || "[]");
  const hasEditPermission = permissions?.some(
    (item) => item?.permission_name === "Edit level"
  );
  const hasDeletePermission = permissions?.some(
    (item) => item?.permission_name === "Delete level"
  );

  // Handle Delete Logic
  const handleDeleteConfirmed = (id) => {
    dispatch(deleteLevelRequest(id));
    setOpenModal(false);
    setConfirmAction(false);
  };

  useEffect(() => {
    if (deleteId && confirmAction) {
      handleDeleteConfirmed(deleteId);
    }
  }, [confirmAction]);

  // Table Columns
  const columns = useMemo(
    () => [
      {
        header: "Level Name",
        accessorKey: "level_name",
      },
      {
        header: "XP Points",
        accessorKey: "xp_points",
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
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

  // Handle form submit for updating level
  const handleFormSubmit = (id, data, onClose) => {
    dispatch(updateLevelRequest(id, data, onClose));
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        okText="Confirm"
        onCancel={() => setOpenModal(false)}
        onOk={() => setConfirmAction(true)}
        isVisible={openModal}
        title="Delete Level"
        content="Are you sure you want to delete this level?"
      />

      {/* Create/Edit Modal */}
      <CreateLevel
        visible={isOpen}
        initialData={editData}
        onSubmit={handleFormSubmit}
        handleClose={() => setIsOpen(false)}
      />

      {/* Table */}
      <div className="container-fluid">
        <LevelDataTable
          columns={columns}
          loading={loading}
          data={levels || []}
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
          SearchPlaceholder="Search levels..."
          pagination="pagination"
          docName="Levels"
          totalrows={totalrows}
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
        />
      </div>
    </>
  );
};

export default LevelTable;
