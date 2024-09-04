import React, { useState } from "react";
import LoadingBtn from "../components/LoadingBtn";

const Order = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex justify-center mt-5">
      <div className="flex flex-col gap-2">
        <textarea
          cols={40}
          rows={15}
          className="resize-y rounded-md border border-teal-500 focus:border-teal-500 focus:outline-none"
        ></textarea>
        <button
          disabled={loading}
          className="bg-[#00b795] font-poppin text-white font-medium px-3 py-2 rounded-md"
        >
          {loading ? <LoadingBtn /> : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Order;
