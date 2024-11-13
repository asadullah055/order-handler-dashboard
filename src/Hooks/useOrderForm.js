import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
      claimDate: "",
      claimStatus: "",
      paidAmount: "",
      invoiceCycle: "",
      claimDetails: "",
      arMailDate: "",
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
        dfMailDate: order.dfMailDate
          ? new Date(order.dfMailDate).toISOString().split("T")[0]
          : "",
        orderStatus: order.orderStatus || "",
        receivedDate: order.receivedDate
          ? new Date(order.receivedDate).toISOString().split("T")[0]
          : "",
      });
      if (order.claimType && order.claimType.length > 0) {
        const updatedClaims = order.claimType?.map((claim) => ({
          ...claim,
          claimDate: claim.claimDate || formatDate(new Date()), // default to today
          arMailDate: claim.arMailDate || "", // default to today
        }));
        setClaimEntries(updatedClaims);
      } else {
        setClaimEntries([
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
    if (e.target.name === "claimStatus") {
      updatedClaim.arMailDate =
        e.target.value !== ""
          ? formatDate(new Date()) // Today's date
          : ""; // Otherwise, empty string
    }
    if (e.target.name === "claimName") {
      updatedClaim.claimDate =
        e.target.value !== ""
          ? formatDate(new Date()) // Today's date
          : ""; // Otherwise, empty string
    }
    newClaims[index] = updatedClaim;
    setClaimEntries(newClaims);
  };

  const addClaimEntry = () => {
    setClaimEntries([
      ...claimEntries,
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
    ]);
  };

  const deleteClaimEntry = (index) => {
    const newClaims = [...claimEntries];
    newClaims.splice(index, 1);
    setClaimEntries(newClaims);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const claimData = formData.claim === "Yes" ? claimEntries : [];
    if (formData.claim === "" && formData.orderStatus !== "Delivered") {
      toast.error("Please select claim");
    } else {
      dispatch(
        update_single_order({
          orderNumber,
          data: { ...formData, claimType: claimData },
        })
      );
    }
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
