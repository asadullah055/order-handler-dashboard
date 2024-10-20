import React from "react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { formatDate } from "../../util/dateFormater";
import { getOrderStatusClass } from "../../util/statusColor";

const OrderTable = ({ orders, isLoading, openModal }) => {
  let content = null;
  if (isLoading) {
    content = (
      <tbody>
        <tr>
          <td colSpan="7" className="text-center align-middle pt-3">
            <div className="flex justify-center items-center">
              <RotatingLines
                visible={true}
                height="50"
                width="50"
                strokeColor="#00bfae"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            </div>
          </td>
        </tr>
      </tbody>
    );
  } else if (orders?.length === 0) {
    content = (
      <tbody>
        <tr>
          <td colSpan="7">
            <p className="text-teal-500 text-2xl text-center">No order found</p>
          </td>
        </tr>
      </tbody>
    );
  } else if (orders?.length > 0) {
    content = (
      <tbody className="[&>:nth-child(even)]:bg-gray-100">
        {orders.map((order, i) => (
          <tr key={i}>
            <td className="py-2 px-2 font-medium whitespace-nowrap">
              <Link
                target="_blank"
                to={`https://sellercenter.daraz.com.bd/apps/order/detail?tradeOrderId=${order.orderNumber}`}
              >
                {order.orderNumber}
              </Link>
            </td>
            <td className="py-2 px-2 font-medium whitespace-nowrap">
              {formatDate(order.date)}
            </td>
            <td className="py-1 px-2 font-medium whitespace-nowrap">
              <span
                className={`capitalize p-2 rounded-md w-28 ${getOrderStatusClass(
                  order.orderStatus
                )}`}
              >
                {order.orderStatus}
              </span>
            </td>
            <td className="py-2 px-2 font-medium whitespace-nowrap">
              {order.dfMailDate ? formatDate(order.dfMailDate) : "No Date"}
            </td>
            <td className="py-2 px-2 font-medium whitespace-nowrap">
              {order.receivedDate ? formatDate(order.receivedDate) : "No Date"}
            </td>
            <td className="py-2 px-2 font-medium whitespace-nowrap">
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
            <td className="py-2 px-2 font-medium whitespace-nowrap">
              <div className="flex gap-2">
                <button
                  className="bg-teal-100 text-teal-500 p-2 rounded "
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
        ))}
      </tbody>
    );
  }

  return (
    <table className="text-sm text-left font-poppin text-black w-full">
      <thead className="text-xs lg:text-sm uppercase border-b bg-gray-200">
        <tr>
          {/* Table headers for orders */}
          <th scope="col" className="py-3 px-2 whitespace-nowrap">
            <div className="flex items-center gap-1">Order Number</div>
          </th>
          <th scope="col" className="py-3 px-2 whitespace-nowrap">
            <div className="flex items-center gap-1">Drop Date</div>
          </th>
          <th scope="col" className="py-2 px-2 whitespace-nowrap">
            Order Status
          </th>
          <th scope="col" className="py-2 px-2 whitespace-nowrap">
            DF Mail Date
          </th>
          <th scope="col" className="py-2 px-2 whitespace-nowrap">
            <div className="flex items-center gap-1">Receive Date</div>
          </th>
          <th scope="col" className="py-2 px-2 whitespace-nowrap border ">
            Claim
          </th>

          <th scope="col" className="py-2 px-2 whitespace-nowrap">
            Action
          </th>
        </tr>
      </thead>
      {content}
    </table>
  );
};

export default OrderTable;
