import React, { Fragment, useEffect, useRef } from "react";
import { Row, Table } from "reactstrap";
import { useReactTable, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, flexRender } from "@tanstack/react-table";
import { FadeLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import { fetchCmsRequest } from "store/Cms/actions";
import { DebouncedInput } from "helpers/common_helper";
import Pagination from "components/Common/Pagination";

const CmsDataTable = ({
  columns,
  data,
  tableClass,
  isPagination = true,
  isGlobalFilter,
  SearchPlaceholder,
  paginationWrapper,
  pagination,
  loading,
  docName = "CMS Pages",
  selectedSortData,
  setSelectedSortData,
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
  searchString,
  setSearchString,
  totalrows
}) => {
  const tableRef = useRef();
  const dispatch = useDispatch();

  // Initialize react-table
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  // For serial number
  const serialNumberColumn = {
    header: "#",
    id: "serial",
    cell: ({ row }) => pageIndex * pageSize + row.index + 1,
  };
  table.setOptions((prev) => ({
    ...prev,
    columns: [serialNumberColumn, ...columns],
  }));

  const windowSize = 3;
  const totalPages = Math.ceil(totalrows / pageSize);
  const startPage = Math.floor(pageIndex / windowSize) * windowSize;
  const endPage = Math.min(startPage + windowSize, totalPages);

  // 🔁 Fetch CMS list on filter, sort, search, or pagination
  useEffect(() => {
    if (loading) return;
    const params = {
      page: pageIndex,
      limit: pageSize,
    };

    if (selectedSortData?.value && selectedSortData?.direction) {
      params.sortBy = `${selectedSortData.value}:${selectedSortData.direction}`;
    }
    if (searchString) {
      params.search = searchString;
    }

    dispatch(fetchCmsRequest(params));
  }, [selectedSortData, pageIndex, searchString]);

  useEffect(() => {
    setPageIndex(0);
  }, [searchString]);

  const handlePageChange = (newPageIndex) => {
    setPageIndex(newPageIndex);
  };

  return (
    <Fragment>
      <Row className="mb-2">
        {isGlobalFilter && (
          <div className="d-flex justify-content-end align-items-center">
            <DebouncedInput
              value={searchString ?? ""}
              onChange={(value) => setSearchString(String(value))}
              className="form-control search-box me-2 d-inline-block"
              placeholder={SearchPlaceholder}
            />
          </div>
        )}
      </Row>

      {/* ==== Table ==== */}
      <div className="table-responsive" id="table-to-print" ref={tableRef}>
        <Table hover className={tableClass} bordered>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: "150px", verticalAlign: "middle" }}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>

                      {/* Sorting Icons */}
                      {header.column.columnDef.accessorKey && (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            const field = header.column.columnDef.accessorKey;
                            if (!field) return;

                            if (!selectedSortData || selectedSortData.value !== field) {
                              setSelectedSortData({ value: field, direction: "asc" });
                            } else if (selectedSortData.direction === "asc") {
                              setSelectedSortData({ value: field, direction: "desc" });
                            } else {
                              setSelectedSortData({ value: field, direction: "asc" });
                            }
                          }}
                        >
                          {selectedSortData?.value === header.column.columnDef.accessorKey ? (
                            selectedSortData.direction === "asc" ? (
                              <i className="mdi mdi-arrow-up" style={{ fontSize: "20px" }}></i>
                            ) : (
                              <i className="mdi mdi-arrow-down" style={{ fontSize: "20px" }}></i>
                            )
                          ) : (
                            <i className="mdi mdi-swap-vertical" style={{ fontSize: "20px" }}></i>
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center border-none">
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
                    <FadeLoader color="#00a895" size={40} />
                  </div>
                </td>
              </tr>
            ) : data?.length <= 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="text-center">
                  No Data Found
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} style={{ verticalAlign: "middle" }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </div>

      {/* ==== Pagination ==== */}
      {isPagination && totalrows > 0 && (
        <Pagination
          currentPage={pageIndex + 1}
          totalPages={totalPages}
          totalItems={totalrows}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          showInfo={true}
        />
      )}
    </Fragment>
  );
};

export default CmsDataTable;
