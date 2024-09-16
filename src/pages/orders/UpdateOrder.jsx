import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import LoadingBtn from "./../../components/LoadingBtn";

import { RiDeleteBin6Line } from "react-icons/ri";
import {
  get_single_order,
  messageClear,
  update_single_order,
} from "../../features/order/orderSlice";
import UpdateTr from "./../../components/table/UpdateTr";

const UpdateOrder = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { order, successMessage, errorMessage, isLoading } = useSelector(
    (state) => state.order
  );
  const { orderNumber } = useParams();
  // date formate
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toISOString().split("T")[0] : "";
  };
  // handle claim
  const [claimEntries, setClaimEntries] = useState([
    { claimName: "", caseNumber: "", claimDate: "" },
  ]);
  // form input
  const [formData, setFormData] = useState({
    approvedOrReject: "",
    arMailDate: "",
    claim: "",
    claimType: [{ claimName: "", caseNumber: "", claimDate: "" }],
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
  // load form data
  useEffect(() => {
    if (order) {
      setFormData({
        approvedOrReject: order.approvedOrReject || "",
        arMailDate: formatDate(order.arMailDate),
        // caseNumber: order.caseNumber || "",
        claim: order.claim || "",
        claimType: order.claimType || [],
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
      if (order.claimType && order.claimType.length > 0) {
        setClaimEntries(order.claimType);
      } else {
        const todayDate = new Date().toISOString().split("T")[0];
        setClaimEntries([
          {
            claimName: "",
            caseNumber: "",
            claimDate: todayDate,
          },
        ]);
      }
    }
  }, [order]);
  // load single data
  useEffect(() => {
    dispatch(get_single_order(orderNumber));
  }, [orderNumber, dispatch]);
  // handle all input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  // handle claim change
  const handleClaimChange = (index, e) => {
    const newClaims = [...claimEntries];
    const updatedClaim = { ...newClaims[index] };
    updatedClaim[e.target.name] = e.target.value;
    newClaims[index] = updatedClaim;
    setClaimEntries(newClaims);
  };
  // add claim
  const addClaimEntry = () => {
    const todayDate = new Date().toISOString().split("T")[0];
    setClaimEntries([
      ...claimEntries,
      { claimName: "", caseNumber: "", claimDate: todayDate },
    ]);
  };
  // delete claim
  const deleteClaimEntry = (index) => {
    const newClaims = [...claimEntries];
    newClaims.splice(index, 1); // Remove the selected entry
    setClaimEntries(newClaims); // Update the state
  };
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      update_single_order({
        orderNumber,
        data: { ...formData, claimType: claimEntries },
      })
    );
  };

  // show message
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);

      dispatch(messageClear());
      /* setTimeout(() => {
        navigate("/all-orders");
      }, 500); */
    }
    if (errorMessage) {
      toast.error(errorMessage);

      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  return (
    <div className="rounded-md w-[80%] mx-auto bg-white p-2">
      <h1 className="text-3xl font-semibold text-center p-3 bg-teal-50 text-teal-500">
        Update Order
      </h1>
      <div className="relative overflow-x-auto rounded-md p-2">
        <form onSubmit={handleSubmit}>
          <table className="text-sm text-left rounded-md p-2 text-black w-full">
            <thead className="text-sm uppercase border bg-gray-200">
              <tr>
                <th className="py-3 px-2 border w-[30%]">Title</th>
                <th className="py-3 px-2 border w-[70%]">Status</th>
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
                    className="w-full md:w-3/4 p-3 focus:outline-slate-200 border rounded"
                  >
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
                    className="w-full md:w-3/4 focus:outline-slate-200 border rounded p-3"
                  >
                    <option value="">--select--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
              </tr>
              {formData.claim === "Yes" && (
                <>
                  <tr className="border">
                    <td
                      scope="row"
                      className="p-3 font-medium border whitespace-nowrap"
                    >
                      Claim Type
                    </td>
                    <td
                      scope="row"
                      className="p-1 font-medium border whitespace-nowrap"
                    >
                      <div className="grid grid-cols-1">
                        {claimEntries.map((entry, index) => (
                          <div
                            key={index}
                            className="flex flex-col w-full md:w-3/4 gap-2 mt-2"
                          >
                            <select
                              name="claimName"
                              value={entry.claimName}
                              onChange={(e) => handleClaimChange(index, e)}
                              className="p-2 focus:outline-slate-200 border rounded"
                            >
                              <option value="">--select--</option>
                              <option value="Wrong Item">Wrong Item</option>
                              <option value="Missing Item">Missing Item</option>
                              <option value="Score Card">Score Card</option>
                              <option value="Packaging Damage">
                                Packaging Damage
                              </option>
                              <option value="Damage Item Received">
                                Damage Item Received
                              </option>
                              <option value="Returned item never received">
                                Returned item never received
                              </option>
                              <option value="Penalty Cancellations">
                                Penalty Cancellations
                              </option>
                              <option value="Penalty Returns">
                                Penalty Returns
                              </option>
                            </select>

                            <input
                              type="text"
                              name="caseNumber"
                              value={entry.caseNumber}
                              onChange={(e) => handleClaimChange(index, e)}
                              className="border p-2 focus:outline-0"
                              placeholder="Additional Information"
                            />

                            <div className="flex items-center justify-between">
                              <input
                                type="date"
                                name="claimDate"
                                value={entry.claimDate}
                                onChange={(e) => handleClaimChange(index, e)}
                                className="border p-2 focus:outline-0 w-full"
                              />
                              <button
                                type="button"
                                onClick={() => deleteClaimEntry(index)}
                                className="bg-red-500 text-white p-1 rounded ml-2"
                              >
                                <RiDeleteBin6Line />
                              </button>
                            </div>
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={addClaimEntry}
                          className="bg-teal-500 w-[100px] text-white rounded p-2 mt-3"
                        >
                          Add More
                        </button>
                      </div>
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
                </>
              )}
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
                      className="p-2 bg-red-500 text-white rounded-md w-1/2"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="p-2 bg-emerald-500 text-white rounded-md w-1/2"
                    >
                      {isLoading ? <LoadingBtn /> : "Update"}
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
