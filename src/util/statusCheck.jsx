export const evaluateArrayStatus = (arr) => {
  if (arr.length === 0) return "";
  const statuses = arr.map((item) => item.claimStatus);

  const allApproved = statuses.every((status) => status === "Approved");
  const allRejected = statuses.every((status) => status === "Reject");
  const allEmpty = statuses.every((status) => status === "");
  if (allApproved) {
    return (
      <span className="bg-green-500 text-white p-2 rounded-md text-center w-[85px] inline-block ms-1">
        Approved
      </span>
    );
  } else if (allRejected) {
    return (
      <span className="bg-red-500 text-white p-2 rounded-md text-center w-[85px] inline-block ms-1">
        Reject
      </span>
    );
  } else if (allEmpty) {
    return (
      <span className="bg-gray-300 text-black p-2 rounded-md text-center w-[85px] inline-block ms-1">
        No Status
      </span>
    );
  } else {
    return (
      <span className="bg-indigo-500 text-white p-2 rounded-md text-center w-[85px] inline-block ms-1">
        Partial
      </span>
    );
  }
};
