{/* <div>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-3 p-2">
            <div className="flex items-center gap-2">
              <h2 className="w-[50%] md:w-fit">Status</h2>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setCurrentPage(1);
                }}
                className="focus:outline-slate-200 border rounded md:w-[70%] w-[50%] p-2 "
              >
                <option className="text-center" value="">
                  --select--
                </option>
                <option className="p-2" value="transit">
                  Transit
                </option>
                <option value="Delivered">Delivered</option>
                <option value="Delivery Failed">Delivery Failed</option>
                <option value="Return">Return</option>
                <option value="Not Drop">Not Drop</option>
                <option value="Item Loss">Item Loss</option>
                <option value="Scraped">Scraped</option>
                <option value="No Return Yet">No Return Yet</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <h2 className="w-[50%] md:w-fit">Claim</h2>
              <select
                value={claim}
                onChange={(e) => {
                  setClaim(e.target.value);
                  setCurrentPage(1);
                }}
                className="focus:outline-slate-200 border rounded md:w-[70%] w-[50%] p-2"
              >
                <option className="text-center" value="">
                  --select--
                </option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <h2 className="w-[50%]">Claim Approved</h2>
              <select
                value={claimApproved}
                onChange={(e) => {
                  setClaimApproved(e.target.value);
                  setCurrentPage(1);
                }}
                className="focus:outline-slate-200 border rounded md:w-[70%] w-[50%] p-2"
              >
                <option className="text-center" value="">
                  --select--
                </option>
                <option value="Approve">Approve</option>
                <option value="Reject">Reject</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:flex items-center px-2 py-4">
            <label htmlFor="orderNumber">Order Number:</label>
            <div className="flex items-center flex-wrap gap-2">
              <input
                className="focus:outline-gray-200 p-2 ml-2 border rounded"
                id="orderNumber"
                type="text"
                value={orderNumber}
                onChange={(e) => {
                  setOrderNumber(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Order number"
              />

              <button
                type="button"
                onClick={reset}
                className="bg-red-500 font-poppin text-white font-medium px-3 py-2 rounded-md"
              >
                Reset
              </button>
            </div>
          </div>
        </div> */}



        // data 

        {/* <div className="relative overflow-x-auto rounded-md p-2">
        <form onSubmit={handleSubmit}>
          <table className="text-sm text-left rounded-md p-2 text-black w-full">
            <thead className="text-sm uppercase border bg-gray-200">
              <tr>
                <th className="py-3 px-2 border w-[50%]">Title</th>
                <th className="py-3 px-2 border w-[50%]">Status</th>
              </tr>
            </thead>
            <tbody className="[&>:nth-child(odd)]:bg-gray-100">
              <tr className="border">
                <td className="p-3 font-medium border">Order Number</td>
                <td className="p-3 font-medium border">{orderNumber}</td>
              </tr>
              <UpdateTr
                title={"Drop Date"}
                type={"date"}
                name="date"
                value={formData.date}
                onChange={handleInputChange}
              />
              <tr className="border">
                <td className="p-3 font-medium border">Order Status</td>
                <td className="p-1 font-medium border">
                  <select
                    name="orderStatus"
                    value={formData.orderStatus}
                    onChange={handleInputChange}
                    className="w-full p-3 focus:outline-slate-200 border rounded"
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
                </td>
              </tr>
              <UpdateTr
                title={"DF Mail Date"}
                type={"date"}
                name="dfMailDate"
                value={formData.dfMailDate}
                onChange={handleInputChange}
              />
              <UpdateTr
                title={"Receive Date"}
                type={"date"}
                name="receivedDate"
                value={formData.receivedDate}
                onChange={handleInputChange}
              />
              <tr className="border">
                <td className="p-3 font-medium border">Claim</td>
                <td className="p-1 font-medium border">
                  <select
                    name="claim"
                    value={formData.claim}
                    onChange={handleInputChange}
                    className="w-full focus:outline-slate-200 border rounded p-3"
                  >
                    <option value="">--select--</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </td>
              </tr>
              <tr className="border">
                <td className="p-3 font-medium border">Claim Type</td>
                <td className="p-1 font-medium border">
                  <select
                    name="approvedOrReject"
                    value={formData.approvedOrReject}
                    onChange={handleInputChange}
                    className="w-full  focus:outline-slate-200 border rounded p-3"
                  >
                    <option value="">--select--</option>
                    <option value="Approve">Approve</option>
                    <option value="Reject">Reject</option>
                  </select>
                </td>
                <td>f</td>
                <td>f</td>
              </tr>
              <UpdateTr
                title={"Claim Type"}
                type={"text"}
                name="claimType"
                value={formData.claimType}
                placeholder="Claim Type"
                onChange={handleInputChange}
              />
              <UpdateTr
                title={"CSMD"}
                type={"date"}
                name="csmd"
                value={formData.csmd}
                onChange={handleInputChange}
              />
              <UpdateTr
                title={"Case Number"}
                type={"text"}
                name="caseNumber"
                value={formData.caseNumber}
                placeholder="Case Number"
                onChange={handleInputChange}
              />
              <tr className="border">
                <td className="p-3 font-medium border">Claim Approve</td>
                <td className="p-1 font-medium border">
                  <select
                    name="approvedOrReject"
                    value={formData.approvedOrReject}
                    onChange={handleInputChange}
                    className="w-full  focus:outline-slate-200 border rounded p-3"
                  >
                    <option value="">--select--</option>
                    <option value="Approve">Approve</option>
                    <option value="Reject">Reject</option>
                  </select>
                </td>
              </tr>
              <UpdateTr
                title={"A/R Mail Date"}
                type={"date"}
                name="arMailDate"
                value={formData.arMailDate}
                onChange={handleInputChange}
              />
              <UpdateTr
                title={"Paid Amount"}
                type={"text"}
                name="paidAmount"
                value={formData.paidAmount}
                placeholder="Paid Amount"
                onChange={handleInputChange}
              />
              <UpdateTr
                title={"Invoice Cycle"}
                type={"text"}
                name="statementNoOrInvoiceCycle"
                value={formData.statementNoOrInvoiceCycle}
                placeholder="Invoice Cycle"
                onChange={handleInputChange}
              />
              <UpdateTr
                title={"Comment"}
                type={"text"}
                name="comment"
                value={formData.comment}
                placeholder="Comment"
                onChange={handleInputChange}
              />
              <UpdateTr
                title={"Complain Details"}
                type={"text"}
                name="complainDetails"
                value={formData.complainDetails}
                placeholder="Complain Details"
                onChange={handleInputChange}
              />
              <tr className="border">
                <td></td>
                <td className="p-1 font-medium border">
                  <div className="flex justify-between w-[90%] gap-4">
                    <button
                      type="button"
                      className="p-2 bg-red-500 text-white rounded-md w-1/2"
                    >
                      Cancel
                    </button>
                    <button
                      disabled={isLoading}
                      type="submit"
                      className="p-2 bg-emerald-500 text-white rounded-md w-1/2"
                    >
                      {isLoading ? <LoadingBtn /> : "Update"}
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div> */}