import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import LoadingBtn from "../components/LoadingBtn";
import { create_order, messageClear } from "../features/order/orderSlice";

const AddOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { successMessage, errorMessage, isLoading, uniqueOrderCount } =
    useSelector((state) => state.order);

  const [date, setDate] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [newOrders, setNewOrders] = useState([]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setDate(formattedDate);
  }, []);

  const handleBlur = () => {
    const orderNumbers = textareaValue
      .trim()
      .split(/[\n, ,]+/)
      .map((item) => item.trim());

    const uniqueOrderNumbers = [...new Set(orderNumbers)];
    setTextareaValue(uniqueOrderNumbers.join("\n"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!textareaValue.trim()) {
      toast.error("Please enter at least one order number.");
      return;
    }

    const orders = textareaValue
      .trim()
      .split(/\n/)
      .map((orderNumber) => ({
        orderNumber: orderNumber.trim(),
        date,
      }));
    setNewOrders(orders);
    dispatch(create_order({ newOrders: orders, confirmInsert: false }));
  };

  useEffect(() => {
    if (uniqueOrderCount > 0 && newOrders.length > 0) {
      Swal.fire({
        title: "Confirm Order Submission",
        text: `Today Submit ${uniqueOrderCount} Orders.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#00b795",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, submit",
        customClass: {
          title: "text-xl text-teal-500 pt-1",
          popup: "w-[25em]",
          htmlContainer: "!p-1",
          actions: "mx-auto my-0",
          icon: "mt-3",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(create_order({ newOrders, confirmInsert: true }));
        }
      });
    }
  }, [uniqueOrderCount, newOrders, dispatch]);

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
  }, [successMessage, errorMessage, dispatch]);

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
          onBlur={handleBlur}
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

export default AddOrder;
