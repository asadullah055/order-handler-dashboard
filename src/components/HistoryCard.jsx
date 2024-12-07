import React from "react";
import { BiTransferAlt } from "react-icons/bi";
import { CiCalendarDate } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";
import { LuUndo2 } from "react-icons/lu";

const HistoryCard = () => {
  return (
    <div className="bg-slate-100 p-3 rounded border">
      <h3>
        <span className="font-semibold">Order Number:</span>{" "}
        <span>668059740124182</span>
      </h3>
      <p className="mt-1">
        <span className="font-semibold">Action:</span>{" "}
        <span className="text-red-500">Delete</span>
      </p>
      <div className="flex justify-between gap-2 mt-2">
        <p className="inline-flex gap-2 items-center">
          <span>
            <IoMdTime />
          </span>{" "}
          <span>12:30 AM</span>
        </p>
        <p className="inline-flex gap-2 items-center">
          <span>
            <CiCalendarDate />
          </span>{" "}
          <span>01/02/2024</span>
        </p>
      </div>
      <div className="flex items-center justify-around">
        <button className="bg-red-200 text-red-500  px-2 py-1 rounded-md flex items-center gap-2 mt-1">
          {" "}
          <LuUndo2 /> ReStore
        </button>
        <button className="bg-green-500 text-white px-2 py-1 rounded-md flex items-center gap-2 mt-1">
          {" "}
          <BiTransferAlt /> Compare
        </button>
      </div>
    </div>
  );
};

export default HistoryCard;
