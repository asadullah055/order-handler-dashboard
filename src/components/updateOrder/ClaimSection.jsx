import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";

const ClaimSection = ({
  claimEntries,
  handleClaimChange,
  deleteClaimEntry,
  addClaimEntry,
}) => {
  return (
    <tr className="border">
      <td scope="row" className="p-3 font-medium border whitespace-nowrap">
        Claim Type
      </td>
      <td scope="row" className="p-1 font-medium border whitespace-nowrap">
        <div className="grid grid-cols-1">
          {claimEntries?.map((entry, index) => {
            const lastIndex = claimEntries.length - 1;

            return (
              <div
                key={index}
                className="flex flex-col w-full gap-2 mt-2 md:w-3/4"
              >
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                  <p className="w-[25%]">Claim Name</p>
                  <select
                    name="claimName"
                    value={entry.claimName}
                    onChange={(e) => handleClaimChange(index, e)}
                    className="p-2 focus:outline-slate-200 border rounded w-full md:w-[75%]"
                  >
                    <option value="">--select--</option>
                    <option value="Damaged item received">
                      Damaged item received
                    </option>
                    <option value="Returned item never received">
                      Returned item never received
                    </option>
                    <option value="Wrong item received">
                      Wrong item received
                    </option>
                    <option value="Package received after the promised timeline">
                      Package received after the promised timeline
                    </option>
                    <option value="Missing Item / Component / Accessories / Bundle">
                      Missing Item / Component / Accessories / Bundle
                    </option>
                    <option value="Financial Penalty Cancellations">
                      Financial Penalty Cancellations
                    </option>
                    <option value="Financial Penalty Returns">
                      Financial Penalty Returns
                    </option>
                    <option value="Inventory Return">Inventory Return</option>
                    <option value="QRR Scorecard Adjustment">
                      QRR Scorecard Adjustment
                    </option>
                  </select>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                  <p className="w-[25%]">Claim Date</p>
                  <input
                    type="date"
                    name="claimDate"
                    value={entry.claimDate}
                    onChange={(e) => handleClaimChange(index, e)}
                    className="border p-2 focus:outline-0 w-full md:w-[75%]"
                  />
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                  <p className="w-[25%]">Case Number</p>
                  <input
                    type="text"
                    name="caseNumber"
                    value={entry.caseNumber}
                    onChange={(e) => handleClaimChange(index, e)}
                    className="border p-2 focus:outline-0 w-full md:w-[75%]"
                    placeholder="Case Number"
                  />
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                  <p className="w-[25%]">Claim Status</p>
                  <select
                    name="claimStatus"
                    value={entry.claimStatus}
                    onChange={(e) => handleClaimChange(index, e)}
                    className="p-2 focus:outline-slate-200 border rounded w-full md:w-[75%]"
                  >
                    <option value="">--select status--</option>
                    <option value="Approved">Approved</option>
                    <option value="Reject">Reject</option>
                  </select>
                </div>
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                  <p className="w-[25%]">A/R Mail Date</p>
                  <input
                    title={"A/R Mail Date"}
                    type={"date"}
                    name="arMailDate"
                    value={entry.arMailDate}
                    className="border p-2 focus:outline-0 w-full md:w-[75%]"
                    onChange={(e) => handleClaimChange(index, e)}
                  />
                  {/* Show delete button only for the last entry */}
                </div>

                {entry.claimName !== "Score Card" && (
                  <>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                      <p className="w-[25%]">Paid Amount</p>
                      <input
                        type="text"
                        name="paidAmount"
                        value={entry.paidAmount}
                        onChange={(e) => handleClaimChange(index, e)}
                        className="border p-2 focus:outline-0 w-full md:w-[75%]"
                        placeholder="Paid Amount"
                      />
                    </div>

                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                      <p className="w-[25%]">Invoice Cycle</p>
                      <input
                        type="text"
                        name="invoiceCycle"
                        value={entry.invoiceCycle}
                        onChange={(e) => handleClaimChange(index, e)}
                        className="border p-2 focus:outline-0 w-full md:w-[75%]"
                        placeholder="Invoice cycle"
                      />
                    </div>
                  </>
                )}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                  <p className="w-[25%]">Claim Details</p>
                  <div className="flex items-center w-full md:w-[75%]">
                    <input
                      type="text"
                      name="claimDetails"
                      value={entry.claimDetails}
                      onChange={(e) => handleClaimChange(index, e)}
                      className="border p-2 focus:outline-0 
                                w-[90%]"
                      placeholder="Claim Details"
                    />
                    {index === lastIndex && (
                      <button
                        type="button"
                        onClick={() => deleteClaimEntry(index)}
                        className="bg-red-500 text-white p-1 rounded ml-2"
                      >
                        <RiDeleteBin6Line />
                      </button>
                    )}
                  </div>
                </div>

                {index !== lastIndex && <div className="bg-teal-500 h-[1px]" />}
              </div>
            );
          })}

          <button
            type="button"
            onClick={addClaimEntry}
            className="bg-teal-500 w-[100px] text-white rounded p-2 mt-3"
          >
            Add More
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ClaimSection;
