import React from "react";

const UpdateOrder = () => {
  return (
    <div className="rounded-md lg:w-[70%] md:w-[80%] mx-auto bg-white p-2">
      <h1 className="text-3xl font-semibold text-center p-3 bg-teal-50 text-teal-500">
        Update Order
      </h1>
      <div className="relative overflow-x-auto rounded-md p-2">
        <table className="text-sm text-left  rounded-md p-2 text-black w-full">
          <thead className="text-sm uppercase border bg-gray-200">
            <tr>
              <th
                scope="col"
                className="py-3 px-2 border w-[50%] whitespace-nowrap"
              >
                Title
              </th>
              <th
                scope="col"
                className="py-3 px-2 border w-[50%] whitespace-nowrap"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody className="[&>:nth-child(odd)]:bg-gray-100">
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Order Number
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                123456
              </td>
            </tr>
            {/* drop date */}
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Drop Date
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Drop Date
              </td>
            </tr>
            {/* order status */}
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Order Status
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Transit
              </td>
            </tr>
            {/* Delivery Fail mail date */}
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                DF Mail Date
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                125
              </td>
            </tr>
            {/* receivedDate */}
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Receive Date
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                125
              </td>
            </tr>
            {/* claim */}
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Claim
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Yes
              </td>
            </tr>
            {/* claim Type*/}
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Claim Type
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Yes
              </td>
            </tr>
            {/* CSMD*/}
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                CSMD
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                CSMD
              </td>
            </tr>
            {/* Case Number*/}
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Case Number
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Case Number
              </td>
            </tr>
            {/* Claim Approve*/}
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Claim Approve
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Approve
              </td>
            </tr>
            {/* A/R Mail Date	*/}
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                A/R Mail Date
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                data
              </td>
            </tr>
            {/* Paid Amount	*/}
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Paid Amount
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                500
              </td>
            </tr>
            {/* Statement No/Invoice Cycle*/}
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Invoice Cycle
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                500
              </td>
            </tr>
            {/* Comment	*/}
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Comment
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                500
              </td>
            </tr>
            {/* Complain Details	*/}
            <tr className="border">
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                Complain Details
              </td>
              <td
                scope="row"
                className="p-3 font-medium border whitespace-nowrap"
              >
                500
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpdateOrder;
