"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { useGetSearchApi } from "@/hooks";
import { useDebounce } from "use-debounce";

import { Container, DisplayThumbnail, Pagination } from "@/components";
import { SearchFilter } from "./search-filter";
import { CardCertification } from "./card-certification";
import { DateValueType } from "react-tailwindcss-datepicker";

import { convertDate, formatDate } from "@/utils";

import { ResponseDocumentsTypes } from "@/types";

export const CertificationLegalities = () => {
  // filtered data state
  const [selectCard, setSelectCard] = useState<string>("");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sort, setSort] = useState<string>("uploadedAt");
  const [order, setOrder] = useState<string>("desc");
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const [date, setDate] = useState<DateValueType>({ startDate: null, endDate: null });
  const dateStart = formatDate(date?.startDate);
  const dateEnd = formatDate(date?.endDate);

  const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);

  const { response: documents, loading } = useGetSearchApi<ResponseDocumentsTypes>({
    path: "/documents",
    searchQuery: debouncedSearchTerm,
    limit: "3",
    page: page.toString(),
    sort,
    order,
    dateEnd,
    dateStart,
  });

  const selectedCard = documents?.data.find((item) => item.slug === selectCard);

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
      setTotalPage(Math.ceil(documents.total / 3));
      setSelectCard(documents.data[0].slug);
    }
  }, [documents]);

  return (
    <Container className="py-10 space-y-8 sm:py-16 md:py-20">
      <h2 className="text-center heading">Company Legalities and Certifications</h2>
      <div className="hidden lg:block">
        <SearchFilter setFiltered={handleSetFiltered} setSearchTerm={handleSearch} searchTerm={searchTerm} date={date} setDate={setDate} />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {loading ? (
          <div className="flex items-center justify-center min-h-500">
            <div className="loader"></div>
          </div>
        ) : (
          <div className="relative order-2 w-full lg:order-1 min-h-600 lg:min-h-500 flex flex-col">
            <div className="block lg:hidden">
              <SearchFilter setFiltered={handleSetFiltered} setSearchTerm={handleSearch} searchTerm={searchTerm} date={date} setDate={setDate} />
            </div>
            {documents?.data && documents?.data.length < 1 ? (
              <div className="flex items-center justify-center h-full">
                <h3 className="w-full col-span-1 m-8 text-3xl font-semibold text-center sm:col-span-2 xl:col-span-3 text-gray/50">
                  The document is not found
                </h3>
              </div>
            ) : (
              <div className="space-y-8 mt-8">
                {documents?.data.map((item, index) => (
                  <CardCertification
                    key={index}
                    category={item.category}
                    name={item.name}
                    slug={item.slug}
                    uploadedAt={item.uploadedAt}
                    url={item.url}
                    size={item.size}
                    selected={selectCard}
                    setSelected={setSelectCard}
                  />
                ))}
              </div>
            )}
            <div className="mt-auto w-full">
              <Pagination setPage={setPage} totalPage={totalPage} page={page} />
            </div>
          </div>
        )}
        <div className="order-1 w-full space-y-4 text-center lg:order-2">
          <div className="flex justify-center w-full mt-4 lg:mt-8 preview-thumbnail-selected">
            <DisplayThumbnail
              fileUrl={
                selectedCard?.url ||
                "https://icodeu-storage.s3.ap-southeast-1.amazonaws.com/documents/award/surat-pernyataan-ambil-sertifikat-toeflmuhammad-helmy-fadlail-albab-1728069726585.pdf"
              }
            />
          </div>
          <div className="space-y-2">
            <h5 className="text-lg font-semibold sm:text-xl md:text-3xl text-primary group-hover:text-light">{selectedCard?.name}</h5>
            <p className="text-sm sm:text-base md:text-lg text-gray group-hover:text-light">{selectedCard?.category}</p>
            <p className="text-xs font-semibold sm:text-sm md:text-base text-gray group-hover:text-light">
              {convertDate(selectedCard?.uploadedAt || "")}
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
};
