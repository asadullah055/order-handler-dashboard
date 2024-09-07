import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UpdateTr from "../../components/table/UpdateTr";
import {
  get_single_order,
  update_single_order,
} from "../../features/order/orderSlice";

const UpdateOrder = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);
  const { orderNumber } = useParams();
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toISOString().split("T")[0] : "";
  };
  const [formData, setFormData] = useState({
    approvedOrReject: "",
    arMailDate: "",
    caseNumber: "",
    claim: "",
    claimType: "",
    comment: "",
    complainDetails: "",
    csmd: "",
    date: "",
    dfMailDate: "",
    orderStatus: "",
    paidAmount: "",
    receivedDate: "",
    statementNoOrInvoiceCycle: "",
  });

  useEffect(() => {
    if (order) {
      setFormData({
        approvedOrReject: order.approvedOrReject || "",
        arMailDate: formatDate(order.arMailDate),
        caseNumber: order.caseNumber || "",
        claim: order.claim || "",
        claimType: order.claimType || "",
        comment: order.comment || "",
        complainDetails: order.complainDetails || "",
        csmd: formatDate(order.csmd),
        date: formatDate(order.date),
        dfMailDate: formatDate(order.dfMailDate),
        orderStatus: order.orderStatus || "",
        paidAmount: order.paidAmount || "",
        receivedDate: formatDate(order.receivedDate),
        statementNoOrInvoiceCycle: order.statementNoOrInvoiceCycle || "",
      });
    }
  }, [order]);

  useEffect(() => {
    dispatch(get_single_order(orderNumber));
  }, [orderNumber, dispatch]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(update_single_order({ orderNumber, data: formData }));
  };

  return (
    <div className="rounded-md lg:w-[70%] md:w-[80%] mx-auto bg-white p-2">
      <h1 className="text-3xl font-semibold text-center p-3 bg-teal-50 text-teal-500">
        Update Order
      </h1>
      <div className="relative overflow-x-auto rounded-md p-2">
        <form onSubmit={handleSubmit}>
          <table className="text-sm text-left rounded-md p-2 text-black w-full">
            <thead className="text-sm uppercase border bg-gray-200">
              <tr>
                <th className="py-3 px-2 border w-[50%]">Title</th>
                <th className="py-3 px-2 border w-[50%]">Status</th>
              </tr>
            </thead>
            <tbody className="[&>:nth-child(odd)]:bg-gray-100">
              <tr className="border">
                <td className="p-3 font-medium border">Order Number</td>
                <td className="p-3 font-medium border">{orderNumber}</td>
              </tr>
              <UpdateTr
                title={"Drop Date"}
                type={"date"}
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
              <tr className="border">
                <td className="p-3 font-medium border">Order Status</td>
                <td className="p-1 font-medium border">
                  <select
                    name="orderStatus"
                    value={formData.orderStatus}
                    onChange={handleInputChange}
                    className="w-full p-3 focus:outline-slate-200 border rounded"
                  >
                    {/* <option value="">--select--</option> */}
                    <option value="transit">Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Delivery Failed">Delivery Failed</option>
                    <option value="Return">Return</option>
                    <option value="Not Drop">Not Drop</option>
                    <option value="Item Loss">Item Loss</option>
                    <option value="Scraped">Scraped</option>
                    <option value="No Return Yet">No Return Yet</option>
                  </select>
                </td>
              </tr>
              <UpdateTr
                title={"DF Mail Date"}
                type={"date"}
                name="dfMailDate"
                value={formData.dfMailDate}
                onChange={handleInputChange}
              />
              <UpdateTr
                title={"Receive Date"}
                type={"date"}
                name="receivedDate"
                value={formData.receivedDate}
                onChange={handleInputChange}
              />
              <tr className="border">
                <td className="p-3 font-medium border">Claim</td>
                <td className="p-1 font-medium border">
                  <select
                    name="claim"
                    value={formData.claim}
                    onChange={handleInputChange}
                    className="w-[50%] focus:outline-slate-200 border rounded p-3"
                  >
                    <option value="">--select--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
              </tr>
              <UpdateTr
                title={"Claim Type"}
                type={"text"}
                name="claimType"
                value={formData.claimType}
                placeholder="Claim Type"
                onChange={handleInputChange}
              />
              <UpdateTr
                title={"CSMD"}
                type={"date"}
                name="csmd"
                value={formData.csmd}
                onChange={handleInputChange}
              />
              <UpdateTr
                title={"Case Number"}
                type={"text"}
                name="caseNumber"
                value={formData.caseNumber}
                placeholder="Case Number"
                onChange={handleInputChange}
              />
              <tr className="border">
                <td className="p-3 font-medium border">Claim Approve</td>
                <td className="p-1 font-medium border">
                  <select
                    name="approvedOrReject"
                    value={formData.approvedOrReject}
                    onChange={handleInputChange}
                    className="w-[50%] focus:outline-slate-200 border rounded p-3"
                  >
                    <option value="">--select--</option>
                    <option value="Approve">Approve</option>
                    <option value="Reject">Reject</option>
                  </select>
                </td>
              </tr>
              <UpdateTr
                title={"A/R Mail Date"}
                type={"date"}
                name="arMailDate"
                value={formData.arMailDate}
                onChange={handleInputChange}
              />
              <UpdateTr
                title={"Paid Amount"}
                type={"text"}
                name="paidAmount"
                value={formData.paidAmount}
                placeholder="Paid Amount"
                onChange={handleInputChange}
              />
              <UpdateTr
                title={"Invoice Cycle"}
                type={"text"}
                name="statementNoOrInvoiceCycle"
                value={formData.statementNoOrInvoiceCycle}
                placeholder="Invoice Cycle"
                onChange={handleInputChange}
              />
              <UpdateTr
                title={"Comment"}
                type={"text"}
                name="comment"
                value={formData.comment}
                placeholder="Comment"
                onChange={handleInputChange}
              />
              <UpdateTr
                title={"Complain Details"}
                type={"text"}
                name="complainDetails"
                value={formData.complainDetails}
                placeholder="Complain Details"
                onChange={handleInputChange}
              />
              <tr className="border">
                <td></td>
                <td className="p-1 font-medium border">
                  <div className="flex justify-between w-[90%] gap-4">
                    <button
                      type="button"
                      className="p-2 bg-red-500 rounded-md w-1/2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="p-2 bg-emerald-500 text-white rounded-md w-1/2"
                    >
                      Update
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default UpdateOrder;
