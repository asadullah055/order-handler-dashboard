import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import OrderModal from "../../components/OrderModal";
import Pagination from "../../components/Pagination";
import OrderTable from "../../components/table/OrderTable";
import { get_unsettled_order } from "../../features/order/orderSlice";

const UnSettledOrders = () => {
  const { unsettledOrder, isLoading } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [showItem, setShowItem] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = (orderNumber) => {
    const order = unsettledOrder.unsettledOrders.find(
      (order) => order.orderNumber === orderNumber
    );
    setSelectedOrder(order);
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    dispatch(
      get_unsettled_order({
        perPage,
        pageNo: currentPage,
      })
    );
  }, [perPage, currentPage, dispatch]);
  return (
    <div className="rounded-md lg:w-[90%] mx-auto p-2">
      <OrderModal isOpen={isOpen} onClose={handleModal} order={selectedOrder} />
      <div className="relative overflow-x-auto bg-white p-2 border rounded border-gray-200">
        <h1 className="text-teal-500 text-2xl font-semibold text-center">
          Unsettled Orders ({unsettledOrder?.totalUnsettledItem})
        </h1>
        <div className="p-2 bg-white rounded-md shadow-sm mt-1 relative overflow-x-auto ">
          <OrderTable
            orders={unsettledOrder.unsettledOrders}
            isLoading={isLoading}
            openModal={handleModal}
          />
        </div>
        {unsettledOrder?.totalUnsettledItem > perPage && (
          <div className="mt-3 flex justify-end mx-3">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={unsettledOrder?.totalUnsettledItem}
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

export default UnSettledOrders;
