import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Filters from "../../components/Filters/Filters";
import OrderModal from "../../components/OrderModal";
import Pagination from "../../components/Pagination";
import OrderTable from "../../components/table/OrderTable";
import { get_status_number } from "../../features/filter/filterSlice";
import { get_all_order } from "../../features/order/orderSlice";
import showOrderItems from "../../util/showOrderItems";

const AllOrders = () => {
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.order);
  const { orderStatus, claim, settled, dateFilter } = useSelector(
    (state) => state.dropdown
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [showItem, setShowItem] = useState(5);
  const [orderNumber, setOrderNumber] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const dateType = Object.values(dateFilter)[0];
  const startDate = Object.values(dateFilter)[1];
  const endDate = Object.values(dateFilter)[2];

  // Fetch orders and status numbers when dependencies change
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
    dispatch(get_status_number());
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

      {/* Orders Table and Filters */}
      <div className="relative overflow-x-auto bg-white p-2 border rounded border-gray-200">
        <h2 className="bg-teal-100 text-teal-700 text-3xl text-center p-2 font-semibold">
          Total Orders ( {showOrderItems(orders.totalItem)} )
        </h2>

        {/* Filters Component */}
        <div className="bg-white rounded-md shadow-sm py-4 px-2">
          <Filters
            orderNumber={orderNumber}
            setOrderNumber={setOrderNumber}
            setCurrentPage={setCurrentPage}
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
