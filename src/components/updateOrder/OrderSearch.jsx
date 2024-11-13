import React from "react";
import { Link } from "react-router-dom";

const OrderSearch = ({ searchOrderNumber, setSearchOrderNumber }) => {
  return (
    <div className="flex items-center gap-2 p-2">
      <h2 className="font-semibold text-xl">Update Another Order</h2>
      <input
        type="text"
        className="border focus:outline-0 p-1 rounded"
        placeholder="order/case number"
        value={searchOrderNumber}
        onChange={(e) => setSearchOrderNumber(e.target.value)}
      />
      <Link
        to={`/update/${searchOrderNumber}`}
        className="p-2 bg-teal-500 text-white rounded-md "
      >
        Search
      </Link>
    </div>
  );
};

export default OrderSearch;
