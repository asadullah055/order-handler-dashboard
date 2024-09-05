import React from "react";
import { FaEye, FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllOrders = () => {
  return (
    <div className="rounded-md  bg-white border border-red-600 ">
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left text-black">
          <thead className="text-sm  uppercase border-b">
            <tr>
              <th scope="col" className="py-3 px-4">
                Order Number
              </th>
              <th scope="col" className="py-3 px-4">
                Date
              </th>
              <th scope="col" className="py-3 px-4">
                Order Status
              </th>
              <th scope="col" className="py-3 px-4">
                Order Status
              </th>
              <th scope="col" className="py-3 px-4">
                Date
              </th>

              <th scope="col" className="py-3 px-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5, 6].map((d, i) => (
              <tr key={i}>
                <td
                  scope="row"
                  className="py-3 px-4 font-medium whitespace-nowrap"
                >
                  653333730139117
                </td>
                <td
                  scope="row"
                  className="py-3 px-4 font-medium whitespace-nowrap"
                >
                  09/05/2024
                </td>
                <td
                  scope="row"
                  className="py-3 px-4 font-medium whitespace-nowrap"
                >
                  <span>d.payment_status</span>
                </td>
                <td
                  scope="row"
                  className="py-3 px-4 font-medium whitespace-nowrap"
                >
                  <span>Transit</span>
                </td>
                <td
                  scope="row"
                  className="py-3 px-4 font-medium whitespace-nowrap"
                >
                  09/05/2024
                </td>
                <td
                  scope="row"
                  className="py-3 px-4 font-medium whitespace-nowrap"
                >
                  <div className="flex gap-2">
                    <Link
                      to={`/seller/dashboard/order/details/$`}
                      className="p-[6px] w-[30px] bg-green-500 rounded hover:shadow-lg flex justify-center items-center"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to={`/seller/dashboard/order/details/$`}
                      className="p-[6px] w-[30px] bg-green-500 rounded hover:shadow-lg flex justify-center items-center"
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
