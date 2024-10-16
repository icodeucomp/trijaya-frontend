"use client";

import { useState } from "react";

import { Link } from "@/i18n/routing";

import { Swiper, SwiperSlide, SwiperClass } from "swiper/react";
import { Controller } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";

import { useTranslations } from "next-intl";

import { Button } from "./button";
import { Motion } from "./motion";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { BigSliderProps } from "@/types";

export const BigSlider = ({ title, children, loadData, isButton, linkButton, className, ...props }: BigSliderProps) => {
  const t = useTranslations();

  const [isBeginning, setIsBeginning] = useState<boolean>(false);
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
        <Motion tag="h3" initialX={-50} animateX={0} duration={0.4} className="heading">
          {title}
        </Motion>
        <Motion tag="div" initialX={50} animateX={0} duration={0.8} delay={0.4} className="relative flex items-center gap-4">
          {isButton && (
            <Link href={linkButton as string}>
              <Button className="btn-outline">{t("learn-more")}</Button>
            </Link>
          )}
          <div className="flex gap-2 text-sm font-medium w-max">
            <button
              className={`p-2 md:p-3 border rounded-lg bg-light duration-300 group ${
                isBeginning ? "border-gray" : "border-primary hover:bg-primary"
              }`}
              disabled={isBeginning}
              type="button"
              onClick={handleClickPrev}
            >
              <FaArrowLeft size={20} className={`duration-300 ${isBeginning ? "fill-gray" : "fill-secondary group-hover:fill-light"}`} />
            </button>
            <button
              className={`p-2 md:p-3 border rounded-lg bg-light duration-300 group ${isEnd ? "border-gray" : "border-primary hover:bg-primary"}`}
              disabled={isEnd}
              type="button"
              onClick={handleClickNext}
            >
              <FaArrowRight size={20} className={`duration-300 ${isEnd ? "fill-gray" : "fill-secondary group-hover:fill-light"}`} />
            </button>
          </div>
        </Motion>
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
            children
          )}
        </Swiper>
      )}
    </div>
  );
};
