import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  update_Bulk_order,
  messageClear,
} from "../../features/order/orderSlice";
import { toast } from "react-hot-toast";
import LoadingBtn from "./../../components/LoadingBtn";

const UpdateBulkOrders = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [date, setDate] = useState("");
  const { successMessage, errorMessage, missingOrders, isLoading } =
    useSelector((state) => state.order);
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setDate(formattedDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "") {
      toast.error("Status is required.");
      return;
    }
    if (!textareaValue.trim()) {
      toast.error("Please enter at least one order number.");
      return;
    }

    const orderSet = new Set();
    const newOrders = textareaValue
      .trim()
      .split(/[\n, ,]+/)
      .map((item) => item.trim())
      .filter((orderNumber) => {
        if (orderSet.has(orderNumber)) {
          return false;
        }
        orderSet.add(orderNumber);
        return true;
      })
      .map((orderNumber) => {
        const orderData = {
          orderNumber,
          status,
        };

        if (status === "Delivery Failed") {
          orderData.date = date;
        }

        return orderData;
      });

    dispatch(update_Bulk_order(newOrders));
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setTextareaValue("");
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);
  return (
    <div className="flex justify-center mt-5 gap-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          name="orderStatus"
          className="w-full p-3 focus:outline-slate-200 border rounded"
        >
          <option className="text-center" value="">
            --select--
          </option>

          <option value="Delivered">Delivered</option>
          <option value="Delivery Failed">Delivery Failed</option>
        </select>
        {status === "Delivery Failed" && (
          <input
            className="rounded-md p-2 border border-teal-500 focus:border-teal-500 focus:outline-none"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        )}
        <textarea
          cols={40}
          rows={15}
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          className="resize-y focus:outline-slate-200 border rounded  p-2"
        ></textarea>
        <button
          disabled={isLoading}
          className="bg-[#00b795] font-poppin text-white font-medium px-3 py-2 rounded-md"
        >
          {isLoading ? <LoadingBtn /> : "Submit"}
        </button>
      </form>
      {missingOrders.length !== 0 && (
        <div className="bg-white w-[30%] p-2 rounded-md">
          <h2 className="text-red-600 text-2xl">
            Messing Orders {missingOrders.length}
          </h2>
          <ul>
            {missingOrders?.map((order, i) => (
              <li key={i}>{order}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UpdateBulkOrders;
