import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Filters from "../../components/Filters/Filters";
import OrderModal from "../../components/OrderModal";
import Pagination from "../../components/Pagination";
import OrderTable from "../../components/table/OrderTable";
import { get_all_order } from "../../features/order/orderSlice";

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(20);
  const [showItem, setShowItem] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderNumber, setOrderNumber] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { orderStatus, claim, claimStatus, settled, dateFilter } = useSelector(
    (state) => state.dropdown
  );

  useEffect(() => {
    const dateType = Object.keys(dateFilter)[0];
    const dateValue = dateFilter[dateType];
    dispatch(
      get_all_order({
        perPage,
        pageNo: currentPage,
        orderNumber,
        orderStatus,
        claim,
        claimStatus,
        settled,
        [dateType]: dateValue,
      })
    );
  }, [
    dispatch,
    perPage,
    currentPage,
    orderNumber,
    orderStatus,
    claim,
    claimStatus,
    settled,
    dateFilter,
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const handleModal = (orderNumber) => {
    const order = orders.orders.find(
      (order) => order.orderNumber === orderNumber
    );
    setSelectedOrder(order);
    setIsOpen(!isOpen);
  };

  return (
    <div className="rounded-md lg:w-[90%] mx-auto p-2">
      <OrderModal isOpen={isOpen} onClose={handleModal} order={selectedOrder} />

      <div className="relative overflow-x-auto bg-white p-2 border rounded border-gray-200">
        <h2 className="bg-teal-100 text-teal-700 text-3xl text-center p-2 font-semibold">
          Total Order ({orders.totalItem})
        </h2>
        <div className="bg-white rounded-md shadow-sm py-4 px-2">
          <Filters
            orderNumber={orderNumber}
            setOrderNumber={setOrderNumber}
            setCurrentPage={setCurrentPage}
          />
        </div>

        <div className="p-2 bg-white rounded-md shadow-sm mt-4 relative overflow-x-auto ">
          <OrderTable
            orders={orders.orders}
            isLoading={isLoading}
            openModal={handleModal}
          />
        </div>

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
