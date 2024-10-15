"use client";

import { useState } from "react";

import { Link } from "@/i18n/routing";

import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Controller } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";

import { Button } from "./button";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { SmallSliderProps } from "@/types";
import { usePathname } from "next/navigation";

export const SmallSlider = ({ title, children, loadData, isButton, linkButton, setIndex, className, ...props }: SmallSliderProps) => {
  const pathname = usePathname();

  const renderText = pathname.startsWith("/en")
    ? "Learn More"
    : pathname.startsWith("/cn")
    ? "了解更多"
    : pathname.startsWith("/id")
    ? "Pelajari Lebih Lanjut"
    : "Learn More";

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(null);
  const totalPage = Array.isArray(children) && children.length;

  const handleClickPrev = () => controlledSwiper?.slidePrev();
  const handleClickNext = () => controlledSwiper?.slideNext();

  const handleSlideChange = (swiper: SwiperType) => {
    setCurrentPage(swiper.activeIndex + 1);
    setIndex?.(swiper.activeIndex);
  };

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium sm:text-2xl md:text-3xl text-primary">{title}</h3>
        <div className="relative flex items-center gap-4">
          {isButton && (
            <Link href={linkButton as string}>
              <Button className="btn-outline">{renderText}</Button>
            </Link>
          )}
          <div className="flex gap-2 text-sm font-medium w-max">
            <button
              className={`p-2 md:p-3 border rounded-lg bg-light ${currentPage === 1 ? "border-gray" : "border-primary"}`}
              disabled={currentPage === 1}
              type="button"
              onClick={handleClickPrev}
            >
              <FaArrowLeft size={20} className={`${currentPage === 1 ? "fill-gray" : "fill-secondary "}`} />
            </button>
            <button
              className={`p-2 md:p-3 border rounded-lg bg-light ${currentPage === totalPage ? "border-gray" : "border-primary"}`}
              disabled={currentPage === totalPage}
              type="button"
              onClick={handleClickNext}
            >
              <FaArrowRight size={20} className={`${currentPage === totalPage ? "fill-gray" : "fill-secondary "}`} />
            </button>
          </div>
        </div>
      </div>
      {loadData ? (
        <div className="flex justify-center w-full py-16">
          <span className="loader"></span>
        </div>
      ) : (
        <Swiper
          modules={[Controller]}
          controller={{ control: controlledSwiper }}
          onSlideChange={handleSlideChange}
          onSwiper={setControlledSwiper}
          spaceBetween={10}
          {...props}
        >
          {Array.isArray(children) ? (
            <>
              {children?.map((child, index) => (
                <SwiperSlide key={index}>{child}</SwiperSlide>
              ))}
            </>
          ) : (
            <SwiperSlide>{children}</SwiperSlide>
          )}
        </Swiper>
      )}
    </div>
  );
};
