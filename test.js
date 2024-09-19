<div className="relative  overflow-x-auto rounded-md p-2">
<form onSubmit={handleSubmit}>
  <div className="text-sm text-left rounded-md p-2 text-black w-full">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 gap-x">
      <div className="flex gap-2 items-center justify-between p-2">
        <p className="font-bold text-[16px] text-teal-500">
          Order Number
        </p>
        <p>{orderNumber}</p>
      </div>
      <div className="flex gap-2 items-center justify-between p-1">
        <p className="font-bold text-teal-500">Drop Date</p>
        <input
          className="w-1/2 p-3 focus:outline-slate-300 border rounded"
          type="date"
        />
      </div>
      {/* order status */}
      <div className="flex gap-2 items-center justify-between p-1">
        <p className="font-bold text-teal-500">Order status</p>
        <select
          name="orderStatus"
          value={formData.orderStatus}
          onChange={handleInputChange}
          className="w-1/2 p-3 focus:outline-slate-200 border rounded"
        >
          <option value="transit">Transit</option>
          <option value="Delivered">Delivered</option>
          <option value="Delivery Failed">Delivery Failed</option>
          <option value="Return">Return</option>
          <option value="Not Drop">Not Drop</option>
          <option value="Item Loss">Item Loss</option>
          <option value="Scraped">Scraped</option>
          <option value="No Return Yet">No Return Yet</option>
        </select>
      </div>
      {/* DF Mail Date */}
      <div className="flex gap-2 items-center justify-between p-1">
        <p className="font-bold text-teal-500">DF Mail Date</p>
        <input
          className="w-1/2 p-3 focus:outline-slate-300 border rounded"
          type="date"
        />
      </div>
      {/* Receive Date */}
      <div className="flex gap-2 items-center justify-between p-1">
        <p className="font-bold text-teal-500">Receive Date</p>
        <input
          className="w-1/2 p-3 focus:outline-slate-300 border rounded"
          type="date"
        />
      </div>
      <div className="flex gap-2 items-center justify-between p-1">
        <p className="font-bold text-teal-500">Claim</p>
        <select
          name="claim"
          value={formData.claim}
          onChange={handleInputChange}
          className="w-1/2 p-3 focus:outline-slate-200 border rounded"
        >
          <option value="">--select--</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>
    </div>
    {formData.claim === "Yes" && (
      <div className="flex items-center gap-2">
        <div className="font-bold text-teal-500 whitespace-nowrap">
          Claim Type
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 gap-2 ">
            {claimEntries.map((entry, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-2 mt-2"
              >
                <select
                  name="claimName"
                  value={entry.claimName}
                  onChange={(e) => handleClaimChange(index, e)}
                  className="p-2 focus:outline-slate-200 border rounded"
                >
                  <option value="">--select--</option>
                  <option value="Wrong Item">Wrong Item</option>
                  <option value="Missing Item">Missing Item</option>
                  <option value="Score Card">Score Card</option>
                </select>

                <input
                  type="text"
                  name="caseNumber"
                  value={entry.caseNumber}
                  onChange={(e) => handleClaimChange(index, e)}
                  className="border p-2 focus:outline-0"
                  placeholder="Additional Information"
                />

                <div className="flex items-center justify-between">
                  <input
                    type="date"
                    name="claimDate"
                    value={entry.claimDate}
                    onChange={(e) => handleClaimChange(index, e)}
                    className="border p-2 focus:outline-0 w-full"
                  />
                  <button
                    type="button"
                    onClick={() => deleteClaimEntry(index)}
                    className="bg-red-500 text-white p-1 rounded ml-2"
                  >
                    <RiDeleteBin6Line />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
    <button
      type="button"
      onClick={addClaimEntry}
      className="bg-teal-500 text-white rounded p-2 mt-3"
    >
      Add More
    </button>
  </div>
  {/* <button
    disabled={isLoading}
    type="submit"
    className="p-2 bg-emerald-500 text-white rounded-md w-1/2"
  >
    update
  </button> */}
</form>
</div>


// order_management