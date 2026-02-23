import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Filters from "../../components/Filters/Filters";
import OrderModal from "../../components/OrderModal";
import Pagination from "../../components/Pagination";
import OrderTable from "../../components/table/OrderTable";
import { bulk_history } from "../../features/bulkAction/historySlice";
import { clearSelectedOrders } from "../../features/collectOrder/collectOrderSlice";
import { get_status_number } from "../../features/filter/filterSlice";
import { get_all_order } from "../../features/order/orderSlice";
import showOrderItems from "../../util/showOrderItems";

const AllOrders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.order);
  const { orderStatus, claim, settled, dateFilter } = useSelector(
    (state) => state.dropdown
  );
  const { selectedOrders } = useSelector((state) => state.selectedOrder);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [showItem, setShowItem] = useState(5);
  const [orderNumber, setOrderNumber] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleteConfirmError, setDeleteConfirmError] = useState("");

  const dateType = Object.values(dateFilter)[0];
  const startDate = Object.values(dateFilter)[1];
  const endDate = Object.values(dateFilter)[2];

  const runBulkAction = async () => {
    const normalizedStatus = status.toUpperCase();
    const order = selectedOrders.map((orderNumber) => ({
      orderNumber: orderNumber.trim(),
      orderStatus: normalizedStatus,
    }));

    try {
      await dispatch(bulk_history(order)).unwrap();
      dispatch(clearSelectedOrders());
      setShowDeleteModal(false);
      setDeleteConfirmText("");
      setDeleteConfirmError("");
      dispatch(
        get_all_order({
          force: true,
          perPage,
          pageNo: currentPage,
          orderNumber,
          orderStatus,
          claim,
          settled,
          [dateType]: { startDate, endDate },
        })
      );
      dispatch(get_status_number({ force: true }));
    } catch (error) {
      // Handle any errors (e.g., show an error toast)
      console.error("Error in bulk action:", error);
    }
  };

  // Handle Bulk Action
  const handleBulkAction = async (e) => {
    e.preventDefault();

    if (status.toUpperCase() === "DELETE") {
      setShowDeleteModal(true);
      setDeleteConfirmText("");
      setDeleteConfirmError("");
      return;
    }

    await runBulkAction();
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirmText.trim().toLowerCase() !== "delete") {
      setDeleteConfirmError("Please type 'delete' to continue.");
      return;
    }

    await runBulkAction();
  };

  // Fetch orders when dependencies change
  useEffect(() => {
    const filterPayload = {
      perPage,
      pageNo: currentPage,
      orderNumber,
      orderStatus,
      claim,
      settled,
      [dateType]: {
        startDate,
        endDate,
      },
    };

    dispatch(get_all_order(filterPayload));
  }, [
    claim,
    currentPage,
    dateType,
    dispatch,
    endDate,
    orderNumber,
    orderStatus,
    perPage,
    settled,
    startDate,
  ]);

  // Handle modal opening and setting selected order
  const handleModal = (orderNumber) => {
    const order = orders.orders.find(
      (order) => order.orderNumber === orderNumber
    );
    setSelectedOrder(order);
    setIsOpen(!isOpen);
  };

  return (
    <div className="rounded-md lg:w-[90%] mx-auto p-2">
      {/* Order Modal */}
      {selectedOrder && (
        <OrderModal
          isOpen={isOpen}
          onClose={handleModal}
          order={selectedOrder}
        />
      )}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-[120] flex items-center justify-center p-3">
          <div className="bg-white w-full max-w-md rounded-md p-4">
            <h3 className="text-lg font-semibold text-red-600">Confirm Delete</h3>
            <p className="text-sm mt-2 text-gray-700">
              To delete selected orders, type <span className="font-semibold">delete</span> and continue.
            </p>
            <input
              type="text"
              value={deleteConfirmText}
              onChange={(e) => {
                setDeleteConfirmText(e.target.value);
                if (deleteConfirmError) setDeleteConfirmError("");
              }}
              className="mt-3 w-full border rounded p-2 focus:outline-gray-300"
              placeholder="Type delete"
            />
            {deleteConfirmError && (
              <p className="text-red-500 text-sm mt-2">{deleteConfirmError}</p>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowDeleteModal(false);
                  setDeleteConfirmText("");
                  setDeleteConfirmError("");
                }}
                className="px-3 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className="px-3 py-2 rounded bg-red-600 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Orders Table and Filters */}
      <div className="relative overflow-x-auto bg-white p-2 border rounded border-gray-200">
        <h2 className="bg-teal-100 text-teal-700 text-3xl text-center p-2 font-semibold">
          Total Orders ( {showOrderItems(orders.totalItem)} )
        </h2>

        {/* Filters Component */}
        <div className="bg-white rounded-md shadow-sm py-2 px-2">
          <Filters
            orderNumber={orderNumber}
            setOrderNumber={setOrderNumber}
            setCurrentPage={setCurrentPage}
            setStatus={setStatus}
            status={status}
            handleBulkAction={handleBulkAction}
          />
        </div>

        {/* Orders Table */}
        <div className="p-2 bg-white rounded-md shadow-sm mt-4 relative overflow-x-auto">
          <OrderTable
            orderNumber={orderNumber}
            orders={orders?.orders || []}
            isLoading={isLoading}
            openModal={handleModal}
            selectedOrder={selectedOrder}
          />
        </div>

        {/* Pagination */}
        {orders?.totalItem > perPage && (
          <div className="mt-3 flex justify-end mx-3">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={orders?.totalItem}
              perPage={perPage}
              showItem={showItem}
              setShowItem={setShowItem}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
