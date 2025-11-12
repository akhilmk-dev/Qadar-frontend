import React, { useMemo, useState } from "react";
import { Button } from "reactstrap";
import CategoryDataTable from "components/TableContainers/CategoryDataTable"; // reuse
import { FaRegEdit } from "react-icons/fa";
import { useDispatch } from "react-redux";

const CmsTable = ({ cmsPages, loading, totalrows, onEdit }) => {
  const dispatch = useDispatch();

  //  Pagination, sorting, and search states (required for the DataTable)
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [selectedSortData, setSelectedSortData] = useState({
    value: "createdAt",
    direction: "desc",
  });

  //  Permissions (use the correct permission names)
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const hasEditPermission = permissions?.some(
    (item) => item?.permission_name === "CMS Page Edit"
  );

  //  Table Columns
  const columns = useMemo(
    () => [
      {
        header: "Page Name",
        accessorKey: "page_name",
      },
      {
        header: "Page Name (ar)",
        accessorKey: "page_name_ar",
      },
      ...(hasEditPermission
        ? [
            {
              header: "Actions",
              id: "actions",
              cell: ({ row }) => (
                <Button
                  color="primary"
                  title="Edit"
                  onClick={() => onEdit(row.original._id)}
                >
                  <FaRegEdit size={18} />
                </Button>
              ),
            },
          ]
        : []),
    ],
    [hasEditPermission]
  );

  //  Return DataTable with required pagination props
  return (
    <CategoryDataTable
      columns={columns}
      loading={loading}
      data={cmsPages || []}
      isGlobalFilter
      isPagination
      selectedSortData={selectedSortData}
      setSelectedSortData={setSelectedSortData}
      pageIndex={pageIndex}
      setPageIndex={setPageIndex}
      pageSize={pageSize}
      setPageSize={setPageSize}
      searchString={searchString}
      setSearchString={setSearchString}
      SearchPlaceholder="Search CMS Pages..."
      pagination="pagination"
      docName="CMS Pages"
      totalrows={totalrows}
      paginationWrapper="dataTables_paginate paging_simple_numbers"
      tableClass="table-bordered table-nowrap dt-responsive nowrap w-100 dataTable no-footer dtr-inline"
    />
  );
};

export default CmsTable;
