import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { deleteUserRequest, updateUserRequest } from "store/actions";
import CreateUser from "./CreateUser";
import ConfirmationModal from "components/Modals/ConfirmationModal";
import TableContainer from '../../components/Common/DataTableContainer';
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import UserDataTable from "components/TableContainers/UserDataTable";
import { formatISOToDDMMYYYY } from "helpers/dateFormat_helper";
import Cookies from "js-cookie";


const UserTable = ({ users, loading,totalrows ,roles}) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);
  const [selectedSortData, setSelectedSortData] = useState({ value: "createdAt", direction: "desc" });
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchString, setSearchString] = useState("");
  const user = useSelector(state=>state?.Login.user);
  const permissions  =  JSON.parse(localStorage.getItem('permissions'));
  const hasEditPermission = permissions?.some(item=> item?.permission_name == "User Edit")
  const hasDeletePermission = permissions?.some(item=> item?.permission_name == "User Delete")

  // Handle deletion
  const handleDeleteConfirmed = (id) => {
    dispatch(deleteUserRequest(id));
    setOpenModal(false);
    setConfirmAction(false);
  };

  useEffect(() => {
    if (deleteId && confirmAction) {
      handleDeleteConfirmed(deleteId);
    }
  }, [confirmAction]);
  
    // Table columns
  const columns = useMemo(() => [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
      showFilter:false
    },
    {
      header: "Phone",
      accessorKey: "phone",
    },
    {
      header: "Created At",
      accessorKey: "created_at",
      cell:({row})=>(
        <span>{formatISOToDDMMYYYY(row.original.createdAt)}</span>
      )
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
      : [])
  ], [hasEditPermission, hasDeletePermission]);
  
  const handleFormSubmit = (id,data, onClose) => {
    dispatch(updateUserRequest(id,data, onClose));
  };

  return (
    <>
      {/* Confirmation Modal */}
      <ConfirmationModal
        okText="Confirm"
        onCancel={() => setOpenModal(false)}
        onOk={() => setConfirmAction(true)}
        isVisible={openModal}
        title="Delete User"
        content="Are you sure you want to delete this user?"
      />

      {/* Edit/Create Modal */}
      <CreateUser
        visible={isOpen}
        initialData={editData}
        onSubmit={handleFormSubmit}
        handleClose={() => setIsOpen(false)}
        roles={roles}
      />

      {/* Data Table */}
      <div className="container-fluid">
        <UserDataTable
          columns={columns}
          loading={loading}
          data={users || []}
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
          SearchPlaceholder="Search users..."
          pagination="pagination"
          docName="Users"
          totalrows={totalrows}
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
        />
      </div>
    </>
  );
};

export default UserTable;
