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
