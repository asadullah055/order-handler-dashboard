import React, { useState } from "react";

const DropdownFilter = () => {
  const [selectedFilters, setSelectedFilters] = useState({
    returnedOrders: false,
    productRefunded: false,
    promotionalBundles: false,
    promotionalVouchers: false,
    generalCharges: false,
    itemRefunded: false,
    reversalItemPrice: false,
  });

  const [isDropdownOpen, setIsDropdownOpen] = useState({
    transactionType: false,
    returnedOrders: false,
  });

  const handleDropdownToggle = (dropdown) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="dropdown">
      <div
        className="dropdown-header"
        onClick={() => handleDropdownToggle("transactionType")}
      >
        Transaction Type {isDropdownOpen.transactionType ? "▲" : "▼"}
      </div>
      {isDropdownOpen.transactionType && (
        <div className="dropdown-options">
          <div>
            <input
              type="checkbox"
              name="returnedOrders"
              checked={selectedFilters.returnedOrders}
              onChange={handleCheckboxChange}
            />
            <span>Returned Orders</span>
            <span onClick={() => handleDropdownToggle("returnedOrders")}>
              {isDropdownOpen.returnedOrders ? "▲" : "▼"}
            </span>
          </div>
          {isDropdownOpen.returnedOrders && (
            <div className="sub-options">
              <div>
                <input
                  type="checkbox"
                  name="productRefunded"
                  checked={selectedFilters.productRefunded}
                  onChange={handleCheckboxChange}
                />
                <span>Product Price Refunded to Buyer</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="promotionalBundles"
                  checked={selectedFilters.promotionalBundles}
                  onChange={handleCheckboxChange}
                />
                <span>Reversal Promotional Charges Bundles</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="promotionalVouchers"
                  checked={selectedFilters.promotionalVouchers}
                  onChange={handleCheckboxChange}
                />
                <span>Reversal Promotional Charges Vouchers</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="generalCharges"
                  checked={selectedFilters.generalCharges}
                  onChange={handleCheckboxChange}
                />
                <span>Reversal Promotional Charges General</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="itemRefunded"
                  checked={selectedFilters.itemRefunded}
                  onChange={handleCheckboxChange}
                />
                <span>Adjustments Item Charge Refunded</span>
              </div>
              <div>
                <input
                  type="checkbox"
                  name="reversalItemPrice"
                  checked={selectedFilters.reversalItemPrice}
                  onChange={handleCheckboxChange}
                />
                <span>Reversal Item Price (Paid by consumer)</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DropdownFilter;
