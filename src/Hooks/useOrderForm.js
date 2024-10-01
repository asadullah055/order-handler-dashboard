import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_status_number } from "../features/filter/filterSlice";
import { update_single_order } from "../features/order/orderSlice";

const useOrderForm = (orderNumber) => {
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);

  const formatDate = (date) =>
    date ? new Date(date).toISOString().split("T")[0] : formatDate(new Date());

  const [formData, setFormData] = useState({
    claim: "",
    claimType: [],
    comment: "",
    date: "",
    settled: "No",
    orderStatus: "",
    receivedDate: "",
    dfMailDate: "",
  });

  const [claimEntries, setClaimEntries] = useState([
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

  useEffect(() => {
    if (order) {
      setFormData({
        claim: order.claim || "",
        claimType: order.claimType || [],
        comment: order.comment || "",
        settled: order.settled || "",
        date: formatDate(order.date),
        dfMailDate: order.dfMailDate || "",
        orderStatus: order.orderStatus || "",
        receivedDate: order.receivedDate || "",
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
  }, [order, dispatch]);

  useEffect(() => {
    // Set settled to "No" if the orderStatus is not "Delivered"
    if (formData.orderStatus !== "Delivered") {
      setFormData((prevData) => ({
        ...prevData,
        settled: "No",
      }));
    }
  }, [formData.orderStatus]);
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleClaimChange = (index, e) => {
    const newClaims = [...claimEntries];
    const updatedClaim = { ...newClaims[index] };
    updatedClaim[e.target.name] = e.target.value;
    newClaims[index] = updatedClaim;
    setClaimEntries(newClaims);
  };

  const addClaimEntry = () => {
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
  };

  const deleteClaimEntry = (index) => {
    const newClaims = [...claimEntries];
    newClaims.splice(index, 1);
    setClaimEntries(newClaims);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      update_single_order({
        orderNumber,
        data: { ...formData, claimType: claimEntries },
      })
    );
  };

  return {
    formData,
    claimEntries,
    handleInputChange,
    handleClaimChange,
    addClaimEntry,
    deleteClaimEntry,
    handleSubmit,
  };
};

export default useOrderForm;
