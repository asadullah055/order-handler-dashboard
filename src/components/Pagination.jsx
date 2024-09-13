import React, { useEffect } from "react";
import { BsChevronDoubleLeft, BsChevronDoubleRight } from "react-icons/bs";

const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItem,
  perPage,
  showItem,
  setShowItem,
}) => {
  let totalPage = Math.ceil(totalItem / perPage);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setShowItem(3);
      } else {
        setShowItem(5);
      }
    };

    // Initial check
    handleResize();

    // Add event listener for resizing
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setShowItem]);

  const createBtn = () => {
    const btns = [];

    // Add the first page always
    btns.push(
      <li
        key={1}
        onClick={() => setPageNumber(1)}
        className={`${
          pageNumber === 1
            ? "bg-teal-500 shadow-lg text-white"
            : "bg-teal-100 text-teal-500"
        } w-[28px] h-[28px] lg:w-[33px] lg:h-[33px] rounded-full flex justify-center items-center cursor-pointer`}
      >
        1
      </li>
    );

    // Generate pages around the current page number
    let startPage = Math.max(2, pageNumber - Math.floor(showItem / 2));
    let endPage = Math.min(
      totalPage - 1,
      pageNumber + Math.floor(showItem / 2)
    );

    // Ensure there's a gap before the last page
    if (endPage < totalPage - 1) {
      endPage = Math.min(startPage + showItem - 1, totalPage - 2);
    }

    // Create the middle buttons
    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <li
          key={i}
          onClick={() => setPageNumber(i)}
          className={`${
            pageNumber === i
              ? "bg-teal-500 shadow-lg text-white"
              : "bg-teal-100 text-teal-500"
          } w-[28px] h-[28px] lg:w-[33px] lg:h-[33px] rounded-full flex justify-center items-center cursor-pointer`}
        >
          {i}
        </li>
      );
    }

    // Show ellipsis if there's a gap before the last page
    if (endPage < totalPage - 1) {
      btns.push(
        <li key="ellipsis-end" className="text-[#d0d2d6]">
          ...
        </li>
      );
    }

    // Always show the last page
    if (totalPage > 1) {
      btns.push(
        <li
          key={totalPage}
          onClick={() => setPageNumber(totalPage)}
          className={`${
            pageNumber === totalPage
              ? "bg-teal-500 shadow-lg text-white"
              : "bg-teal-100 text-teal-500"
          } w-[28px] h-[28px] lg:w-[33px] lg:h-[33px] rounded-full flex justify-center items-center cursor-pointer`}
        >
          {totalPage}
        </li>
      );
    }

    return btns;
  };

  return (
    <ul className="flex flex-wrap gap-2 lg:gap-3 justify-center">
      {pageNumber > 1 && (
        <li
          onClick={() => setPageNumber(pageNumber - 1)}
          className="w-[28px] h-[28px] lg:w-[33px] lg:h-[33px] rounded-full flex justify-center items-center bg-teal-500 text-white cursor-pointer"
        >
          <BsChevronDoubleLeft />
        </li>
      )}
      {createBtn()}
      {pageNumber < totalPage && (
        <li
          onClick={() => setPageNumber(pageNumber + 1)}
          className="w-[28px] h-[28px] lg:w-[33px] lg:h-[33px] rounded-full flex justify-center items-center bg-teal-500 text-white cursor-pointer"
        >
          <BsChevronDoubleRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
