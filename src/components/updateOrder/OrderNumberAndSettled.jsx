import React from "react";

const OrderNumberAndSettled = ({ order, formData, handleInputChange }) => {
  return (
    <tr className="border">
      <td className="p-3 font-medium border">Order Number</td>
      <td className="p-3 font-medium border flex items-center">
        <span className="w-1/3">{order.orderNumber}</span>
        {formData.orderStatus === "Delivered" ||
        (formData.orderStatus === "Delivery Failed" &&
          formData.claim === "No") ? (
          <h2 className="bg-teal-100 p-1 rounded font-semibold">Settled</h2>
        ) : (
          <div className="flex items-center gap-2 w-1/3">
            <h2 className="w-1/2 font-semibold">Settled</h2>
            <select
              name="settled"
              value={formData.settled}
              onChange={handleInputChange}
              className="w-full p-1 focus:outline-slate-200 border rounded"
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        )}
      </td>
    </tr>
  );
};

export default OrderNumberAndSettled;
