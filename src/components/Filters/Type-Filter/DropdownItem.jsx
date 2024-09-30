import React from "react";

const DropdownItem = ({
  toggleSubmenu,
  handleParentCheckboxChange,
  options,
  isParentChecked,
  handleCheckboxChange,
  activeMenu,
  setCurrentPage = { setCurrentPage },
}) => {
  return (
    <div className="absolute mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 w-[100%] md:w-[75%] max-h-64 overflow-auto">
      <div className="p-2">
        <ul>
          {Object.keys(options).map((key) => (
            <li key={key} className="p-0.5">
              <span>
                <input
                  type="checkbox"
                  className="mr-1 w-4 h-4"
                  checked={isParentChecked(options[key].data, options[key].all)}
                  onChange={(e) =>
                    handleParentCheckboxChange(
                      e,
                      options[key].all,
                      options[key].action
                    )
                  }
                />
              </span>
              <span
                className="cursor-pointer"
                onClick={() => toggleSubmenu(key)}
              >
                {key}
              </span>
              <ul
                className={`ml-5 transition-all duration-300 ${
                  activeMenu === key
                    ? "max-h-64 opacity-100"
                    : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                {options[key].all.map((option) => (
                  <li key={option} className="p-0.5 capitalize">
                    <input
                      type="checkbox"
                      className="mr-1 w-4 h-4"
                      checked={options[key].data.includes(option)}
                      onChange={(e) => {
                        handleCheckboxChange(
                          e,
                          option,
                          options[key].data,
                          options[key].action
                        );
                        setCurrentPage(1);
                      }}
                    />
                    {option}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropdownItem;
