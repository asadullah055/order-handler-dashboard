import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setClaim,
  setOrderStatus,
  setSettled,
} from "../features/orderFilter/orderFilterSlice";
import DropdownItem from "./Filters/Type-Filter/DropdownItem";
import SelectedItems from "./Filters/Type-Filter/SelectedItems";

const MultiSelectDropdown = ({ setCurrentPage }) => {
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
  const settledOptions = ["Yes", "No"];

  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const dropdownRef = useRef(null);

  const options = {
    "Order Status": {
      data: orderStatus,
      all: allStatuses,
      action: setOrderStatus,
    },
    Claim: { data: claim, all: claimOptions, action: setClaim },
    Settled: { data: settled, all: settledOptions, action: setSettled },
  };

  const isParentChecked = (state, allOptions) =>
    state.length === allOptions.length;

  const toggleDropdown = () => setIsOpen(!isOpen);
  const toggleSubmenu = (menu) =>
    setActiveMenu(activeMenu === menu ? null : menu);

  const handleCheckboxChange = (e, option, state, action) => {
    dispatch(
      action(
        e.target.checked
          ? [...state, option]
          : state.filter((item) => item !== option)
      )
    );
  };

  const handleParentCheckboxChange = (e, allOptions, action) => {
    dispatch(action(e.target.checked ? allOptions : []));
  };

  const handleRemoveSelection = (item, state, action) => {
    dispatch(action(state.filter((i) => i !== item)));
  };

  const selectedItems = [...orderStatus, ...claim, ...claimStatus, ...settled];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative inline-block w-full">
      {/* Display Selected Options */}
      <SelectedItems
        selectedItems={selectedItems}
        handleParentCheckboxChange={handleParentCheckboxChange}
        handleRemoveSelection={handleRemoveSelection}
        toggleDropdown={toggleDropdown}
        isParentChecked={isParentChecked}
        options={options}
      />

      {/* Dropdown Options */}
      {isOpen && (
        <DropdownItem
          handleCheckboxChange={handleCheckboxChange}
          toggleSubmenu={toggleSubmenu}
          options={options}
          isParentChecked={isParentChecked}
          handleParentCheckboxChange={handleParentCheckboxChange}
          activeMenu={activeMenu}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};
export default MultiSelectDropdown;
