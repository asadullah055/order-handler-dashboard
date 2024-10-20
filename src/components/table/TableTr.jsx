import React from "react";

const TableTr = ({ title, values }) => {
  return (
    <tr className="border">
      <td scope="row" className="p-3 font-medium border whitespace-nowrap">
        {title}
      </td>
      <td scope="row" className="p-3 font-medium border whitespace-nowrap">
        {values}
      </td>
    </tr>
  );
};

export default TableTr;
