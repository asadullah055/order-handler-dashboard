import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaRegCopy, FaRegEdit } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { formatDate } from "../../util/dateFormater";
import { getOrderStatusClass } from "../../util/statusColor";

const OrderTable = ({
  orders,
  isLoading,
  openModal,
  orderStatus,
  orderNumber,
}) => {
  const [showAllOrders, setShowAllOrders] = useState(false);

  const handleCopy = (orderNumber) => {
    navigator.clipboard.writeText(orderNumber);
    toast.success("Order number copied successfully!");
  };

  const renderOrders = (visibleOrders) =>
    visibleOrders.map((order, i) => (
      <tr key={i}>
        <td className="py-2 px-2 font-medium relative group">
          <Link
            target="_blank"
            to={`https://sellercenter.daraz.com.bd/apps/order/detail?tradeOrderId=${order.orderNumber}`}
          >
            {order.orderNumber}
          </Link>
          <span
            onClick={() => handleCopy(order.orderNumber)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-orange-400 text-sm px-2 py-1 cursor-pointer hidden group-hover:block"
          >
            <FaRegCopy />
          </span>
        </td>
        <td className="py-2 px-2">{formatDate(order.date)}</td>
        <td className="py-1 px-2">
          <span
            className={`capitalize py-2 px-1 rounded-md w-28 ${getOrderStatusClass(
              order.orderStatus
            )}`}
          >
            {order.orderStatus}
          </span>
        </td>
        <td className="py-2 px-2">
          {orderStatus === "unsettledOrders"
            ? order.claimType[0]?.caseNumber
            : order.settled}
        </td>
        <td className="py-2 px-2">
          {order.receivedDate ? formatDate(order.receivedDate) : "No Date"}
        </td>
        <td className="py-2 px-2">
          <span
            className={`p-2 rounded-md ${
              order.claim === "Yes"
                ? "bg-red-500 text-white"
                : order.claim === "No"
                ? "bg-green-500 text-white"
                : ""
            }`}
          >
            {order.claim || ""}
          </span>
        </td>
        <td className="py-2 px-2">
          <div className="flex gap-2">
            <button
              className="bg-teal-100 text-teal-500 p-2 rounded"
              onClick={() => openModal(order.orderNumber)}
            >
              <FaEye />
            </button>
            <Link
              to={`/update/${order.orderNumber}`}
              className="p-[6px] w-[30px] bg-yellow-500 text-white rounded hover:shadow-lg flex justify-center items-center"
            >
              <FaRegEdit />
            </Link>
          </div>
        </td>
      </tr>
    ));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-3">
        <RotatingLines visible height="50" width="50" strokeColor="#00bfae" />
      </div>
    );
  }

  const visibleOrders =
    orderNumber.length === 15 && !showAllOrders ? orders.slice(0, 1) : orders;

  return (
    <table className="text-sm text-left font-poppin text-black w-full">
      <thead className="text-xs lg:text-sm uppercase border-b bg-gray-200">
        <tr>
          <th className="py-3 px-2">Order Number</th>
          <th className="py-3 px-2">Drop Date</th>
          <th className="py-2 px-2">Order Status</th>
          <th className="py-2 px-2">Settled status</th>
          <th className="py-2 px-2">Receive Date</th>
          <th className="py-2 px-2">Claim</th>
          <th className="py-2 px-2">Action</th>
        </tr>
      </thead>
      <tbody className="[&>:nth-child(even)]:bg-gray-100">
        {orders?.length ? (
          renderOrders(visibleOrders)
        ) : (
          <tr>
            <td colSpan="7" className="py-3">
              <p className="text-teal-500 text-2xl text-center">
                No order found
              </p>
            </td>
          </tr>
        )}
        {orderNumber.length === 15 && !showAllOrders && (
          <tr>
            <td colSpan="7" className="text-center py-3">
              <button
                onClick={() => setShowAllOrders(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Show more...
              </button>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrderTable;
