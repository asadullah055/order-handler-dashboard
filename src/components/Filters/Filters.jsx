import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { get_all_order } from "../../features/order/orderSlice";
import {
  setClaim,
  setClaimStatus,
  setOrderStatus,
  setSettled,
} from "../../features/orderFilter/orderFilterSlice";
import MultiSelectDropdown from "./../MultiSelect";

const Filters = ({ orderNumber, setOrderNumber, setCurrentPage }) => {
  const [selectedDateType, setSelectedDateType] = useState("");
  const [dateValue, setDateValue] = useState("");
  const dispatch = useDispatch();

  const handleDateTypeChange = (e) => {
    setSelectedDateType(e.target.value);
  };

  useEffect(() => {
    if (selectedDateType && dateValue) {
      const payload = {
        [selectedDateType]: dateValue,
      };
      dispatch(get_all_order(payload));
    }
  }, [selectedDateType, dateValue, dispatch]);
  const handleReset = () => {
    setOrderNumber("");
    setSelectedDateType("");
    setDateValue("");
    dispatch(setOrderStatus([]));
    dispatch(setClaim([]));
    dispatch(setClaimStatus([]));
    dispatch(setSettled([]));

    setCurrentPage(1);
  };
  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="flex md:flex-row md:gap-x-2 md:items-center flex-col items-start gap-y-2 ">
          <h2 className="whitespace-nowrap">Filter Date</h2>
          <select
            className="border p-2 focus:outline-0 rounded w-[50%]"
            value={selectedDateType}
            onChange={handleDateTypeChange}
          >
            <option value="">---select---</option>
            <option value="date">Drop Date</option>
            <option value="dfMailDate">DF Mail Date</option>
            <option value="receivedDate">Received Date</option>
          </select>

          <input
            type="date"
            className="p-2 border rounded focus:outline-gray-200 w-[50%]"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
            disabled={!selectedDateType}
          />
        </div>
        <div className="flex items-center gap-2 p-1">
          <h2 className="whitespace-nowrap">Filter Type</h2>
          <MultiSelectDropdown />
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
            onChange={(e) => {
              setOrderNumber(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Order number"
          />
          <button
            type="button"
            onClick={handleReset}
            className="bg-red-500 font-poppin text-white font-medium px-3 py-2 rounded-md"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
