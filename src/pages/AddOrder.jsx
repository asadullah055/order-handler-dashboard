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
  const [link, setLink] = useState("");
  const [packageLocation, setPackageLocation] = useState("");
  const [hubLocation, setHubLocation] = useState("");
  const [packagingTime, setPackagingTime] = useState("");
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
      .map((item) => item.trim())
      .filter((item) => /^[0-9]+$/.test(item));

    const uniqueOrderNumbers = [...new Set(orderNumbers)];
    setTextareaValue(uniqueOrderNumbers.join("\n"));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!textareaValue.trim()) {
      toast.error("Please enter at least one order number.");
      return;
    }

    /* if (!link || !packageLocation || !hubLocation || !packagingTime) {
      toast.error("Please fill all the fields.");
      return;
    } */

    const orders = textareaValue
      .trim()
      .split(/\n/)
      .map((orderNumber) => ({
        orderNumber: orderNumber.trim(),
        date,
        link,
        packageLocation,
        hubLocation,
        packagingTime,
      }));

    setNewOrders(orders);
    console.log(orders);

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
      setLink("");
      setPackageLocation("");
      setHubLocation("");
      setPackagingTime("");
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
    <div className="flex flex-col justify-center items-center mt-5 w-1/2 m-auto rounded-md shadow bg-white">
      <h2 className="bg-teal-100 bg-secondary text-teal-600 text-3xl text-center mb-2 p-2 w-full font-semibold">
        Add Order
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-full p-3 gap-2">
        <div className="flex gap-2 items-center">
          <label
            className="w-[150px] text-gray-800 font-semibold"
            htmlFor="dDate"
          >
            Drop Date:
          </label>
          <input
            className="rounded-md p-2 border border-gray-300 focus:border-teal-500 focus:outline-none w-[70%] bg-slate-100"
            type="date"
            name="date"
            id="dDate"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label
            className="w-[150px] text-gray-800 font-semibold"
            htmlFor="link"
          >
            Link:
          </label>
          <input
            className="rounded-md p-2 border border-gray-300 focus:border-teal-500 focus:outline-none w-[70%] bg-slate-100"
            type="text"
            name="link"
            id="link"
            placeholder="CC camera link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label
            className="w-[150px] text-gray-800 font-semibold"
            htmlFor="pLocation"
          >
            Package Location:
          </label>
          <input
            className="rounded-md p-2 border border-gray-300 focus:border-teal-500 focus:outline-none w-[70%] bg-slate-100"
            type="text"
            name="pLocation"
            id="pLocation"
            placeholder="Package Location"
            value={packageLocation}
            onChange={(e) => setPackageLocation(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label
            className="w-[150px] text-gray-800 font-semibold"
            htmlFor="hLocation"
          >
            Hub Location:
          </label>
          <input
            className="rounded-md p-2 border border-gray-300 focus:border-teal-500 focus:outline-none w-[70%] bg-slate-100"
            type="text"
            name="hLocation"
            id="hLocation"
            placeholder="Hub Location"
            value={hubLocation}
            onChange={(e) => setHubLocation(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          <label
            className="w-[150px] text-gray-800 font-semibold"
            htmlFor="pTime"
          >
            Packaging Time:
          </label>
          <input
            className="rounded-md p-2 border border-gray-300 focus:border-teal-500 focus:outline-none w-[70%] bg-slate-100"
            type="time"
            name="pTime"
            id="pTime"
            value={packagingTime}
            onChange={(e) => setPackagingTime(e.target.value)}
          />
        </div>
        <textarea
          rows={15}
          className="resize-y rounded-md border border-gray-300 focus:border-teal-500 focus:outline-none p-2"
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
