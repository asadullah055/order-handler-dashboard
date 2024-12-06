import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import useMessages from "../../Hooks/useMessages";
import useOrderForm from "../../Hooks/useOrderForm";
import { handleCopy } from "../../util/handleCopy";
import LoadingBtn from "../LoadingBtn";
import UpdateTr from "./../table/UpdateTr";
import ClaimSection from "./ClaimSection";
import OrderStatus from "./OrderStatus";

const OrderFormData = () => {
  const { orderNumber } = useParams();

  const { order, isLoading } = useSelector((state) => state.order);

  const {
    formData,
    claimEntries,
    handleInputChange,
    handleClaimChange,
    addClaimEntry,
    deleteClaimEntry,
    handleSubmit,
  } = useOrderForm(orderNumber);

  useMessages(orderNumber);
  return (
    <div className="overflow-x-auto rounded-md p-2 ">
      <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[500px]">
        <table className="text-sm  text-left rounded-md p-2 text-black w-full overflow-x-hidden ">
          <thead className="text-sm uppercase border bg-gray-200 sticky top-0 z-10">
            <tr>
              <th className="py-3 px-2 border w-[30%] ">Title</th>
              <th className="py-3 ps-2  flex items-center justify-between w-[75%] ">
                <span className="w-1/3">Status</span>
                {formData.orderStatus === "Delivered" ||
                (formData.orderStatus === "Delivery Failed" &&
                  formData.claim === "No") ? (
                  <h2 className="bg-teal-100 p-2 rounded font-semibold">
                    Settled
                  </h2>
                ) : (
                  <div className="flex items-center gap-2 w-1/2">
                    <h2 className="w-1/2 font-semibold">Settled</h2>
                    <select
                      name="settled"
                      value={formData.settled}
                      onChange={handleInputChange}
                      className="w-full p-1 bg-white focus:outline-slate-200 border rounded"
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                )}
              </th>
              {/* <OrderNumberAndSettled
                order={order}
                formData={formData}
                handleInputChange={handleInputChange}
              /> */}
            </tr>
          </thead>
          <tbody className="[&>:nth-child(odd)]:bg-gray-100">
            {/* <OrderNumberAndSettled
              order={order}
              formData={formData}
              handleInputChange={handleInputChange}
            /> */}
            <tr className="border">
              <td scope="row" className="p-3 font-medium border">
                Order Number
              </td>
              <td
                scope="row"
                className="p-3 font-medium border flex items-center group gap-2"
              >
                <Link
                  target="_blank"
                  className=""
                  to={`https://sellercenter.daraz.com.bd/apps/order/detail?tradeOrderId=${order.orderNumber}`}
                >
                  {order.orderNumber}
                </Link>
                <span
                  onClick={() => handleCopy(order.orderNumber)}
                  className=" text-orange-400 text-sm cursor-pointer invisible group-hover:visible"
                >
                  <FaRegCopy />
                </span>
              </td>
            </tr>

            <UpdateTr
              title={"Drop Date"}
              type={"date"}
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
            <OrderStatus
              formData={formData}
              handleInputChange={handleInputChange}
            />
            {!["Not Drop", "Delivered"].includes(formData.orderStatus) && (
              <>
                {!["Return", "Item Loss"].includes(formData.orderStatus) && (
                  <UpdateTr
                    title={"DF Mail Date"}
                    type={"date"}
                    name="dfMailDate"
                    value={formData.dfMailDate}
                    onChange={handleInputChange}
                  />
                )}

                {!["Scraped", "No Return Yet", "Item Loss"].includes(
                  formData.orderStatus
                ) && (
                  <UpdateTr
                    title={"Return Receive Date"}
                    type={"date"}
                    name="receivedDate"
                    value={formData.receivedDate}
                    onChange={handleInputChange}
                  />
                )}
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
                  <ClaimSection
                    claimEntries={claimEntries}
                    handleClaimChange={handleClaimChange}
                    deleteClaimEntry={deleteClaimEntry}
                    addClaimEntry={addClaimEntry}
                  />
                )}
              </>
            )}
            <UpdateTr
              title={"Comment"}
              type={"text"}
              name="comment"
              value={formData.comment.trim()}
              placeholder="Comment"
              onChange={handleInputChange}
            />

            <tr className="border">
              <td></td>
              <td className="p-1 font-medium border">
                <div className="flex justify-between w-[90%] gap-4">
                  <Link
                    to={"/all-orders"}
                    className="p-2 bg-red-500 text-white text-center rounded-md w-1/2"
                  >
                    Cancel
                  </Link>
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
  );
};

export default OrderFormData;
