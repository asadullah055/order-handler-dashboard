import React, { useState } from "react";

const UpdateBulkOrders = () => {
  //   const dispatch = useDispatch();
  //   const { orders } = useSelector((state) => state.order);
  const [status, setStatus] = useState("");

  const [textareaValue, setTextareaValue] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!textareaValue.trim()) {
      return;
    }

    const newOrders = textareaValue
      .trim()
      .split(/[\n, ,]+/)
      .map((item) => ({
        orderNumber: item.trim(),
        status,
      }));
    console.log(newOrders);

    // dispatch(create_order(newOrders));
    setTextareaValue("");
  };

  return (
    <div className="flex justify-center mt-5">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          name="orderStatus"
          className="w-full p-3 focus:outline-slate-200 border rounded"
        >
          <option className="text-center" value="">
            --select--
          </option>

          <option value="Delivered">Delivered</option>
          <option value="Delivery Failed">Delivery Failed</option>
        </select>
        {status === "Delivery Failed" && (
          <input
            className="rounded-md p-2 border border-teal-500 focus:border-teal-500 focus:outline-none"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        )}
        <textarea
          cols={40}
          rows={15}
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)}
          className="resize-y focus:outline-slate-200 border rounded  p-2"
        ></textarea>
        <button className="bg-[#00b795] font-poppin text-white font-medium px-3 py-2 rounded-md">
          {"Update"}
        </button>
      </form>
    </div>
  );
};

export default UpdateBulkOrders;
