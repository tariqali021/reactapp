import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data, sortColumn, sortData }) => {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} sortData={sortData} />
      <TableBody columns={columns} data={data} />
    </table>
  );
};

export default Table;
