"use client";

import * as React from "react";

import { useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";

import { useGetApi } from "@/hooks";
import { useDebounce } from "use-debounce";

import { Container, DisplayThumbnail, Motion, Pagination } from "@/components";
import { SearchFilter } from "./search-filter";
import { CardCertification } from "./card-certification";
import { DateValueType } from "react-tailwindcss-datepicker";

import { convertDate, formatDate } from "@/utils";

import { ResponseDocumentsTypes } from "@/types";

const DEFAULT_FILE = "https://trijaya-berkah-mandiri-storage.s3.ap-southeast-1.amazonaws.com/company-profile/Trijaya+Bakti+Mandiri+-+Company+Profile.pdf";

export const CertificationLegalities = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  // filtered data state
  const [selectCard, setSelectCard] = React.useState<string>("");

  const [sort, setSort] = React.useState<string>("uploadedAt");
  const [order, setOrder] = React.useState<string>("desc");
  const [page, setPage] = React.useState<number>(1);
  const [totalPage, setTotalPage] = React.useState<number>(1);
  const [date, setDate] = React.useState<DateValueType>({ startDate: null, endDate: null });

  const dateStart = formatDate(date?.startDate);
  const dateEnd = formatDate(date?.endDate);

  const [debouncedSearchTerm] = useDebounce(searchParams.get("documents_keywords"), 1000);

  const { response: documents, loading } = useGetApi<ResponseDocumentsTypes>({
    path: "/documents",
    searchQuery: debouncedSearchTerm || "",
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

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    push(`/profile/certification?documents_keywords=${e.target.value}#certification-legalities`);
  };

  React.useEffect(() => {
    if (documents?.data && documents.data.length > 0) {
      setTotalPage(Math.ceil(documents.total / 3));
      setSelectCard(documents.data[0].slug);
    } else {
      setTotalPage(0);
    }
  }, [documents]);

  return (
    <Container className="py-10 space-y-14 sm:py-16 md:py-20" id="certification-legalities">
      <Motion tag="h2" initialY={-40} animateY={0} duration={0.3} className="text-center heading">
        Company Legalities and Certifications
      </Motion>
      <Motion tag="div" initialY={-40} animateY={0} duration={0.6} delay={0.3} className="hidden lg:block">
        <SearchFilter setFiltered={handleSetFiltered} setSearchTerm={handleSearch} searchTerm={searchParams.get("documents_keywords") || ""} date={date} setDate={setDate} />
      </Motion>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Motion tag="div" initialX={-40} animateX={0} duration={0.3} className="relative flex flex-col order-2 w-full lg:order-1">
          <div className="block lg:hidden">
            <SearchFilter setFiltered={handleSetFiltered} setSearchTerm={handleSearch} searchTerm={searchParams.get("documents_keywords") || ""} date={date} setDate={setDate} />
          </div>
          {loading ? (
            <div className="flex items-center justify-center min-h-500">
              <div className="loader"></div>
            </div>
          ) : (
            <>
              {documents?.data && documents?.data.length < 1 ? (
                <div className="flex items-center justify-center min-h-500">
                  <h3 className="w-full col-span-1 m-8 text-lg font-semibold text-center sm:text-2xl md:text-3xl sm:col-span-2 xl:col-span-3 text-gray/50">The document is not found</h3>
                </div>
              ) : (
                <div className="mt-8 space-y-8 min-h-500">
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
                      defaultFile={DEFAULT_FILE}
                    />
                  ))}
                </div>
              )}
            </>
          )}
          <div className="w-full pt-8 mt-auto">
            <Pagination setPage={setPage} totalPage={totalPage} page={page} isNumbering />
          </div>
        </Motion>
        <Motion tag="div" initialX={40} animateX={0} duration={0.6} delay={0.3} className="order-1 w-full space-y-4 text-center lg:order-2">
          {documents?.data && documents?.data.length < 1 ? (
            <div className="flex items-center justify-center min-h-500">
              <h3 className="w-full col-span-1 m-8 text-lg font-semibold text-center sm:text-2xl md:text-3xl sm:col-span-2 xl:col-span-3 text-gray/50">The document is not found</h3>
            </div>
          ) : (
            <>
              <div className="flex justify-center w-full mt-4 lg:mt-8 preview-thumbnail-selected">
                <DisplayThumbnail fileUrl={selectedCard?.url || DEFAULT_FILE} />
              </div>
              <div className="space-y-2">
                <h5 className="text-lg font-semibold sm:text-xl md:text-3xl text-primary group-hover:text-light">{selectedCard?.name}</h5>
                <p className="text-sm sm:text-base md:text-lg text-gray group-hover:text-light">{selectedCard?.category}</p>
                <p className="text-xs font-semibold sm:text-sm md:text-base text-gray group-hover:text-light">{convertDate(selectedCard?.uploadedAt || "")}</p>
              </div>
            </>
          )}
        </Motion>
      </div>
    </Container>
  );
};
