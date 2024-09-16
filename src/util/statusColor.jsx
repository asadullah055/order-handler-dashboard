export const getOrderStatusClass = (orderStatus) => {
  switch (orderStatus) {
    case "Delivery Failed":
      return "bg-red-500 text-white inline-flex justify-center w-28";
    case "Return":
      return "bg-indigo-500 text-white inline-flex justify-center w-28";
    case "Delivered":
      return "bg-green-500 text-white inline-flex justify-center w-28";
    case "Not Drop":
      return "bg-red-200 text-red-500 inline-flex justify-center w-28";
    case "No Return Yet":
      return "bg-yellow-500 text-white inline-flex justify-center w-28";
    case "Item Loss":
      return "bg-rose-500 text-white inline-flex justify-center w-28";
    default:
      return "bg-gray-200 inline-flex justify-center w-28";
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
