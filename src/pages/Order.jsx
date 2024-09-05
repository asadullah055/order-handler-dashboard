import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBtn from "../components/LoadingBtn";
import { create_order } from "../features/order/orderSlice";

const Order = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const [date, setDate] = useState("");

  const [textareaValue, setTextareaValue] = useState("");

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
    const newOrders = textareaValue
      .trim()
      .split(/[\n, ,]+/)
      .map((item) => ({
        orderNumber: item.trim(),
        date,
      }));
    dispatch(create_order(newOrders));
    setTextareaValue("");
  };

  return (
    <div className="flex justify-center mt-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="rounded-md p-2 border border-teal-500 focus:border-teal-500 focus:outline-none"
          type="date"
          name="date"
          id=""
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <textarea
          cols={40}
          rows={15}
          className="resize-y rounded-md border border-teal-500 focus:border-teal-500 focus:outline-none p-2"
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
        ></textarea>
        <button
          disabled={loading}
          className="bg-[#00b795] font-poppin text-white font-medium px-3 py-2 rounded-md"
        >
          {loading ? <LoadingBtn /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Order;
