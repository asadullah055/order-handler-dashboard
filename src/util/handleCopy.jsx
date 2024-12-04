import toast from "react-hot-toast";

export const handleCopy = (orderNumber) => {
  navigator.clipboard.writeText(orderNumber);
  toast.success("copy successfully!", { position: "top-center" });
};
