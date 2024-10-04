import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

interface PaginationProps {
  isBeginning: boolean;
  isEnd: boolean;
  dataLength: number;
  activeIndex: number;
  handleClickNext: () => void;
  handleClickPrev: () => void;
}

export const Pagination = ({ isBeginning, isEnd, dataLength, activeIndex, handleClickNext, handleClickPrev }: PaginationProps) => {
  return (
    <div className="flex items-center justify-center w-full gap-4 mt-8 text-sm font-medium">
      <button
        className={`p-2 md:p-3 border rounded-lg bg-light ${isBeginning ? "border-gray" : "border-primary"}`}
        type="button"
        onClick={handleClickPrev}
      >
        <FaArrowLeft size={20} className={`${isBeginning ? "fill-gray" : "fill-secondary "}`} />
      </button>
      <div className="flex gap-4">
        {Array.from({ length: dataLength }, (_, index) => (
          <button
            key={index}
            className={`size-10 sm:size-12 border rounded-lg cursor-auto border-gray ${
              activeIndex === index ? "bg-primary text-light" : "text-dark-gray"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
      <button className={`p-2 md:p-3 border rounded-lg bg-light ${isEnd ? "border-gray" : "border-primary"}`} type="button" onClick={handleClickNext}>
        <FaArrowRight size={20} className={`${isEnd ? "fill-gray" : "fill-secondary "}`} />
      </button>
    </div>
  );
};
