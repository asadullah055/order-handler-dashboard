import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { FaEye, FaRegCopy, FaRegEdit } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderModal from "../../components/OrderModal";
import Pagination from "../../components/Pagination";
import { get_unsettled_order } from "../../features/order/orderSlice";
import { formatDate } from "../../util/dateFormater";
import showOrderItems from "../../util/showOrderItems";
import { getOrderStatusClass } from "../../util/statusColor";
const UnSettledOrders = () => {
  const { unsettledOrder, isLoading } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [showItem, setShowItem] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = (orderNumber) => {
    const order = unsettledOrder.unsettledOrders.find(
      (order) => order.orderNumber === orderNumber
    );
    setSelectedOrder(order);
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    dispatch(
      get_unsettled_order({
        perPage,
        pageNo: currentPage,
      })
    );
  }, [perPage, currentPage, dispatch]);

  const handleCopy = (orderNumber) => {
    navigator.clipboard.writeText(orderNumber);
    toast.success("Order number copied successfully!");
  };
  const content = unsettledOrder?.unsettledOrders?.map((order, i) => (
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
      <td className="py-2 px-2 text-center ">
        {order.orderStatus === "unsettledOrders"
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
        <span
          className={`p-2 me-2 rounded-md ${
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
            onClick={() => handleModal(order.orderNumber)}
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

  return (
    <div className="rounded-md lg:w-[90%] mx-auto p-2">
      <OrderModal isOpen={isOpen} onClose={handleModal} order={selectedOrder} />
      <div className="relative overflow-x-auto bg-white p-2 border rounded border-gray-200">
        <h1 className="text-teal-500 text-2xl font-semibold text-center">
          Unsettled Orders ({showOrderItems(unsettledOrder?.totalUnsettledItem)}
          )
        </h1>
        <div className="p-2 bg-white rounded-md shadow-sm mt-1 relative overflow-x-auto ">
          <table className="text-sm text-left font-poppin text-black w-full">
            <thead className="text-xs lg:text-sm uppercase border-b bg-gray-200">
              <tr>
                <th className="py-3 px-2">Order Number</th>
                <th className="py-3 px-2">Drop Date</th>
                <th className="py-2 px-2">Order Status</th>
                <th className="py-2 px-2">Settled status</th>
                <th className="py-2 px-2">Receive Date</th>
                <th className="py-2 px-2">Claim & Status</th>
                <th className="py-2 px-2">Action</th>
              </tr>
            </thead>
            <tbody className="[&>:nth-child(even)]:bg-gray-100">
              {unsettledOrder?.unsettledOrders?.length ? (
                content
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-3">
                    No order found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {unsettledOrder?.totalUnsettledItem > perPage && (
          <div className="mt-3 flex justify-end mx-3">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={unsettledOrder?.totalUnsettledItem}
              perPage={perPage}
              showItem={showItem}
              setShowItem={setShowItem}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UnSettledOrders;
