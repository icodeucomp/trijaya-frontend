"use client";

import { useState } from "react";

import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Controller } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";

import { Dropdown } from "./dropdown";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { SliderProps } from "@/types";
import { Link } from "@/i18n/routing";
import { Button } from "./button";

export const Slider = ({ title, children, isFilter, isBold, isButton, linkButton, className, ...props }: SliderProps) => {
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(null);

  const handleClickPrev = () => controlledSwiper?.slidePrev();
  const handleClickNext = () => controlledSwiper?.slideNext();

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  return (
    <div className={`relative w-full ${className ?? ""}`}>
      <div className="flex items-center justify-between">
        <h3 className={`${isBold ? "heading" : "font-medium text-xl sm:text-2xl md:text-3xl text-primary"}`}>{title}</h3>
        <div className="relative flex items-center gap-4">
          {isFilter && <Dropdown parentClassName="w-60" className="top-16" />}
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

      <Swiper
        modules={[Controller]}
        controller={{ control: controlledSwiper }}
        onSlideChange={handleSlideChange}
        onSwiper={setControlledSwiper}
        spaceBetween={10}
        {...props}
      >
        {children?.map((child, index) => (
          <SwiperSlide key={index}>{child}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
