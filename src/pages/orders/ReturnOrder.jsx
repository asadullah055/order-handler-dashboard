import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderModal from "../../components/OrderModal";
import Pagination from "../../components/Pagination";
import OrderTable from "../../components/table/OrderTable";
import { get_return_order } from "../../features/order/orderSlice";

const ReturnOrder = () => {
  const { returnOrder, isLoading } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [showItem, setShowItem] = useState(5);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = (orderNumber) => {
    const order = returnOrder.returnOrders.find(
      (order) => order.orderNumber === orderNumber
    );
    setSelectedOrder(order);
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    dispatch(
      get_return_order({
        perPage,
        pageNo: currentPage,
      })
    );
  }, [perPage, currentPage]);
  return (
    <div className="rounded-md lg:w-[90%] mx-auto p-2">
      <OrderModal isOpen={isOpen} onClose={handleModal} order={selectedOrder} />
      <div className="relative overflow-x-auto bg-white p-2 border rounded border-gray-200">
        <h1 className="text-teal-500 text-2xl font-semibold text-center">
          Return Orders ({returnOrder?.totalReturnItem})
        </h1>
        <div className="p-2 bg-white rounded-md shadow-sm mt-1 relative overflow-x-auto ">
          <OrderTable
            orders={returnOrder.returnOrders}
            isLoading={isLoading}
            openModal={handleModal}
          />
        </div>
        {returnOrder?.totalReturnItem > perPage && (
          <div className="mt-3 flex justify-end mx-3">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={returnOrder?.totalReturnItem}
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

export default ReturnOrder;
