export const getOrderStatusClass = (orderStatus) => {
  switch (orderStatus) {
    case "Delivery Failed":
      return "bg-red-500 text-white inline-flex justify-center";
    case "Return":
      return "bg-indigo-500 text-white inline-flex justify-center ";
    case "Delivered":
      return "bg-green-500 text-white inline-flex justify-center ";
    case "Not Drop":
      return "bg-red-200 text-red-500 inline-flex justify-center ";
    case "No Return Yet":
      return "bg-yellow-500 text-white inline-flex justify-center ";
    case "Item Loss":
      return "bg-rose-500 text-white inline-flex justify-center ";
    default:
      return "bg-gray-200 inline-flex justify-center ";
  }
};

export const getOrderCount = (
  title,
  allOrder,
  totalDF,
  totalUnSettled,
  totalReturn
) => {
  if (title === "All Orders") {
    return allOrder;
  } else if (title === "Delivery Failed") {
    return totalDF;
  } else if (title === "Unsettled order") {
    return totalUnSettled;
  } else if (title === "Return") {
    return totalReturn;
  } else {
    return 0;
  }
};
