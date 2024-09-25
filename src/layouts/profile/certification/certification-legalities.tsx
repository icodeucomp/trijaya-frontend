"use client";

import { useState } from "react";

import { SwiperClass } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { Container, Img } from "@/components";
import { SearchFilter } from "./search-filter";
import { Pagination } from "./pagination";
import { CustomSlider } from "./custom-slider";

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

  return (
    <Container className="py-10 space-y-8 sm:py-16 md:py-20">
      <h2 className="text-center heading">Company Legalities and Certifications</h2>
      <div className="hidden lg:block">
        <SearchFilter />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="relative order-2 w-full lg:order-1">
          <div className="block lg:hidden">
            <SearchFilter />
          </div>
          <CustomSlider
            data={dataTemp}
            controlledSwiper={controlledSwiper}
            handleSlideChange={handleSlideChange}
            setControlledSwiper={setControlledSwiper}
            selected={selected}
            setSelected={setSelected}
          />
          <Pagination
            isBeginning={isBeginning}
            isEnd={isEnd}
            dataLength={Math.ceil(dataTemp.length / 3)}
            activeIndex={activeIndex}
            handleClickNext={handleClickNext}
            handleClickPrev={handleClickPrev}
          />
        </div>
        <div className="order-1 w-full space-y-4 text-center lg:order-2">
          <Img src={filterData?.pathImg as string} alt={filterData?.title as string} className="mx-auto w-72 sm:w-80 lg:w-96 aspect-square" cover />
          <div className="space-y-2">
            <h5 className="text-lg font-semibold sm:text-xl md:text-3xl text-primary group-hover:text-light">{filterData?.title}</h5>
            <p className="text-sm sm:text-base md:text-lg text-gray group-hover:text-light">{filterData?.description}</p>
            <p className="text-xs font-semibold sm:text-sm md:text-base text-gray group-hover:text-light">{filterData?.date}</p>
          </div>
        </div>
      </div>
    </Container>
  );
};
