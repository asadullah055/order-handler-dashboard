import React, { useEffect } from "react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { get_all_order } from "../../features/order/orderSlice";
import { formatDate } from "../../util/dateFormater";

const AllOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      get_all_order({
        perPage: 20,
        pageNo: 1,
      })
    );
  }, []);

  return (
    <div className="rounded-md lg:w-[90%] mx-auto bg-white border p-2 border-gray-200 ">
      <div className="relative overflow-x-auto">
        <table className="text-sm text-left font-poppin text-black  w-full">
          <thead className="text-sm uppercase border-b bg-gray-200">
            <tr>
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
                Action
              </th>
            </tr>
          </thead>
          <tbody className="[&>:nth-child(even)]:bg-gray-100">
            {orders?.orders &&
              orders.orders.map((order, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-2 px-2 font-medium whitespace-nowrap"
                  >
                    {order.orderNumber}
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-2 font-medium whitespace-nowrap"
                  >
                    {formatDate(order.date)}
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-2 font-medium whitespace-nowrap"
                  >
                    <span className="capitalize">{order.orderStatus}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-2 font-medium whitespace-nowrap"
                  >
                    <span>Transit</span>
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-2 font-medium whitespace-nowrap"
                  >
                    09/05/2024
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-2 font-medium whitespace-nowrap"
                  >
                    09/05/2024
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-2 font-medium whitespace-nowrap"
                  >
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
      </div>
    </div>
  );
};

export default AllOrders;
