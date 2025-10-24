import React, { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "reactstrap";
import { MdDeleteOutline } from "react-icons/md";
import ConfirmationModal from "components/Modals/ConfirmationModal";
import { deleteUserTokenRequest } from "store/actions";
import UserTokenDataTable from "components/TableContainers/UserTokenDataTable";
import { formatISOToDDMMYYYY } from "helpers/dateFormat_helper";

const UserTokenTable = ({ tokens, loading, totalrows }) => {
  const dispatch = useDispatch();
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

  // Permission handling (if applicable)
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const hasDeletePermission = permissions?.some(
    (item) => item?.permission_name === "Token Delete"
  );


  // Table columns
  const columns = useMemo(
    () => [
      {
        header: "Customer Name",
        accessorKey: "customer_Id.name",
        cell: ({ row }) => <span>{row.original?.customer_Id?.name || "-"}</span>,
      },
      {
        header: "Tokens",
        accessorKey: "tokens",
      },
      {
        header: "Type",
        accessorKey: "type",
      },
      {
        header: "Remarks",
        accessorKey: "remarks",
        cell: ({ row }) => <span>{row.original?.remarks || "-"}</span>,
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ row }) => (
          <span>{formatISOToDDMMYYYY(row.original.createdAt)}</span>
        ),
      },
    ],
    [hasDeletePermission]
  );

  return (
    <>
      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        okText="Confirm"
        onCancel={() => setOpenModal(false)}
        onOk={() => setConfirmAction(true)}
        isVisible={openModal}
        title="Delete Token"
        content="Are you sure you want to delete this token entry?"
      />

      {/* Token Table */}
      <div className="container-fluid">
        <UserTokenDataTable
          columns={columns}
          loading={loading}
          data={tokens || []}
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
          SearchPlaceholder="Search user tokens..."
          pagination="pagination"
          docName="User Tokens"
          totalrows={totalrows}
          paginationWrapper="dataTables_paginate paging_simple_numbers"
          tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
        />
      </div>
    </>
  );
};

export default UserTokenTable;
