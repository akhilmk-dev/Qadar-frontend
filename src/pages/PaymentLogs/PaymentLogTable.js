import React, { useState, useMemo } from "react";
import PaymentLogDataTable from "components/TableContainers/PaymentLogDataTable"; // your generic table
import { formatISOToDDMMYYYY } from "helpers/dateFormat_helper";

const PaymentLogTable = ({ logs, loading, totalrows }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [selectedSortData, setSelectedSortData] = useState({
    value: "createdAt",
    direction: "desc",
  });

  // Table columns
  const columns = useMemo(
    () => [
      {
        header: "Customer",
        accessorKey: "customerId",
        cell: ({ row }) => row.original.customer?.name|| "N/A",
      },
      {
        header: "Plan",
        accessorKey: "plan_type",
        cell: ({ row }) => `${(row.original?.metadata?.plan_type)}`,
      },
      {
        header:"Paymentintent Id",
        accessorKey:"paymentIntentId"
      },
      {
        header: "Amount",
        accessorKey: "amount",
        cell: ({ row }) => `${(row.original.amount)}`,
      },
      {
        header: "Currency",
        accessorKey: "currency",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Created At",
        accessorKey: "createdAt",
        cell: ({ row }) => formatISOToDDMMYYYY(row.original.createdAt),
      },
    ],
    []
  );

  return (
    <div className="container-fluid">
      <PaymentLogDataTable
        columns={columns}
        loading={loading}
        data={logs || []}
        isGlobalFilter
        isPagination
        selectedSortData={selectedSortData}
        setSelectedSortData={setSelectedSortData}
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        pageSize={pageSize}
        setPageSize={setPageSize}
        setSearchString={setSearchString}
        searchString={searchString}
        SearchPlaceholder="Search payments..."
        pagination="pagination"
        docName="PaymentLogs"
        totalrows={totalrows}
        paginationWrapper="dataTables_paginate paging_simple_numbers"
        tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
      />
    </div>
  );
};

export default PaymentLogTable;
