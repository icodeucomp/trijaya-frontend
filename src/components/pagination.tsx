"use client";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { PaginationProps } from "@/types";

export const Pagination = ({ setPage, page, totalPage }: PaginationProps) => {
  const maxVisiblePages = 5;

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPage));
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const half = Math.floor(maxVisiblePages / 2);

    pages.push(1);

    if (page > half + 2) {
      pages.push("...");
    }

    const start = Math.max(2, page - half);
    const end = Math.min(totalPage - 1, page + half);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (page + half < totalPage - 1) {
      pages.push("...");
    }

    // Add last page
    if (totalPage > 1) {
      pages.push(totalPage);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-8 mb-3">
      {/* Previous button */}
      <button
        className={`p-2 border rounded-lg bg-light border-primary ${page === 1 ? "border-gray" : "border-primary"}`}
        type="button"
        onClick={handlePreviousPage}
        disabled={page === 1}
      >
        <FaArrowLeft size={20} className={`${page === 1 ? "fill-gray" : "fill-secondary"}`} />
      </button>

      {/* Pagination with ellipses */}
      {getPageNumbers().map((numberPage, index) =>
        typeof numberPage === "number" ? (
          <button
            key={index}
            type="button"
            onClick={() => setPage(numberPage)}
            className={`pagination-number ${numberPage === page ? "bg-primary text-light" : "bg-light text-dark-blue"}`}
          >
            {numberPage}
          </button>
        ) : (
          <span key={index} className="p-1.5 text-3xl">
            {numberPage}
          </span>
        )
      )}

      {/* Next button */}
      <button
        className={`p-2 border rounded-lg bg-light border-primary ${page === totalPage ? "border-gray" : "border-primary"}`}
        type="button"
        onClick={handleNextPage}
        disabled={page === totalPage}
      >
        <FaArrowRight size={20} className={`${page === totalPage ? "fill-gray" : "fill-secondary"}`} />
      </button>
    </div>
  );
};
