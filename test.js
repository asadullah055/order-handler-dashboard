/* import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { RiCloseFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { get_all_order } from "../features/order/orderSlice";
import InputCheckbox from "./InputCheckBok";

const filterData = [
  {
    id: 1,
    "Order Status": [
      "transit",
      "Delivered",
      "Delivery Failed",
      "Return",
      "Not Drop",
      "Item Loss",
      "Scraped",
      "No Return Yet",
      "Cancel",
    ],
  },
  {
    id: 2,
    Claim: ["Yes", "No"],
  },
  {
    id: 3,
    Settled: ["Yes", "No"],
  },
];

const MultiLevelDropdown = () => {
  const [data] = useState(filterData);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const toggleDropdown = () => setIsOpen(!isOpen);

  const toggleSubMenu = (id) => {
    setExpandedMenu((prev) => (prev === id ? null : id));
  };

  const handleParentChange = (category) => {
    const options = data.find((item) => Object.keys(item)[1] === category)[
      category
    ];
    const allSelected =
      (selectedOptions[category] || []).length === options.length;

    const updatedSelections = {
      ...selectedOptions,
      [category]: allSelected ? [] : options,
    };

    setSelectedOptions(updatedSelections);
  };

  const handleChildChange = (category, option) => {
    const currentSelection = selectedOptions[category] || [];
    const newSelection = currentSelection.includes(option)
      ? currentSelection.filter((item) => item !== option)
      : [...currentSelection, option];

    setSelectedOptions({
      ...selectedOptions,
      [category]: newSelection,
    });
  };

  const removeFilter = (category, option) => {
    const updatedSelections = {
      ...selectedOptions,
      [category]: option
        ? selectedOptions[category].filter((item) => item !== option)
        : [],
    };
    setSelectedOptions(updatedSelections);
  };

  const getSelectedFilters = () => {
    const filters = [];
    for (const category in selectedOptions) {
      const selectedOptionsInCategory = selectedOptions[category];
      if (selectedOptionsInCategory.length > 0) {
        if (
          selectedOptionsInCategory.length ===
          data.find((item) => Object.keys(item)[1] === category)[category]
            .length
        ) {
          filters.push({ category });
        } else {
          selectedOptionsInCategory.forEach((option) => {
            filters.push({ category, option });
          });
        }
      }
    }
    return filters;
  };

  const isIndeterminate = (category) => {
    const options = data.find((item) => Object.keys(item)[1] === category)[
      category
    ];
    const selectedCount = (selectedOptions[category] || []).length;
    return selectedCount > 0 && selectedCount < options.length;
  };
  useEffect(() => {
    dispatch(get_all_order(getSelectedFilters()));
  }, [dispatch]);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-[500px]">
      <div
        onClick={toggleDropdown}
        className="w-full p-2 border rounded cursor-pointer bg-gray-100 flex flex-wrap gap-2 items-center"
      >
        {getSelectedFilters().map((filter, index) => (
          <div
            key={index}
            className="flex items-center bg-teal-50 text-teal-600 rounded p-1 capitalize"
          >
            {filter.option ? filter.option : filter.category}
            <button
              className="ml-1 text-red-600"
              onClick={(e) => {
                e.stopPropagation();
                removeFilter(filter.category, filter.option);
              }}
            >
              <RiCloseFill />
            </button>
          </div>
        ))}
        {getSelectedFilters().length === 0 && (
          <span className="text-gray-500">Please Select</span>
        )}
      </div>
      {isOpen && (
        <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded shadow-lg z-10">
          <ul className="p-2">
            {data.map((item) => {
              const [category, options] = Object.entries(item)[1];

              return (
                <li key={item.id}>
                  <div className="flex items-center cursor-pointer gap-2">
                    <InputCheckbox
                      type="checkbox"
                      indeterminate={isIndeterminate(category)}
                      checked={
                        (selectedOptions[category] || []).length ===
                        options.length
                      }
                      onChange={() => handleParentChange(category)}
                    />
                    <div
                      onClick={() => toggleSubMenu(item.id)}
                      className="flex items-center justify-between w-full"
                    >
                      <span>{category}</span>
                      <span
                        className={`transition-transform duration-300 ${
                          expandedMenu === item.id ? "rotate-180" : ""
                        }`}
                      >
                        <IoIosArrowDown />
                      </span>
                    </div>
                  </div>
                  <ul
                    className={`ml-4 mt-1 transition-all duration-300 ${
                      expandedMenu === item.id ? "max-h-screen" : "max-h-0"
                    } overflow-hidden`}
                  >
                    {options.map((option, index) => (
                      <li key={index} className="cursor-pointer capitalize">
                        <div className="flex items-center gap-2">
                          <InputCheckbox
                            type="checkbox"
                            checked={(selectedOptions[category] || []).includes(
                              option
                            )}
                            onChange={() => handleChildChange(category, option)}
                          />
                          <span>{option}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiLevelDropdown;
 */
