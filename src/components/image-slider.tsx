"use client";

import { useState } from "react";

import { Controller } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { Img } from "./image";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { ImageSliderProps } from "@/types";

export const ImageSlider = ({ images, imgClassName, ...props }: ImageSliderProps) => {
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
    <div className="relative">
      <Swiper
        modules={[Controller]}
        controller={{ control: controlledSwiper }}
        onSlideChange={handleSlideChange}
        onSwiper={setControlledSwiper}
        spaceBetween={10}
        {...props}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <Img src={item || "/temp-article.webp"} alt="image slider" className={`overflow-hidden rounded-lg ${imgClassName}`} cover />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute flex items-center justify-between w-full px-4 text-sm font-medium -translate-y-1/2 top-1/2 z-1">
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
  );
};
