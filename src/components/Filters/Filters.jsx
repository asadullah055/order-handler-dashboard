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

const Filters = ({
  orderNumber,
  setOrderNumber,
  setCurrentPage,
  status,
  setStatus,
  handleBulkAction,
}) => {
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
    <div className="flex flex-col md:flex-row gap-3">
      <div className="md:w-1/2 w-full">
        <div className="bg-white flex gap-2 items-center mb-2">
          <p className="w-[250px]">Bulk Action</p>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="p-2 focus:outline-0 rounded-md border w-3/4"
          >
            <option value="">--select--</option>
            <option value="Delete">Delete</option>
          </select>
          <button
            onClick={handleBulkAction}
            className="w-[120px] py-2 bg-teal-500 rounded-md text-white"
          >
            Submit
          </button>
        </div>
        <div className="flex gap-2 items-center py-2 w-full">
          <label className="whitespace-nowrap w-[180px]" htmlFor="orderNumber">
            Order/Case Number:
          </label>

          <input
            className="focus:outline-gray-200 p-2 w-3/4 border rounded"
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
            className="bg-red-500 font-poppin text-white font-medium w-[120px] py-2 rounded-md"
          >
            Reset
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 md:w-1/2 w-full">
        <div className="flex md:flex-row md:gap-x-2 md:items-center flex-col items-start gap-y-2">
          <h2 className="whitespace-nowrap w-[105px]">Filter Date</h2>
          <div className="flex gap-2 items-center">
            <select
              className="border p-2 focus:outline-0 rounded w-1/2"
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
              className="w-full p-2 border focus:outline-gray-300 rounded-md"
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateRangeChange}
              placeholderText="Start Date - End Date"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 py-1">
          <h2 className="whitespace-nowrap w-[120px]">Filter Type</h2>
          <MultiSelectDropdown setCurrentPage={setCurrentPage} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
