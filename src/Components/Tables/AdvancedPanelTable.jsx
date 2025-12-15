/**
 * AdvancedPanelTable Component
 *
 * @description Data table with server-side pagination, sorting, and CSV export.
 * Uses react-data-table-component for table functionality.
 *
 * @component
 * @features
 * - Server-side pagination
 * - Sortable columns
 * - CSV export functionality
 * - Loading state
 * - Selectable rows
 * - Search/filter support
 *
 * @author DevToolsB Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";

function AdvancedPanelTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRows, setTotalRows] = useState(0);
  const [page, setPage] = useState(1);

  const fetchData = async (page) => {
    setLoading(true);

    const response = await fetch(`https://api.yoursite.com/data?page=${page}`);
    const result = await response.json();

    setData(result.data);
    setTotalRows(result.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const columns = [
    { name: "ID", selector: (row) => row.id, sortable: true },
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Age", selector: (row) => row.age, sortable: true },
  ];

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <div>
      <CSVLink
        data={data}
        headers={columns.map((col) => ({ label: col.name, key: col.selector }))}
      >
        Download as CSV
      </CSVLink>

      <DataTable
        columns={columns}
        data={data}
        progressPending={loading}
        pagination
        paginationServer
        paginationTotalRows={totalRows}
        onChangePage={handlePageChange}
        selectableRows
        subHeader
        subHeaderComponent={<input type="text" placeholder="Search" />}
      />
    </div>
  );
}

export default AdvancedPanelTable;
