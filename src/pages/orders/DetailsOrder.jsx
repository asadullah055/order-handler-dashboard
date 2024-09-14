import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import TableTr from "../../components/table/TableTr";
import { formatDate } from "../../util/dateFormater";
import { get_single_order } from "./../../features/order/orderSlice";

const DetailsOrder = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);
  const { orderNumber } = useParams();

  useEffect(() => {
    dispatch(get_single_order(orderNumber));
  }, [orderNumber, dispatch]);
  const {
    approvedOrReject,
    arMailDate,
    caseNumber,
    claim,
    claimType,
    comment,
    complainDetails,
    csmd,
    date,
    dfMailDate,
    orderNumber: orderNum,
    orderStatus,
    paidAmount,
    receivedDate,
    statementNoOrInvoiceCycle,
  } = order || {};
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
            <TableTr
              title="Order Number"
              values={
                <Link className="text-teal-500" to={"/"}>
                  {orderNum}
                </Link>
              }
            />
            <TableTr title="Drop Date" values={formatDate(date)} />
            <TableTr
              title="Order Status"
              values={<span className="capitalize">{orderStatus}</span>}
            />
            <TableTr title="DF Mail Date" values={formatDate(dfMailDate)} />
            <TableTr title="Receive Date" values={formatDate(receivedDate)} />
            <TableTr title="Claim" values={claim ? claim : "No Claim"} />
            <TableTr
              title="Claim Type"
              values={claimType ? claimType : "No Claim"}
            />
            <TableTr title="CSMD" values={csmd ? csmd : "No"} />
            <TableTr title="Case Number" values={caseNumber} />
            <TableTr title="Claim Approve" values={approvedOrReject} />
            <TableTr title="A/R Mail Date" values={formatDate(arMailDate)} />
            <TableTr title="Paid Amount" values={paidAmount} />
            <TableTr title="Invoice Cycle" values={statementNoOrInvoiceCycle} />
            <TableTr title="Comment" values={comment} />
            <TableTr title="Complain Details" values={complainDetails} />
            <tr className="border">
              <td></td>
              <td className="p-1 font-medium border">
                <div className="flex justify-between w-[90%] gap-4">
                  <Link
                    to={"/all-orders"}
                    className="p-2 text-center bg-red-500 rounded-md w-1/2"
                  >
                    Back All Order
                  </Link>
                  <Link
                    to={`/update/${orderNumber}`}
                    className="p-2 text-center bg-emerald-500 text-white rounded-md w-1/2"
                  >
                    Update
                  </Link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailsOrder;
