"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { PaginationProps } from "@/types";

export const Pagination = ({ setPage, page, totalPage }: PaginationProps) => {
  const maxVisiblePages = 3;

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const getPageNumbers = () => {
    const pageNumbers: number[] = [];

    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPage, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-3">
      <button
        className={`p-2 border rounded-lg bg-light border-primary ${page === 1 ? "border-gray" : "border-primary"}`}
        type="button"
        onClick={handlePreviousPage}
        disabled={page === 1}
      >
        <FaArrowLeft size={20} className={`${page === 1 ? "fill-gray" : "fill-secondary "}`} />
      </button>

      {page - 1 > Math.floor(maxVisiblePages / 2) && (
        <>
          <button onClick={() => setPage(1)} className={`pagination-number ${1 === page ? "bg-primary text-light" : "bg-light text-dark-blue"}`}>
            1
          </button>
          <span className="p-1.5 text-3xl">...</span>
        </>
      )}

      {getPageNumbers().map((numberPage) => (
        <button
          key={numberPage}
          type="button"
          onClick={() => setPage(numberPage)}
          className={`pagination-number ${numberPage === page ? "bg-primary text-light" : "bg-light text-dark-blue"}`}
        >
          {numberPage}
        </button>
      ))}

      {page < totalPage - Math.floor(maxVisiblePages / 2) && (
        <>
          <span className="p-1.5 text-3xl">...</span>
          <button
            onClick={() => setPage(totalPage)}
            className={`pagination-number ${totalPage === page ? "bg-primary text-light" : "bg-light text-dark-blue"}`}
          >
            {totalPage}
          </button>
        </>
      )}

      <button
        className={`p-2 border rounded-lg bg-light border-primary ${page === totalPage ? "border-gray" : "border-primary"}`}
        type="button"
        onClick={handleNextPage}
        disabled={page === totalPage}
      >
        <FaArrowRight size={20} className={`${page === totalPage ? "fill-gray" : "fill-secondary "}`} />
      </button>
    </div>
  );
};
