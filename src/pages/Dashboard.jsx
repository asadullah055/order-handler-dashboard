import React from "react";
import { MdOutlineDirectionsTransitFilled } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OrderCard from "../components/OrderCard";

const Dashboard = () => {
  const { token, userInfo } = useSelector((state) => state.auth);

  return (
    <div className="px-5 ">
      <div className="py-3 flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-teal-500 font-semibold mb-2 ">
            Welcome {userInfo?.shopName}
          </h1>
          <p>Monitor your business analytics and statistics.</p>
        </div>
        <Link
          to="/add-order"
          className="bg-[#00b795] sm:block hidden font-poppin text-white font-medium p-3 rounded-md"
        >
          Add Order
        </Link>
      </div>
      <div className="bg-white p-3 rounded shadow-[0_0_15px_0_rgb(34_41_47_/_5%)]">
        <h2 className="font-semibold text-[#334257]">All Order Analytics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 py-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <OrderCard
            title={"Transit"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
          <OrderCard
            title={"Delivered"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
          <OrderCard
            title={"Delivery Failed"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
          <OrderCard
            title={"Return"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
          <OrderCard
            title={"Not Drop"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
          <OrderCard
            title={"Item Loss"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
          <OrderCard
            title={"Scraped"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
          <OrderCard
            title={"No Return Yet"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
        </div>
      </div>
      {/* Order Analytics in 60 Days */}
      <div className="bg-white mt-4 p-3 rounded shadow-[0_0_15px_0_rgb(34_41_47_/_5%)]">
        <h2 className="font-semibold text-[#334257]">
          Order Analytics in 60 Days
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 py-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <OrderCard
            title={"Transit"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
          <OrderCard
            title={"Delivered"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
          <OrderCard
            title={"Delivery Failed"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
          <OrderCard
            title={"Return"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
          <OrderCard
            title={"Not Drop"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
          <OrderCard
            title={"Item Loss"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
          <OrderCard
            title={"Scraped"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
          <OrderCard
            title={"No Return Yet"}
            icon={<MdOutlineDirectionsTransitFilled />}
            count={"10"}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
