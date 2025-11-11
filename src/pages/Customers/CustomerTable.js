import React, { useState, useMemo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "reactstrap";
import { deleteCustomerRequest, updateCustomerRequest } from "store/actions";
import CreateCustomer from "./CreateCustomer";
import ConfirmationModal from "components/Modals/ConfirmationModal";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import UserDataTable from "components/TableContainers/UserDataTable"; 
import { formatISOToDDMMYYYY } from "helpers/dateFormat_helper";
import CustomerDataTable from "components/TableContainers/CustomerDataTable";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const CustomerTable = ({ customers, loading, totalrows }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(false);
  const [selectedSortData, setSelectedSortData] = useState({ value: "createdAt", direction: "desc" });
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchString, setSearchString] = useState("");
  const permissions  =  JSON.parse(localStorage.getItem('permissions'));
  const hasEditPermission = permissions?.some(item=> item?.permission_name == "Customer Edit")
  const hasDeletePermission = permissions?.some(item=> item?.permission_name == "Customer Delete")
  
  // Delete logic
  const handleDeleteConfirmed = (id) => {
    dispatch(deleteCustomerRequest(id));
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
      cell:({row})=>(
        <span style={{color:"#c56797",cursor:"pointer"}} onClick={()=>navigate(`/customerDetails/${row.original?._id}`)}>{row.original?.name}</span>
      )
    },
    {
      header: "Email",
      accessorKey: "email",
      showFilter:false,
    },
    {
        header: "Date of birth",
        accessorKey: "date_of_birth",
        cell: ({ row }) => (
          <span>{formatISOToDDMMYYYY(row.original.date_of_birth)}</span>
        ),
      },
    {
      header: "Phone",
      accessorKey: "phone",
      showFilter:false,
    },
    {
      header: "Gender",
      accessorKey: "gender",
      cell:({row})=>(
        <span>{row?.original?.gender || 'N/A'}</span>
  )
    },
    {
      header:'Relationship status',
      accessorKey:'relationship_status',
      showFilter:false,
      cell:({row})=>(
        <span>{row?.original?.relationship_status || 'N/A'}</span>
      )
    },
    {
      header:"Work status",
      accessorKey:'work_status',
      showFilter:false,
      cell:({row})=>(
        <span>{row?.original?.work_status || 'N/A'}</span>
      )
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      cell: ({ row }) => (
        <span>{formatISOToDDMMYYYY(row.original.createdAt)}</span>
      ),
    },
    ...(hasEditPermission || hasDeletePermission)?[{
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
            {<Button color="primary" title="Edit" onClick={handleEdit}>
              <FaRegEdit size={18} />
            </Button>}
            {<Button color="danger" title="Delete" onClick={handleDelete}>
              <MdDeleteOutline size={18} />
            </Button>}
          </div>
        );
      },
    }]:[],
  ], [hasEditPermission,hasDeletePermission]);

  const handleFormSubmit = (id, data, onClose) => {
    dispatch(updateCustomerRequest(id, data, onClose));
  };

  return (
    <>
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        okText="Confirm"
        onCancel={() => setOpenModal(false)}
        onOk={() => setConfirmAction(true)}
        isVisible={openModal}
        title="Delete Customer"
        content="Are you sure you want to delete this customer?"
      />

      {/* Create/Edit Modal */}
      <CreateCustomer
        visible={isOpen}
        initialData={editData}
        onSubmit={handleFormSubmit}
        handleClose={() => setIsOpen(false)}
      />

      {/* Customer Table */}
      <div className="container-fluid">
        <CustomerDataTable
          columns={columns}
          loading={loading}
          data={customers || []}
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
          SearchPlaceholder="Search customers..."
          pagination="pagination"
          docName="Customers"
          totalrows={totalrows}
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
        />
      </div>
    </>
  );
};

export default CustomerTable;
