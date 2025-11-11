import React, { useMemo } from "react";
import { Button } from "reactstrap";
import CategoryDataTable from "components/TableContainers/CategoryDataTable"; // reuse
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";

const CmsTable = ({ cmsPages, loading, totalrows, onEdit }) => {
  const permissions = JSON.parse(localStorage.getItem("permissions"));
  const hasEditPermission = permissions?.some(
    (item) => item?.permission_name === "CMS Edit"
  );

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

  return (
    <CategoryDataTable
      columns={columns}
      loading={loading}
      data={cmsPages || []}
      isGlobalFilter
      isPagination
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
