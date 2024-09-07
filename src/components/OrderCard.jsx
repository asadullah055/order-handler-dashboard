import React from "react";
import { Link } from "react-router-dom";

const OrderCard = ({ icon, title, count }) => {
  return (
    <Link to="#">
      <div className="bg-slate-100 p-3 py-4 rounded flex justify-between border">
        <span className="flex gap-2 items-center">
          {icon}
          <h3>{title}</h3>
        </span>
        <span className="font-semibold">{count}</span>
      </div>
    </Link>
  );
};

export default OrderCard;
