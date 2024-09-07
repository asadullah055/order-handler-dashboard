import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="px-5 ">
      <div className="py-3 flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-teal-500 font-semibold mb-2 ">
            Welcome Shop Name
          </h1>
          <p>Monitor your business analytics and statistics.</p>
        </div>
        <Link
          to="/add-order"
          className="bg-[#00b795] font-poppin text-white font-medium p-3 rounded-md"
        >
          Add Order
        </Link>
      </div>
      <div className="bg-white p-3 rounded shadow-[0_0_15px_0_rgb(34_41_47_/_5%)]">
        <h2 className="font-semibold text-[#334257]">Order Analytics</h2>
        <div className="">
          
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
