import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import useMessages from "../../Hooks/useMessages";
import useOrderForm from "../../Hooks/useOrderForm";
import LoadingBtn from "../LoadingBtn";
import UpdateTr from "./../table/UpdateTr";
import ClaimSection from "./ClaimSection";
import OrderNumberAndSettled from "./OrderNumberAndSettled";
import OrderStatus from "./OrderStatus";

const OrderFormData = () => {
  const { orderNumber } = useParams();

  const { order, isLoading } = useSelector((state) => state.order);

  // date formate

  // handle claim
  /* const [claimEntries, setClaimEntries] = useState([
    {
      claimName: "",
      caseNumber: "",
      claimDate: "",
      claimStatus: "",
      paidAmount: "",
      invoiceCycle: "",
      claimDetails: "",
      arMailDate: "",
    },
  ]); */
  // form input
  /* const [formData, setFormData] = useState({
    claim: "",
    claimType: [
      {
        claimName: "",
        caseNumber: "",
        claimDate: "",
        claimStatus: "",
        paidAmount: "",
        invoiceCycle: "",
        claimDetails: "",
        arMailDate: "",
      },
    ],
    comment: "",
    date: "",
    settled: "No",
    orderStatus: "",
    receivedDate: "",
    dfMailDate: "",
  }); */
  // load form data
  /* useEffect(() => {
    if (order) {
      setFormData({
        claim: order.claim || "",
        claimType: order.claimType || [],
        comment: order.comment || "",
        settled: order.settled || "",
        date: formatDate(order.date),
        dfMailDate: formatDate(order.dfMailDate),
        orderStatus: order.orderStatus || "",
        receivedDate: formatDate(order.receivedDate),
      });
      if (order.claimType && order.claimType.length > 0) {
        const updatedClaims = order.claimType?.map((claim) => ({
          ...claim,
          claimDate: claim.claimDate || formatDate(new Date()), // default to today
          arMailDate: claim.arMailDate || formatDate(new Date()), // default to today
        }));
        setClaimEntries(updatedClaims);
      } else {
        setClaimEntries([
          {
            claimName: "",
            caseNumber: "",
            claimDate: formatDate(new Date()),
            claimStatus: "",
            paidAmount: "",
            invoiceCycle: "",
            claimDetails: "",
            arMailDate: formatDate(new Date()),
          },
        ]);
      }
    }
    dispatch(get_status_number());
  }, [order, dispatch]); */
  // load single data

  // handle all input change
  /* const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }; */

  // handle claim change
  /* const handleClaimChange = (index, e) => {
    const newClaims = [...claimEntries];
    const updatedClaim = { ...newClaims[index] };
    updatedClaim[e.target.name] = e.target.value;
    newClaims[index] = updatedClaim;
    setClaimEntries(newClaims);
  }; */
  // add claim
  /* const addClaimEntry = () => {
    setClaimEntries([
      ...claimEntries,
      {
        claimName: "",
        caseNumber: "",
        claimDate: formatDate(new Date()),
        claimStatus: "",
        paidAmount: "",
        invoiceCycle: "",
        claimDetails: "",
        arMailDate: formatDate(new Date()),
      },
    ]);
  }; */
  // delete claim
  /*  const deleteClaimEntry = (index) => {
    const newClaims = [...claimEntries];
    newClaims.splice(index, 1);
    setClaimEntries(newClaims);
  }; */
  // handle submit
  /* const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      update_single_order({
        orderNumber,
        data: { ...formData, claimType: claimEntries },
      })
    );
  }; */
  /*  useEffect(() => {
    // Set settled to "No" if the orderStatus is not "Delivered"
    if (formData.orderStatus !== "Delivered") {
      setFormData((prevData) => ({
        ...prevData,
        settled: "No",
      }));
    }
  }, [formData.orderStatus]); */

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
            <OrderNumberAndSettled
              order={order}
              formData={formData}
              handleInputChange={handleInputChange}
            />

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
            {formData.orderStatus !== "Delivered" && (
              <>
                <UpdateTr
                  title={"DF Mail Date"}
                  type={"date"}
                  name="dfMailDate"
                  value={formData.dfMailDate}
                  onChange={handleInputChange}
                />
                <UpdateTr
                  title={"Return Receive Date"}
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
              value={formData.comment}
              placeholder="Comment"
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
  );
};

export default OrderFormData;
