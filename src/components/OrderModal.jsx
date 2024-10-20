import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../util/dateFormater";
import { getOrderStatusClass } from "../util/statusColor";
import ClaimTypeRow from "./ClaimTypeRow";

const OrderModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  // Handler for closing the modal when clicking outside the modal content
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  console.log(order);

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center z-[100]"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 md:w-[700px] w-full max-h-[100vh] md:max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Order Number #{order.orderNumber}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        {/* Status */}
        <div className="flex justify-end mb-4">
          <span className="px-2 py-1 bg-green-500 text-white font-semibold text-sm rounded-full">
            {order.settled === "Yes" ? "Settled" : "Unsettled"}
          </span>
        </div>

        {/* Table for Order Details */}
        <table className="text-sm text-left font-poppin text-black w-full">
          <thead className="text-xs lg:text-sm uppercase border-b bg-gray-200">
            <tr>
              <th scope="col" className="p-2 w-[40%] whitespace-nowrap">
                <div className="flex items-center gap-1">Title</div>
              </th>
              <th scope="col" className="p-2 w-[60%] whitespace-nowrap">
                <div className="flex items-center gap-1">Details</div>
              </th>
            </tr>
          </thead>
          <tbody className="[&>:nth-child(odd)]:bg-gray-100">
            <tr>
              <td className="border p-2">Drop Date</td>
              <td className="border p-2">{formatDate(order.date)}</td>
            </tr>
            <tr>
              <td className="border p-2">Order Status</td>
              <td className="border p-2">
                <span
                  className={`capitalize p-2 rounded-md w-30 ${getOrderStatusClass(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </td>
            </tr>
            {order.dfMailDate && (
              <tr>
                <td className="border p-2">DF Mail Date</td>
                <td className="border p-2">
                  {order.dfMailDate && formatDate(order.dfMailDate)}
                </td>
              </tr>
            )}
            {order.receivedDate && (
              <tr>
                <td className="border p-2">Return Receive Date</td>
                <td className="border p-2">
                  {order.receivedDate && formatDate(order.receivedDate)}
                </td>
              </tr>
            )}
            {order.claim && (
              <tr>
                <td className="border p-2">Claim</td>
                <td className="border p-2">
                  <span
                    className={`px-2 py-1 rounded-md ${
                      order.claim === "Yes"
                        ? "bg-red-500 text-white"
                        : order.claim === "No"
                        ? "bg-green-500 text-white"
                        : ""
                    }`}
                  >
                    {order.claim}
                  </span>
                </td>
              </tr>
            )}
            {order.claimType.length !== 0 && (
              <tr>
                <td className="border p-2">Claim Type</td>
                <td className="border">
                  <div className="grid grid-cols-1">
                    {order.claimType?.map((item, i) => (
                      <div className="flex flex-col w-full gap-2 p-2" key={i}>
                        <ClaimTypeRow
                          title={"Claim Name"}
                          value={item.claimName}
                        />
                        <ClaimTypeRow
                          title={"Claim Date"}
                          value={formatDate(item.claimDate)}
                        />
                        <ClaimTypeRow
                          title={"Claim Status"}
                          value={item.claimStatus}
                        />
                        <ClaimTypeRow
                          title={"A/R Mail Date"}
                          value={formatDate(item.arMailDate)}
                        />
                        <ClaimTypeRow
                          title={"Paid Amount"}
                          value={item.paidAmount}
                        />
                        <ClaimTypeRow
                          title={"Invoice Cycle"}
                          value={item.invoiceCycle}
                        />
                        <ClaimTypeRow
                          title={"Claim Details"}
                          value={item.claimDetails}
                        />
                        {order.claimType.length > 1 && (
                          <div className="bg-teal-500 h-[1px]" />
                        )}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between mt-6">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Completed
          </button>
          <Link
            to={`/update/${order.orderNumber}`}
            className="p-[6px] bg-yellow-500 text-white rounded hover:shadow-lg flex justify-center items-center"
          >
            Update
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
