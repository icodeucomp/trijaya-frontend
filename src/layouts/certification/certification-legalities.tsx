"use client";

import { useState } from "react";

import { Container, Img } from "@/components";
import { SearchFilter } from "./search-filter";

import { Swiper, SwiperClass, SwiperSlide } from "swiper/react";
import { Controller } from "swiper/modules";
import { Swiper as SwiperType } from "swiper/types";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { AiOutlineDownload, AiOutlineEye } from "react-icons/ai";

export const CertificationLegalities = () => {
  const dataTemp = [
    {
      title: "Akte Notaris 1",
      description: "No. 1, Tanggal 04 November Tahun 2015 (Akte Pendirian) No. 7, Tanggal 10 Januari Tahun 2024",
      date: "14 September 2024",
      pathImg: "/temp-image.png",
    },
    {
      title: "Akte Notaris 2",
      description: "No. 1, Tanggal 04 November Tahun 2015 (Akte Pendirian) No. 7, Tanggal 10 Januari Tahun 2024",
      date: "14 September 2024",
      pathImg: "/temp-image.png",
    },
    {
      title: "Akte Notaris 3",
      description: "No. 1, Tanggal 04 November Tahun 2015 (Akte Pendirian) No. 7, Tanggal 10 Januari Tahun 2024",
      date: "14 September 2024",
      pathImg: "/temp-image.png",
    },
    {
      title: "Akte Notaris 4",
      description: "No. 1, Tanggal 04 November Tahun 2015 (Akte Pendirian) No. 7, Tanggal 10 Januari Tahun 2024",
      date: "14 September 2024",
      pathImg: "/temp-image.png",
    },
    {
      title: "Akte Notaris 5",
      description: "No. 1, Tanggal 04 November Tahun 2015 (Akte Pendirian) No. 7, Tanggal 10 Januari Tahun 2024",
      date: "14 September 2024",
      pathImg: "/temp-image.png",
    },
    {
      title: "Akte Notaris 6",
      description: "No. 1, Tanggal 04 November Tahun 2015 (Akte Pendirian) No. 7, Tanggal 10 Januari Tahun 2024",
      date: "14 September 2024",
      pathImg: "/temp-image.png",
    },
    {
      title: "Akte Notaris 7",
      description: "No. 1, Tanggal 04 November Tahun 2015 (Akte Pendirian) No. 7, Tanggal 10 Januari Tahun 2024",
      date: "14 September 2024",
      pathImg: "/temp-image.png",
    },
    {
      title: "Akte Notaris 8",
      description: "No. 1, Tanggal 04 November Tahun 2015 (Akte Pendirian) No. 7, Tanggal 10 Januari Tahun 2024",
      date: "14 September 2024",
      pathImg: "/temp-image.png",
    },
    {
      title: "Akte Notaris 9",
      description: "No. 1, Tanggal 04 November Tahun 2015 (Akte Pendirian) No. 7, Tanggal 10 Januari Tahun 2024",
      date: "14 September 2024",
      pathImg: "/temp-image.png",
    },
    {
      title: "Akte Notaris 10",
      description: "No. 1, Tanggal 04 November Tahun 2015 (Akte Pendirian) No. 7, Tanggal 10 Januari Tahun 2024",
      date: "14 September 2024",
      pathImg: "/temp-image.png",
    },
  ];

  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selected, setSelected] = useState<string>("Akte Notaris 1");

  const handleClickPrev = () => controlledSwiper?.slidePrev();
  const handleClickNext = () => controlledSwiper?.slideNext();

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(controlledSwiper?.activeIndex || 0);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const filterData = dataTemp.find((item) => item.title === selected);

  const splitDataToThree = Math.ceil(dataTemp.length / 3);

  return (
    <Container className="py-24 space-y-8">
      <h2 className="text-4xl font-semibold text-center text-primary">Company Legalities and Certifications</h2>
      <SearchFilter />
      <div className="flex justify-between gap-8">
        <div className="relative w-full max-w-2xl">
          <Swiper
            modules={[Controller]}
            controller={{ control: controlledSwiper }}
            onSwiper={setControlledSwiper}
            onSlideChange={handleSlideChange}
            spaceBetween={30}
            slidesPerView={1}
          >
            {Array.from({ length: splitDataToThree }, (_, i) => (
              <SwiperSlide key={i}>
                <div className="relative py-4 pl-2 pr-16 space-y-8">
                  {dataTemp.slice(i * 3, i * 3 + 3).map((item, j) => (
                    <div
                      key={j}
                      className={`card-certification group ${selected === item.title && "bg-primary"}`}
                      onClick={() => setSelected(item.title)}
                    >
                      <Img src={item.pathImg} alt={item.title} className="w-40 aspect-square" cover />
                      <div className="space-y-2">
                        <h5 className={`text-lg font-semibold ${selected === item.title ? "text-light" : "text-primary"}`}>{item.title}</h5>
                        <p className={`text-sm ${selected === item.title ? "text-light" : "text-gray"}`}>{item.description}</p>
                        <p className={`text-xs font-semibold ${selected === item.title ? "text-light" : "text-gray"}`}>{item.date}</p>
                      </div>
                      <div className="absolute flex items-center gap-4 right-8 bottom-4">
                        <p>
                          <AiOutlineEye className={`${selected === item.title ? "fill-light" : "fill-primary"}`} size={24} />
                        </p>
                        <p>
                          <AiOutlineDownload className={`${selected === item.title ? "fill-light" : "fill-primary"}`} size={24} />
                        </p>
                      </div>
                      <div className={`triangle ${selected === item.title ? "border-l-primary " : "border-l-transparent"}`}></div>
                    </div>
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex items-center justify-center w-full gap-4 mt-8 text-sm font-medium">
            <button
              className={`p-3 border rounded-lg bg-light ${isBeginning ? "border-gray" : "border-primary"}`}
              type="button"
              onClick={handleClickPrev}
            >
              <FaArrowLeft size={20} className={`${isBeginning ? "fill-gray" : "fill-secondary "}`} />
            </button>
            <div className="flex gap-4">
              {Array.from({ length: splitDataToThree }, (_, index) => (
                <button
                  key={index}
                  className={`size-12 border rounded-lg border-gray ${activeIndex === index ? "bg-primary text-light" : "text-dark-gray"}`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
            <button className={`p-3 border rounded-lg bg-light ${isEnd ? "border-gray" : "border-primary"}`} type="button" onClick={handleClickNext}>
              <FaArrowRight size={20} className={`${isEnd ? "fill-gray" : "fill-secondary "}`} />
            </button>
          </div>
        </div>
        <div className="w-full max-w-lg">
          <div className="space-y-4 text-center">
            <Img src={filterData?.pathImg as string} alt={filterData?.title as string} className="mx-auto w-96 aspect-square" cover />
            <div className="space-y-2">
              <h5 className="text-3xl font-semibold text-primary group-hover:text-light">{filterData?.title}</h5>
              <p className="text-lg text-gray group-hover:text-light">{filterData?.description}</p>
              <p className="font-semibold text-gray group-hover:text-light">{filterData?.date}</p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};
