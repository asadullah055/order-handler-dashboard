import React from "react";

const OrderModal = ({ isOpen, onClose, order }) => {
  if (!isOpen) return null;

  // Handler for closing the modal when clicking outside the modal content
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick} // Attach the backdrop click handler here
      className="fixed inset-0 bg-gray-600 bg-opacity-70 flex justify-center items-center z-[100]"
    >
      <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">Order Number #{order.orderNumber}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            &times;
          </button>
        </div>

        {/* Status */}
        <div className="flex justify-end mb-4">
          <span className="px-2 py-1 bg-teal-100 text-teal-800 text-xs rounded-full">
            {order.settled === "Yes" ? "Settled" : "Unsettled"}
          </span>
        </div>

        {/* Billing and Shipping Details */}

        {/* Action Buttons */}
        <div className="flex justify-between mt-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Processing
          </button>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
