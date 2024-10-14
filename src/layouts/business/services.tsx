"use client";

import * as React from "react";

import { Link } from "@/i18n/routing";

import { useGetApi } from "@/hooks";

import { useTranslations } from "next-intl";

import { Button, Container, Dropdown, ImageSlider, Img, SmallSlider } from "@/components";

import { BusinessesTypes, ResponseBusinessesTypes } from "@/types";
import { useDebounce } from "use-debounce";

interface TitleServicesTypes {
  display: string;
  value: string;
}

export const Services = () => {
  const t = useTranslations();

  const { response: services, loading } = useGetApi<ResponseBusinessesTypes>("/business");

  const [filteredServices, setFilteredServices] = React.useState<BusinessesTypes>();
  const [filtered, setFiltered] = React.useState<string>("");
  const [selectImages, setSelectImages] = React.useState<number>(0);

  const [categoryFilter] = useDebounce(filtered, 1000);

  const titleServices: TitleServicesTypes[] =
    services?.data.filter((item) => item.Service.length > 0).map((item) => ({ display: item.title, value: item.title })) || [];

  React.useEffect(() => {
    if (filtered !== "") {
      setFilteredServices(services?.data.find((item) => item.title === categoryFilter));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryFilter]);

  React.useEffect(() => {
    if (services?.data && services.data.length > 0) {
      setFilteredServices(services?.data[0]);
      setFiltered(titleServices[0].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services]);

  const handleSetFiltered = (_key: string, value: string) => {
    setFiltered(value);
  };

  return (
    <Container id="service" className="pt-12 pb-8 space-y-8 sm:pb-16 sm:pt-16 md:pt-24">
      <div className="flex items-center justify-between">
        <h3 className="heading">{t("business.services")}</h3>
        <Link href="/business/sector">
          <Button className="btn-outline">{t("learn-more")}</Button>
        </Link>
      </div>
      {!filteredServices?.Service.length ? (
        <h3 className="w-full col-span-1 m-8 text-lg sm:text-2xl md:text-3xl font-semibold text-center sm:col-span-2 xl:col-span-3 text-gray/50">
          The services is not found
        </h3>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0">
          <div className="w-full max-w-xl mx-auto space-y-4 lg:max-w-2xl">
            {loading ? (
              <div className="flex justify-center w-full py-8">
                <span className="loader"></span>
              </div>
            ) : (
              <>
                <div className="w-full overflow-hidden rounded-lg">
                  <Img
                    src={filteredServices?.Service[selectImages]?.media?.[0].url || "/temp-business.webp"}
                    alt="temporary"
                    className="w-full h-80 sm:h-96"
                    cover
                  />
                </div>
                <ImageSlider
                  imgClassName="aspect-square"
                  images={filteredServices?.Service[selectImages]?.media?.slice(1).map((item) => item.url) || ["/temp-business.webp"]}
                  spaceBetween={10}
                  breakpoints={{ 0: { slidesPerView: 2 }, 768: { slidesPerView: 3 } }}
                  slidesPerView={3}
                />
              </>
            )}
          </div>
          <div className="w-full space-y-4 sm:space-y-8 lg:pl-8">
            {loading ? (
              <div className="flex justify-center w-full py-8">
                <span className="loader"></span>
              </div>
            ) : (
              <>
                <Dropdown
                  dropdownKey="services"
                  parentClassName="w-full py-4"
                  className="top-16"
                  data={titleServices}
                  setFiltered={handleSetFiltered}
                />
                <SmallSlider slidesPerView={1} title="Service Activities" className="space-y-4" setIndex={setSelectImages}>
                  {filteredServices?.Service.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">{item.title}</h4>
                      <p className="h-56 overflow-y-auto text-sm leading-tight text-justify sm:text-base xl:text-lg scrollbar">{item.description}</p>
                    </div>
                  ))}
                </SmallSlider>
              </>
            )}
          </div>
        </div>
      )}
    </Container>
  );
};
