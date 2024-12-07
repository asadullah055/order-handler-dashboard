import React from "react";
import HistoryCard from "../../components/HistoryCard";

const HistoryPage = () => {
  return (
    <div className="px-5 ">
      <div className="py-3 flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-teal-500 font-semibold mb-2 ">
            Your All Activities
          </h1>
          <p className="text-red-500">
            Your activities will deleted permanently after 3 days
          </p>
        </div>
      </div>
      <div className="bg-white p-3 rounded shadow-[0_0_15px_0_rgb(34_41_47_/_5%)]">
        <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 py-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
          <HistoryCard />
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
