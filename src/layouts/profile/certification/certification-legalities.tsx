"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useGetSearchApi } from "@/hooks";
import { useDebounce } from "use-debounce";

import { SwiperClass } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { Container, Img } from "@/components";
import { SearchFilter } from "./search-filter";
import { Pagination } from "./pagination";
import { CustomSlider } from "./custom-slider";

import { ResponseDocumentsTypes } from "@/types";
import { convertDate, formatDate } from "@/utils";
import { DateValueType } from "react-tailwindcss-datepicker";

export const CertificationLegalities = () => {
  // swiper state
  const [isBeginning, setIsBeginning] = useState<boolean>(true);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [controlledSwiper, setControlledSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  // handle change for swiper
  const handleClickPrev = () => controlledSwiper?.slidePrev();
  const handleClickNext = () => controlledSwiper?.slideNext();

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(controlledSwiper?.activeIndex || 0);
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  // filtered data state
  const [selectCard, setSelectCard] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("uploadedAt");
  const [order, setOrder] = useState<string>("desc");

  const [date, setDate] = useState<DateValueType>({ startDate: null, endDate: null });
  const dateStart = formatDate(date?.startDate);
  const dateEnd = formatDate(date?.endDate);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const { response: documents, loading } = useGetSearchApi<ResponseDocumentsTypes>({
    path: "/documents",
    searchQuery: debouncedSearchTerm,
    sort,
    order,
    dateEnd,
    dateStart,
  });

  const selectedCard = documents?.data.find((item) => item.slug === selectCard);

  const [splitData, setSplitData] = useState<number>(0);

  const handleSetFiltered = (dropdownKey: string, value: string) => {
    const [newSort, newOrder] = value.split("&").map((param) => param.split("=")[1]);
    if (dropdownKey === "dropdownFilter") {
      setSort(newSort);
      setOrder(newOrder);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (documents?.data && documents.data.length > 0) {
      setSplitData(Math.ceil(documents?.data.length / 3));
    }
  }, [documents]);

  return (
    <Container className="py-10 space-y-8 sm:py-16 md:py-20">
      <h2 className="text-center heading">Company Legalities and Certifications</h2>
      <div className="hidden lg:block">
        <SearchFilter setFiltered={handleSetFiltered} setSearchTerm={handleSearch} date={date} setDate={setDate} />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="relative order-2 w-full lg:order-1">
            <div className="block lg:hidden">
              <SearchFilter setFiltered={handleSetFiltered} setSearchTerm={handleSearch} date={date} setDate={setDate} />
            </div>
            <CustomSlider
              splitData={splitData}
              data={documents?.data}
              controlledSwiper={controlledSwiper}
              handleSlideChange={handleSlideChange}
              setControlledSwiper={setControlledSwiper}
              selected={selectCard}
              setSelected={setSelectCard}
            />
            <Pagination
              isBeginning={isBeginning}
              isEnd={isEnd}
              dataLength={splitData}
              activeIndex={activeIndex}
              handleClickNext={handleClickNext}
              handleClickPrev={handleClickPrev}
            />
          </div>
        )}
        <div className="order-1 w-full space-y-4 text-center lg:order-2">
          <Img src={"/temp-image.png"} alt={"test"} className="mx-auto w-72 sm:w-80 lg:w-96 aspect-square" cover />
          <div className="space-y-2">
            <h5 className="text-lg font-semibold sm:text-xl md:text-3xl text-primary group-hover:text-light">{selectedCard?.name}</h5>
            <p className="text-sm sm:text-base md:text-lg text-gray group-hover:text-light">{selectedCard?.category}</p>
            <p className="text-xs font-semibold sm:text-sm md:text-base text-gray group-hover:text-light">
              {convertDate(selectedCard?.uploadedAt as string)}
            </p>
          </div>
        </div>
      </div>
      {/* <DisplayThumbnail
        fileUrl="https://icodeu-storage.s3.ap-southeast-1.amazonaws.com/documents/legality/surat-pernyataan-ambil-sertifikat-toeflmuhammad-helmy-fadlail-albab-1727775279869.pdf"
        pageIndex={0}
      /> */}
    </Container>
  );
};
