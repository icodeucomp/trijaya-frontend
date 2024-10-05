"use client";

import { useState } from "react";

import { Link } from "@/i18n/routing";

import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Controller } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";

import { Button } from "./button";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { SmallSliderProps } from "@/types";

export const SmallSlider = ({ title, children, loadData, isButton, linkButton, setIndex, className, ...props }: SmallSliderProps) => {
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(null);

  const handleClickPrev = () => controlledSwiper?.slidePrev();
  const handleClickNext = () => controlledSwiper?.slideNext();

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
    setIndex(swiper.activeIndex);
  };

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-xl sm:text-2xl md:text-3xl text-primary">{title}</h3>
        <div className="relative flex items-center gap-4">
          {isButton && (
            <Link href={linkButton as string}>
              <Button className="btn-outline">Learn More</Button>
            </Link>
          )}
          <div className="flex gap-2 text-sm font-medium w-max">
            <button
              className={`p-2 md:p-3 border rounded-lg bg-light ${isBeginning ? "border-gray" : "border-primary"}`}
              disabled={isBeginning}
              type="button"
              onClick={handleClickPrev}
            >
              <FaArrowLeft size={20} className={`${isBeginning ? "fill-gray" : "fill-secondary "}`} />
            </button>
            <button
              className={`p-2 md:p-3 border rounded-lg bg-light ${isEnd ? "border-gray" : "border-primary"}`}
              disabled={isEnd}
              type="button"
              onClick={handleClickNext}
            >
              <FaArrowRight size={20} className={`${isEnd ? "fill-gray" : "fill-secondary "}`} />
            </button>
          </div>
        </div>
      </div>
      {loadData ? (
        <div className="w-full py-16 flex justify-center">
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
