import React from "react";

const ClaimTypeRow = ({ title, value, cClass }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 border-b pb-1">
      <p className="sm:w-[35%] w-full font-semibold whitespace-nowrap">
        {title}
      </p>
      <p className="text-center">
        <span className={cClass}>{value}</span>
      </p>
    </div>
  );
};

export default ClaimTypeRow;
