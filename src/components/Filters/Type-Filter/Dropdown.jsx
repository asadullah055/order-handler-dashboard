// Dropdown.js
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { get_all_order } from "../../../features/order/orderSlice";
import {
  setClaim,
  setClaimStatus,
  setOrderStatus,
  setSettled,
} from "../../../features/orderFilter/orderFilterSlice";
import {
  handleCheckboxChange,
  handleParentCheckboxChange,
} from "../../../util/helpers";
import DropdownItem from "./DropdownItem";
import SelectedItems from "./SelectedItems";

export default function Dropdown() {
  const dispatch = useDispatch();
  const { orderStatus, claim, claimStatus, settled } = useSelector(
    (state) => state.dropdown
  );

  const allStatuses = [
    "transit",
    "Delivered",
    "Delivery Failed",
    "Return",
    "Not Drop",
    "Item Loss",
    "Scraped",
    "No Return Yet",
    "Cancel",
  ];
  const claimOptions = ["Yes", "No"];
  const claimStatusOptions = ["Approved", "Rejected"];
  const settledOptions = ["Yes", "No"];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Parent Checkbox states
  const isOrderStatusParentChecked = orderStatus.length === allStatuses.length;
  const isClaimParentChecked = claim.length === claimOptions.length;
  const isClaimStatusParentChecked =
    claimStatus.length === claimStatusOptions.length;
  const isSettledParentChecked = settled.length === settledOptions.length;

  // Handle dropdown toggles
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Handle Remove selection
  const handleRemoveSelection = (item, setState, state) => {
    dispatch(setState(state.filter((status) => status !== item)));
  };

  // All selected items combined
  const selectedItems = [...orderStatus, ...claim, ...claimStatus, ...settled];

  useEffect(() => {
    dispatch(
      get_all_order({
        orderStatus,
        claim,
      })
    );
  }, [claim, orderStatus, dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Parent checkbox map
  const isParentCheckedMap = {
    "Order Status": isOrderStatusParentChecked,
    Claim: isClaimParentChecked,
    "Claim Status": isClaimStatusParentChecked,
    Settled: isSettledParentChecked,
  };

  // Options map
  const optionsMap = {
    "Order Status": allStatuses,
    Claim: claimOptions,
    "Claim Status": claimStatusOptions,
    Settled: settledOptions,
  };

  return (
    <div ref={dropdownRef} className="relative inline-block w-full">
      {/* Display Selected Options */}
      <SelectedItems
        selectedItems={selectedItems}
        isParentCheckedMap={isParentCheckedMap}
        handleParentCheckboxChange={handleParentCheckboxChange}
        handleRemoveSelection={handleRemoveSelection}
        optionsMap={optionsMap}
      />

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-[75%] max-h-64 overflow-auto">
          <div className="p-2">
            <ul>
              {/* Order Status Section */}
              <DropdownItem
                option="Order Status"
                isChecked={isOrderStatusParentChecked}
                handleCheckboxChange={(e) =>
                  handleParentCheckboxChange(e, allStatuses, setOrderStatus)
                }
              >
                <ul className="ml-5">
                  {allStatuses.map((status) => (
                    <DropdownItem
                      key={status}
                      option={status}
                      isChecked={orderStatus.includes(status)}
                      handleCheckboxChange={(e) =>
                        handleCheckboxChange(
                          e,
                          status,
                          setOrderStatus,
                          orderStatus
                        )
                      }
                    />
                  ))}
                </ul>
              </DropdownItem>

              {/* Claim Section */}
              <DropdownItem
                option="Claim"
                isChecked={isClaimParentChecked}
                handleCheckboxChange={(e) =>
                  handleParentCheckboxChange(e, claimOptions, setClaim)
                }
              >
                <ul className="ml-5">
                  {claimOptions.map((option) => (
                    <DropdownItem
                      key={option}
                      option={option}
                      isChecked={claim.includes(option)}
                      handleCheckboxChange={(e) =>
                        handleCheckboxChange(e, option, setClaim, claim)
                      }
                    />
                  ))}
                </ul>
              </DropdownItem>

              {/* Claim Status Section */}
              <DropdownItem
                option="Claim Status"
                isChecked={isClaimStatusParentChecked}
                handleCheckboxChange={(e) =>
                  handleParentCheckboxChange(
                    e,
                    claimStatusOptions,
                    setClaimStatus
                  )
                }
              >
                <ul className="ml-5">
                  {claimStatusOptions.map((option) => (
                    <DropdownItem
                      key={option}
                      option={option}
                      isChecked={claimStatus.includes(option)}
                      handleCheckboxChange={(e) =>
                        handleCheckboxChange(
                          e,
                          option,
                          setClaimStatus,
                          claimStatus
                        )
                      }
                    />
                  ))}
                </ul>
              </DropdownItem>

              {/* Settled Section */}
              <DropdownItem
                option="Settled"
                isChecked={isSettledParentChecked}
                handleCheckboxChange={(e) =>
                  handleParentCheckboxChange(e, settledOptions, setSettled)
                }
              >
                <ul className="ml-5">
                  {settledOptions.map((option) => (
                    <DropdownItem
                      key={option}
                      option={option}
                      isChecked={settled.includes(option)}
                      handleCheckboxChange={(e) =>
                        handleCheckboxChange(e, option, setSettled, settled)
                      }
                    />
                  ))}
                </ul>
              </DropdownItem>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
