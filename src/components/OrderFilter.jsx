import React, { useState } from "react";

const OrderFilter = () => {
  // State variables to store filter values
  const [status, setStatus] = useState("");
  const [claim, setClaim] = useState("");
  const [claimApproved, setClaimApproved] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  const handleSearch = () => {
    /*  console.log({
      status,
      claim,
      claimApproved,
      orderNumber,
    }); */
  };

  return (
    <div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-3 p-2">
        <div className="flex items-center gap-2">
          <h2 className="w-[50%] md:w-fit">Status</h2>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="focus:outline-slate-200 border rounded md:w-[70%] w-[50%] p-2 "
          >
            <option className="text-center" value="">
              --select--
            </option>
            <option className="p-2" value="transit">
              Transit
            </option>
            <option value="Delivered">Delivered</option>
            <option value="Delivery Failed">Delivery Failed</option>
            <option value="Return">Return</option>
            <option value="Not Drop">Not Drop</option>
            <option value="Item Loss">Item Loss</option>
            <option value="Scraped">Scraped</option>
            <option value="No Return Yet">No Return Yet</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <h2 className="w-[50%] md:w-fit">Claim</h2>
          <select
            value={claim}
            onChange={(e) => setClaim(e.target.value)}
            className="focus:outline-slate-200 border rounded md:w-[70%] w-[50%] p-2"
          >
            <option className="text-center" value="">
              --select--
            </option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <h2 className="w-[50%]">Claim Approved</h2>
          <select
            value={claimApproved}
            onChange={(e) => setClaimApproved(e.target.value)}
            className="focus:outline-slate-200 border rounded md:w-[70%] w-[50%] p-2"
          >
            <option className="text-center" value="">
              --select--
            </option>
            <option value="Approved">Approved</option>
            <option value="Reject">Reject</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:flex items-center px-2 py-4">
        <label htmlFor="orderNumber">Order Number:</label>
        <div className="flex items-center flex-wrap gap-2">
          <input
            className="focus:outline-gray-200 p-2 ml-2 border rounded"
            id="orderNumber"
            type="text"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            placeholder="Order number"
          />

          <button
            type="button"
            onClick={handleSearch}
            className="bg-[#00b795] font-poppin text-white font-medium px-3 py-2 rounded-md"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderFilter;
