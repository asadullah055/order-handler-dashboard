import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setClaim,
  setClaimStatus,
  setDateFilter,
  setOrderStatus,
  setSettled,
} from "../../features/orderFilter/orderFilterSlice";
import MultiSelectDropdown from "./../MultiSelect";

const Filters = ({ orderNumber, setOrderNumber, setCurrentPage }) => {
  const [dateType, setDateType] = useState("");
  const [dateValue, setDateValue] = useState(""); // Local state for date input value
  const dispatch = useDispatch();

  // Access selected date type from Redux state

  // Handle date type change without resetting the date value
  const handleDateTypeChange = (e) => {
    const newDateType = e.target.value;
    setDateType(newDateType); // Update the date type

    // Dispatch the new date type without resetting the date value
    if (dateValue) {
      dispatch(setDateFilter({ key: newDateType, value: dateValue }));
    }
  };

  // Handle date value change
  const handleDateValueChange = (e) => {
    const newDateValue = e.target.value;
    setDateValue(newDateValue); // Update the local date value

    // Dispatch the date type and the new date value to the Redux store
    if (dateType && newDateValue) {
      dispatch(setDateFilter({ key: dateType, value: newDateValue }));
    }
  };

  // Reset filters when the reset button is clicked
  const handleReset = () => {
    setOrderNumber("");
    setDateType("");
    setDateValue(""); // Clear the date input
    dispatch(setDateFilter({ key: "", value: "" })); // Reset the date filter in Redux
    dispatch(setOrderStatus([]));
    dispatch(setClaim([]));
    dispatch(setClaimStatus([]));
    dispatch(setSettled([]));
    setCurrentPage(1);
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <div className="flex md:flex-row md:gap-x-2 md:items-center flex-col items-start gap-y-2">
          <h2 className="whitespace-nowrap">Filter Date</h2>
          <select
            className="border p-2 focus:outline-0 rounded w-[50%]"
            value={dateType}
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
            value={dateValue} // Maintain the date value
            onChange={() => {
              handleDateValueChange, setCurrentPage(1);
            }}
            disabled={!dateType} // Only enable if a date type is selected
          />
        </div>
        <div className="flex items-center gap-2 p-1">
          <h2 className="whitespace-nowrap">Filter Type</h2>
          <MultiSelectDropdown setCurrentPage={setCurrentPage} />
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
