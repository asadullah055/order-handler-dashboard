import React from "react";

const ClaimTypeRow = ({ title, value }) => {
  return (
    <div className="flex flex-col md:flex-row items-start gap-2 border-b pb-1">
      <p className="w-[35%]">{title}</p>
      <p className="text-center">{value}</p>
    </div>
  );
};

export default ClaimTypeRow;
