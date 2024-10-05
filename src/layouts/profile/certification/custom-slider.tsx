"use client";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";

import { DisplayThumbnail } from "@/components";

import { AiOutlineDownload, AiOutlineEye } from "react-icons/ai";

import { DocumentsTypes } from "@/types";

import { baseUrlApi, convertDate } from "@/utils";

interface CustomSliderProps {
  controlledSwiper: SwiperClass | null;
  setControlledSwiper: (controlledSwiper: SwiperClass) => void;
  handleSlideChange: (swiper: SwiperType) => void;
  setSelected: (selected: string) => void;
  selected: string;
  splitData: number;
  data?: DocumentsTypes[];
}

export const CustomSlider = ({
  controlledSwiper,
  setControlledSwiper,
  handleSlideChange,
  selected,
  setSelected,
  data,
  splitData,
}: CustomSliderProps) => {
  return (
    <Swiper
      modules={[Controller]}
      controller={{ control: controlledSwiper }}
      onSwiper={setControlledSwiper}
      onSlideChange={handleSlideChange}
      spaceBetween={20}
      slidesPerView={1}
    >
      {Array.from({ length: splitData }, (_, i) => (
        <SwiperSlide key={i}>
          <div className="relative px-2 py-4 space-y-4 sm:space-y-8 xl:pr-14">
            {data?.slice(i * 3, i * 3 + 3).map((item, j) => (
              <div key={j} className={`card-certification group ${selected === item.slug && "bg-primary"}`} onClick={() => setSelected(item.slug)}>
                <div className="preview-thumbnail">
                  <DisplayThumbnail
                    fileUrl={
                      item.url ||
                      "https://icodeu-storage.s3.ap-southeast-1.amazonaws.com/documents/award/surat-pernyataan-ambil-sertifikat-toeflmuhammad-helmy-fadlail-albab-1728069726585.pdf"
                    }
                  />
                </div>
                <div className="space-y-2">
                  <h5 className={`text-sm sm:text-base md:text-lg font-semibold ${selected === item.slug ? "text-light" : "text-primary"}`}>
                    {item.name}
                  </h5>
                  <p className={`text-xs sm:text-sm line-clamp-3 ${selected === item.slug ? "text-light" : "text-gray"}`}>{item.category}</p>
                  <p className={`text-xxs sm:text-xs font-semibold ${selected === item.slug ? "text-light" : "text-gray"}`}>
                    {convertDate(item.uploadedAt)}
                  </p>
                </div>
                <div className="absolute flex items-center gap-4 right-6 bottom-5 sm:bottom-3">
                  <a href={item.url} target="_blank" rel="noopener">
                    <AiOutlineEye className={`size-5 sm:size-6 ${selected === item.slug ? "fill-light" : "fill-primary"}`} />
                  </a>
                  <a href={`${baseUrlApi}/download?url=${item.url}`} download={item.name}>
                    <AiOutlineDownload className={`size-5 sm:size-6 ${selected === item.slug ? "fill-light" : "fill-primary"}`} />
                  </a>
                </div>
                <div className={`triangle hidden xl:block ${selected === item.slug ? "border-l-primary " : "border-l-transparent"}`}></div>
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
