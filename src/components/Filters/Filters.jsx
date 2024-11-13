import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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

  const dispatch = useDispatch();
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  // Format the dates to "YYYY-MM-DD"
  const formattedStartDate = startDate?.toLocaleDateString("en-CA");
  const formattedEndDate = endDate?.toLocaleDateString("en-CA");

  // Handle date type change without resetting the date value
  const handleDateTypeChange = (e) => {
    const newDateType = e.target.value;
    setDateType(newDateType);
    // Dispatch date range if selected
    if (formattedStartDate && formattedEndDate) {
      dispatch(
        setDateFilter({
          key: newDateType,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        })
      );
    }
  };

  // Handle DatePicker date range change
  const handleDateRangeChange = (update) => {
    setDateRange(update);
    setCurrentPage(1);
    if (dateType && update[0] && update[1]) {
      const formattedStartDate = update[0].toLocaleDateString("en-CA");
      const formattedEndDate = update[1].toLocaleDateString("en-CA");
      dispatch(
        setDateFilter({
          key: dateType,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        })
      );
    }
  };

  // Reset filters when the reset button is clicked
  const handleReset = () => {
    setOrderNumber("");
    setDateType("");
    setDateRange([null, null]);
    dispatch(setDateFilter({ key: "", startDate: "", endDate: "" }));
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

          <DatePicker
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={handleDateRangeChange}
            placeholderText="Start Date - End Date"
          />
        </div>
        <div className="flex items-center gap-2 p-1">
          <h2 className="whitespace-nowrap">Filter Type</h2>
          <MultiSelectDropdown setCurrentPage={setCurrentPage} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:flex items-center px-2 py-4">
        <label htmlFor="orderNumber">Order/Case Number:</label>
        <div className="flex items-center flex-wrap gap-2">
          <input
            className="focus:outline-gray-200 p-2 ml-2 border rounded"
            id="orderNumber"
            type="text"
            value={orderNumber}
            onChange={(e) => {
              setOrderNumber(e.target.value.trim());
              setCurrentPage(1);
            }}
            placeholder="Order/Case number"
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
