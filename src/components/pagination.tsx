import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { PaginationProps } from "@/types";

export const Pagination = ({ title, children, page, setPage, splitData, loading, isBold, className }: PaginationProps) => {
  const handleNextPage = () => {
    setPage((prevPage) => (parseInt(prevPage) + 1).toString());
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => (parseInt(prevPage) > 1 ? (parseInt(prevPage) - 1).toString() : prevPage));
  };
  return (
    <div className={`relative w-full ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className={`${isBold ? "heading" : "font-medium text-xl sm:text-2xl md:text-3xl text-primary"}`}>{title}</h3>
        <div className="relative flex items-center gap-4">
          <div className="flex gap-2 text-sm font-medium w-max">
            <button
              className={`p-2 md:p-3 border rounded-lg bg-light ${page === "1" ? "border-gray" : "border-primary"}`}
              disabled={page === "1"}
              type="button"
              onClick={handlePreviousPage}
            >
              <FaArrowLeft size={20} className={`${page === "1" ? "fill-gray" : "fill-secondary "}`} />
            </button>
            <button
              className={`p-2 md:p-3 border rounded-lg bg-light ${splitData === Number(page) ? "border-gray" : "border-primary"}`}
              disabled={splitData === Number(page)}
              type="button"
              onClick={handleNextPage}
            >
              <FaArrowRight size={20} className={`${splitData === Number(page) ? "fill-gray" : "fill-secondary "}`} />
            </button>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="w-full py-16 flex justify-center">
          <span className="loader"></span>
        </div>
      ) : (
        children
      )}
    </div>
  );
};
