import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingBtn from "../components/LoadingBtn";
import { create_order, messageClear } from "../features/order/orderSlice";

const Order = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage, errorMessage, isLoading } = useSelector(
    (state) => state.order
  );
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
  };
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setTextareaValue("");
      dispatch(messageClear());
      setTimeout(() => {
        navigate("/all-orders");
      }, 500);
    }
    if (errorMessage) {
      toast.error(errorMessage);

      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);
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
          disabled={isLoading}
          className="bg-[#00b795] font-poppin text-white font-medium px-3 py-2 rounded-md"
        >
          {isLoading ? <LoadingBtn /> : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Order;
