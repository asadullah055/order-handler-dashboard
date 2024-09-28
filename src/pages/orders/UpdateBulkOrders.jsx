import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { update_Bulk_order } from "../../features/order/orderSlice";

const UpdateBulkOrders = () => {
  const dispatch = useDispatch();
  //   const { orders } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");

  const [textareaValue, setTextareaValue] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setDate(formattedDate);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!textareaValue.trim()) {
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

        // If status is "Delivery Failed", include the date
        if (status === "Delivery Failed") {
          orderData.date = date;
        }

        return orderData;
      });

    dispatch(update_Bulk_order(newOrders));
  };

  return (
    <div className="flex justify-center mt-5">
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
        <button className="bg-[#00b795] font-poppin text-white font-medium px-3 py-2 rounded-md">
          {"Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBulkOrders;
