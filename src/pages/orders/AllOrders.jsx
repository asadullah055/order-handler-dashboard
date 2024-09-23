import React, { useEffect, useState } from "react";
import { FaEye, FaRegCalendar, FaRegEdit } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { RotatingLines } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DropdownFilter from "../../components/DropdownFilter";
import { get_all_order } from "../../features/order/orderSlice";
import { formatDate } from "../../util/dateFormater";
import { getOrderStatusClass } from "../../util/statusColor";
import Pagination from "./../../components/Pagination";
import { get_order_number } from "./../../features/filter/filterSlice";

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [showItem, setShowItem] = useState(5);
  const [status, setStatus] = useState("");
  const [claim, setClaim] = useState("");
  const [claimApproved, setClaimApproved] = useState("");
  const [orderNumber, setOrderNumber] = useState("");
  const [showOrderNumberInput, setShowOrderNumberInput] = useState(false);
  const [date, setDate] = useState("");
  const [showDropDate, setShowDropDate] = useState(false);
  const [rDate, setRDate] = useState("");
  const [showRDate, setShowRDate] = useState(false);

  useEffect(() => {
    dispatch(
      get_all_order({
        perPage: parseInt(perPage, 10),
        pageNo: parseInt(currentPage, 10),
        orderStatus: status,
        claim,
        claimType: claimApproved,
        orderNumber,
        date,
        receivedDate: rDate,
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
    date,
    rDate,
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
  if (!isLoading && orders?.orders?.length === 0)
    content = (
      <tbody>
        <tr>
          <td colSpan="7">
            <p className="text-teal-500 text-2xl text-center">No order found</p>
          </td>
        </tr>
      </tbody>
    );
  if (!isLoading && orders?.orders?.length > 0)
    content = (
      <>
        <tbody className="[&>:nth-child(even)]:bg-gray-100">
          {orders?.orders &&
            orders.orders.map((order, i) => (
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
                    className={`capitalize p-2 rounded-md ${getOrderStatusClass(
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
      </>
    );

  return (
    <div className="rounded-md lg:w-[90%] mx-auto p-2">
      <div className="bg-white p-2 mt-2 mb-3 rounded">
        <DropdownFilter />
        <h1 className="text-teal-500 text-2xl font-semibold text-center">
          Total Orders ({orders?.totalItem})
        </h1>
      </div>

      {/* Responsive table container */}
      <div className="relative overflow-x-auto bg-white p-2 border rounded border-gray-200">
        <table className="text-sm text-left font-poppin text-black w-full">
          <thead className="text-xs lg:text-sm uppercase border-b bg-gray-200">
            <tr>
              {/* Table headers for orders */}
              <th scope="col" className="py-3 px-2 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <span>
                    {showOrderNumberInput ? ( // Conditionally render the input
                      <input
                        className="focus:outline-gray-200 p-1  border rounded"
                        id="orderNumber"
                        type="text"
                        value={orderNumber}
                        onChange={(e) => {
                          setOrderNumber(e.target.value);
                          setCurrentPage(1);
                        }}
                        placeholder="Order number"
                      />
                    ) : (
                      "Order Number"
                    )}
                  </span>

                  <span
                    className="text-[18px] cursor-pointer"
                    onClick={() =>
                      setShowOrderNumberInput(!showOrderNumberInput)
                    }
                  >
                    <IoSearchSharp />
                  </span>
                </div>
              </th>
              <th scope="col" className="py-3 px-2 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <span>
                    {showDropDate ? ( // Conditionally render the input
                      <input
                        className="focus:outline-gray-200 p-1  border rounded"
                        type="date"
                        value={date}
                        onChange={(e) => {
                          setDate(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    ) : (
                      "Drop Date"
                    )}
                  </span>

                  <span
                    className="text-[16px] cursor-pointer"
                    onClick={() => setShowDropDate(!showDropDate)}
                  >
                    <FaRegCalendar />
                  </span>
                </div>
              </th>
              <th scope="col" className="py-2 px-2 whitespace-nowrap">
                <select
                  value={status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="focus:outline-slate-200 rounded p-2 bg-transparent"
                >
                  <option className="text-center" value="">
                    Order Status
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
              </th>
              <th scope="col" className="py-2 px-2 whitespace-nowrap">
                DF Mail Date
              </th>
              <th scope="col" className="py-2 px-2 whitespace-nowrap">
                <div className="flex items-center gap-1">
                  <span>
                    {showRDate ? ( // Conditionally render the input
                      <input
                        className="focus:outline-gray-200 p-1  border rounded"
                        type="date"
                        value={rDate}
                        onChange={(e) => {
                          setRDate(e.target.value);
                          setCurrentPage(1);
                        }}
                      />
                    ) : (
                      "Receive Date"
                    )}
                  </span>

                  <span
                    className="text-[16px] cursor-pointer"
                    onClick={() => setShowRDate(!showRDate)}
                  >
                    <FaRegCalendar />
                  </span>
                </div>
              </th>
              <th scope="col" className="py-2 px-2 whitespace-nowrap border ">
                <select
                  value={claim}
                  onChange={(e) => {
                    setClaim(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="focus:outline-slate-200 border rounded bg-transparent p-2 pr-10"
                  // Adjust the width as needed
                >
                  <option className="text-center" value="">
                    Claim
                  </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {/* Custom icon */}
              </th>
              <th scope="col" className="py-2 px-2 whitespace-nowrap">
                <select
                  value={claimApproved}
                  onChange={(e) => {
                    setClaimApproved(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="focus:outline-slate-200 border rounded bg-transparent p-2"
                >
                  <option className="text-center" value="">
                    Claim Status
                  </option>
                  <option value="Approve">Approve</option>
                  <option value="Reject">Reject</option>
                </select>
              </th>
              <th scope="col" className="py-2 px-2 whitespace-nowrap">
                Action
              </th>
            </tr>
          </thead>
          {content}
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
      </div>
    </div>
  );
};

export default AllOrders;
