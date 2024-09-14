export const getOrderStatusClass = (orderStatus) => {
  switch (orderStatus) {
    case "Delivery Failed":
      return "bg-red-500 text-white";
    case "Return":
      return "bg-indigo-500 text-white";
    case "Delivered":
      return "bg-green-500 text-white";
    case "Not Drop":
      return "bg-red-200 text-red-500";
    case "No Return Yet":
      return "bg-yellow-500 text-white";
    case "Item Loss":
      return "bg-rose-500 text-white";
    default:
      return "bg-gray-200";
  }
};

export const getOrderCount = (title, allOrder, totalDF) => {
  if (title === "All Orders") {
    return allOrder;
  } else if (title === "Delivery Failed") {
    return totalDF;
  } else {
    return 0;
  }
};
