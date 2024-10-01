import React from 'react';

const OrderStatus = ({formData,handleInputChange}) => {
    return (
        <tr className="border">
              <td className="p-3 font-medium border">Order Status</td>
              <td className="p-1 font-medium border">
                <select
                  name="orderStatus"
                  value={formData.orderStatus}
                  onChange={handleInputChange}
                  className="w-full md:w-3/4 p-3 focus:outline-slate-200 border rounded"
                >
                  <option value="transit">Transit</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Delivery Failed">Delivery Failed</option>
                  <option value="Return">Return</option>
                  <option value="Not Drop">Not Drop</option>
                  <option value="Item Loss">Item Loss</option>
                  <option value="Scraped">Scraped</option>
                  <option value="No Return Yet">No Return Yet!</option>
                </select>
              </td>
            </tr>
    );
};

export default OrderStatus;