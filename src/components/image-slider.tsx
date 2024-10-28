"use client";

import { useState } from "react";

import { Controller } from "swiper/modules";
import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";

import { Img } from "./image";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { ImageSliderProps } from "@/types";

export const ImageSlider = ({ images, imgClassName, ...props }: ImageSliderProps) => {
  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(null);

  const handleClickPrev = () => controlledSwiper?.slidePrev();
  const handleClickNext = () => controlledSwiper?.slideNext();
  return (
    <div className="relative mx-auto w-72 aspect-square sm:w-80 lg:w-96">
      <Swiper
        modules={[Controller]}
        controller={{ control: controlledSwiper }}
        onSwiper={setControlledSwiper}
        spaceBetween={10}
        loop={true}
        {...props}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <Img src={item || "/temp-article.webp"} alt="image slider" className={`rounded-lg ${imgClassName ?? ""}`} cover />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute flex items-center justify-between w-full px-4 text-sm font-medium -translate-y-1/2 top-1/2 z-1">
        <button
          className="p-2 md:p-3 border rounded-lg bg-light duration-300 group border-primary hover:bg-primary"
          type="button"
          onClick={handleClickPrev}
        >
          <FaArrowLeft size={20} className="duration-300 fill-secondary group-hover:fill-light" />
        </button>
        <button
          className="p-2 md:p-3 border rounded-lg bg-light duration-300 group border-primary hover:bg-primary"
          type="button"
          onClick={handleClickNext}
        >
          <FaArrowRight size={20} className="duration-300 fill-secondary group-hover:fill-light" />
        </button>
      </div>
    </div>
  );
};
