import React from "react";
import { FaCheck, FaMinus } from "react-icons/fa";

const InputCheckbox = ({ checked, indeterminate, onChange }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className={`appearance-none w-[18px] h-[18px]  border-teal-400 ${
          (checked || indeterminate) && "bg-teal-400"
        } rounded transition-colors border-2 duration-200 outline-none`}
      />

      {/* Icon Wrapper */}
      <span className="absolute inset-0 flex items-center justify-center text-white pointer-events-none ">
        {checked ? (
          <FaCheck size={12} />
        ) : indeterminate ? (
          <FaMinus size={12} />
        ) : null}
      </span>
    </label>
  );
};

export default InputCheckbox;
