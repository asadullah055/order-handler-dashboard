import React, { useEffect, useState } from "react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import { get_all_order } from "../../features/order/orderSlice";
import { formatDate } from "../../util/dateFormater";
import { getOrderStatusClass } from "../../util/statusColor";
import { get_order_number } from "./../../features/filter/filterSlice";

const DeliveryFailed = () => {
  const { orders, isLoading, order, totalItem } = useSelector(
    (state) => state.order
  );

  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [showItem, setShowItem] = useState(5);
  const [status, setStatus] = useState("Delivery Failed");
  const [claim, setClaim] = useState("");
  const [claimApproved, setClaimApproved] = useState("");
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    dispatch(
      get_all_order({
        perPage: parseInt(perPage),
        pageNo: parseInt(currentPage),
        orderStatus: status,
        claim,
        claimType: claimApproved,
        orderNumber,
      })
    );
  }, [
    perPage,
    currentPage,
    dispatch,
    status,
    claim,
    claimApproved,
    orderNumber,
  ]);
  useEffect(() => {
    dispatch(get_order_number());
  }, [dispatch]);
  const reset = () => {
    setStatus("");
    setClaim("");
    setClaimApproved("");
    setOrderNumber("");
  };

  let content = null;

  if (isLoading)
    content = (
      <div className="flex justify-center items-center min-h-[300px]">
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
    );
  if (!isLoading && orders?.orders?.length === 0)
    content = (
      <p className="text-teal-500 text-2xl text-center">No order found</p>
    );
  if (!isLoading && orders?.orders?.length > 0)
    content = (
      <>
        <table className="text-sm text-left font-poppin text-black w-full">
          <thead className="text-xs lg:text-sm uppercase border-b bg-gray-200">
            <tr>
              {/* Table headers for orders */}
              <th scope="col" className="py-3 px-2 whitespace-nowrap">
                Order Number
              </th>
              <th scope="col" className="py-3 px-2 whitespace-nowrap">
                Drop Date
              </th>
              <th scope="col" className="py-2 px-2 whitespace-nowrap">
                Order Status
              </th>
              <th scope="col" className="py-2 px-2 whitespace-nowrap">
                DF Mail Date
              </th>
              <th scope="col" className="py-2 px-2 whitespace-nowrap">
                Receive Date
              </th>
              <th scope="col" className="py-2 px-2 whitespace-nowrap">
                Claim
              </th>
              <th scope="col" className="py-2 px-2 whitespace-nowrap">
                Claim Status
              </th>
              <th scope="col" className="py-2 px-2 whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="[&>:nth-child(even)]:bg-gray-100">
            {orders?.orders &&
              orders.orders.map((order, i) => (
                <tr key={i}>
                  <td className="py-2 px-2 font-medium whitespace-nowrap">
                    {order.orderNumber}
                  </td>
                  <td className="py-2 px-2 font-medium whitespace-nowrap">
                    {formatDate(order.date)}
                  </td>
                  <td className="py-1 px-2 font-medium whitespace-nowrap">
                    <span
                      className={`capitalize p-2 rounded-md ${getOrderStatusClass(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-2 px-2 font-medium whitespace-nowrap">
                    {order.dfMailDate
                      ? formatDate(order.dfMailDate)
                      : "No Date"}
                  </td>
                  <td className="py-2 px-2 font-medium whitespace-nowrap">
                    {order.receivedDate
                      ? formatDate(order.receivedDate)
                      : "No Date"}
                  </td>
                  <td className={`py-2 px-2 font-medium whitespace-nowrap `}>
                    <span
                      className={`p-2 rounded-md ${
                        order.claim === "Yes"
                          ? "bg-red-500 text-white"
                          : order.claim === "No"
                          ? "bg-green-500 text-white"
                          : ""
                      }`}
                    >
                      {order.claim ? order.claim : ""}
                    </span>
                  </td>
                  <td className="py-2 px-2 font-medium whitespace-nowrap">
                    <span
                      className={`p-2 rounded-md ${
                        order.approvedOrReject === "Reject"
                          ? "bg-rose-500 text-white"
                          : order.approvedOrReject === "Approve"
                          ? "bg-green-500 text-white"
                          : ""
                      }`}
                    >
                      {order.approvedOrReject ? order.approvedOrReject : ""}
                    </span>
                  </td>
                  <td className="py-2 px-2 font-medium whitespace-nowrap">
                    <div className="flex gap-2">
                      <Link
                        to={`/order/${order.orderNumber}`}
                        className="p-[6px] w-[30px] bg-teal-500 rounded hover:shadow-lg flex justify-center items-center"
                      >
                        <FaEye />
                      </Link>
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
        </table>
        {orders?.totalItem > perPage && (
          <div className="mt-3 flex justify-end mx-3">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={orders?.totalItem}
              perPage={perPage}
              showItem={showItem}
              setShowItem={setShowItem}
            />
          </div>
        )}
      </>
    );

  return (
    <div className="rounded-md lg:w-[90%] mx-auto p-2">
      <div className="bg-white p-2 mt-2 mb-3 rounded">
        <h1 className="text-teal-500 text-2xl font-semibold text-center">
          Delivery Failed Orders ({orders?.totalItem})
        </h1>
        {/* <OrderFilter /> */}
        {/* <div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3 p-2">
            <div className="flex items-center gap-2">
              <h2 className="w-[50%] md:w-fit">Status</h2>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="focus:outline-slate-200 border rounded md:w-[70%] w-[50%] p-2 "
              >
                <option className="text-center" value="">
                  --select--
                </option>
                <option className="p-2" value="transit">
                  Transit
                </option>
                <option value="Delivered">Delivered</option>
                <option value="Delivery Failed">Delivery Failed</option>
                <option value="Return">Return</option>
                <option value="Not Drop">Not Drop</option>
                <option value="Item Loss">Item Loss</option>
                <option value="Scraped">Scraped</option>
                <option value="No Return Yet">No Return Yet</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <h2 className="w-[50%] md:w-fit">Claim</h2>
              <select
                value={claim}
                onChange={(e) => setClaim(e.target.value)}
                className="focus:outline-slate-200 border rounded md:w-[70%] w-[50%] p-2"
              >
                <option className="text-center" value="">
                  --select--
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <h2 className="w-[50%]">Claim Approved</h2>
              <select
                value={claimApproved}
                onChange={(e) => setClaimApproved(e.target.value)}
                className="focus:outline-slate-200 border rounded md:w-[70%] w-[50%] p-2"
              >
                <option className="text-center" value="">
                  --select--
                </option>
                <option value="Approve">Approve</option>
                <option value="Reject">Reject</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:flex items-center px-2 py-4">
            <label htmlFor="orderNumber">Order Number:</label>
            <div className="flex items-center flex-wrap gap-2">
              <input
                className="focus:outline-gray-200 p-2 ml-2 border rounded"
                id="orderNumber"
                type="text"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Order number"
              />

              <button
                type="button"
                onClick={reset}
                className="bg-red-500 font-poppin text-white font-medium px-3 py-2 rounded-md"
              >
                Reset
              </button>
            </div>
          </div>
        </div> */}
      </div>

      {/* Responsive table container */}
      <div className="relative overflow-x-auto bg-white p-2 border rounded border-gray-200">
        {content}
      </div>
    </div>
  );
};

export default DeliveryFailed;
