import React from "react";
import TableTr from "../../components/table/TableTr";

const SingleOrder = () => {
  return (
    <div className="rounded-md lg:w-[70%] md:w-[80%] mx-auto bg-white p-2">
      <h1 className="text-3xl font-semibold text-center p-3 bg-teal-50 text-teal-500">
        Order Details
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
            <TableTr title="Order Number" values="123456" />
            <TableTr title="Drop Date" values="Aug 31 2024" />
            <TableTr title="Order Status" values="Transit" />
            <TableTr title="DF Mail Date" values="125" />
            <TableTr title="Receive Date" values="Aug 31 2024" />
            <TableTr title="Claim" values="Yes" />
            <TableTr title="Claim Type" values="Yes" />
            <TableTr title="CSMD" values="CSMD" />
            <TableTr title="Case Number" values="Case Number" />
            <TableTr title="Claim Approve" values="Approve" />
            <TableTr title="A/R Mail Date" values="data" />
            <TableTr title="Paid Amount" values="500" />
            <TableTr title="Invoice Cycle" values="500" />
            <TableTr title="Comment" values="500" />
            <TableTr title="Complain Details" values="500" />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SingleOrder;
