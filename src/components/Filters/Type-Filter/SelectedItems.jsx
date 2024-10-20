// SelectedItems.js
import React from "react";
import { RiCloseFill } from "react-icons/ri";

export default function SelectedItems({
  selectedItems,
  isParentChecked,
  handleParentCheckboxChange,
  handleRemoveSelection,
  options,
  toggleDropdown,
}) {
  return (
    <div
      className="w-full p-2 border rounded cursor-pointer bg-gray-100 flex flex-wrap gap-2 items-center"
      onClick={toggleDropdown}
    >
      {selectedItems.length > 0 ? (
        Object.keys(options).map((key) =>
          isParentChecked(options[key].data, options[key].all) ? (
            <span
              key={key}
              className="flex items-center bg-teal-50 text-teal-600 rounded p-1"
            >
              {key}
              <button
                className="ml-1 text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  handleParentCheckboxChange(
                    { target: { checked: false } },
                    options[key].all,
                    options[key].action
                  );
                }}
              >
                <RiCloseFill />
              </button>
            </span>
          ) : (
            options[key].data.map((item) => (
              <span
                key={item}
                className="flex items-center bg-teal-50 capitalize text-teal-600 rounded p-1"
              >
                {item}
                <button
                  className="ml-1 text-red-600"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveSelection(
                      item,
                      options[key].data,
                      options[key].action
                    );
                  }}
                >
                  <RiCloseFill />
                </button>
              </span>
            ))
          )
        )
      ) : (
        <span className="text-gray-500">Please Select</span>
      )}
    </div>
  );
}
