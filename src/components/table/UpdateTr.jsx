import React from "react";

const UpdateTr = ({ title, type, name, value, placeholder, onChange }) => {
  return (
    <tr className="border">
      <td scope="row" className="p-1 font-medium border whitespace-nowrap">
        {title}
      </td>
      <td scope="row" className="p-1 font-medium border whitespace-nowrap">
        <input
          className="w-full p-3 focus:outline-slate-300 border rounded"
          type={type}
          name={name}
          id=""
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />
      </td>
    </tr>
  );
};

export default UpdateTr;
