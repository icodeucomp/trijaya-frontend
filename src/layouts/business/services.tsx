"use client";

import * as React from "react";

import { Link } from "@/i18n/routing";

import { useGetApi } from "@/hooks";

import { Button, Container, Dropdown, ImageSlider, Img, SmallSlider } from "@/components";

import { BusinessesTypes, ResponseBusinessesTypes } from "@/types";

export const Services = () => {
  const { response: services, loading } = useGetApi<ResponseBusinessesTypes>("/business");

  const [filtered, setFiltered] = React.useState<string>("");
  const [selectImages, setSelectImages] = React.useState<number>(0);

  const titleServices: { display: string; value: string }[] = services?.data.map((item) => ({ display: item.title, value: item.title })) || [];

  const filterDataServices: BusinessesTypes | undefined = services?.data.find((item: BusinessesTypes) => item.title === filtered);

  React.useEffect(() => {
    if (titleServices.length > 0) {
      setFiltered(titleServices[0].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services]);

  const handleSetFiltered = (_key: string, value: string) => {
    setFiltered(value);
  };

  return (
    <Container className="pt-12 pb-8 space-y-8 sm:pb-16 sm:pt-16 md:pt-24">
      <div className="flex items-center justify-between">
        <h3 className="heading">Services</h3>
        <Link href="/business/sector">
          <Button className="btn-outline">Learn More</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0">
        <div className="w-full max-w-xl mx-auto space-y-4 lg:max-w-2xl">
          {loading ? (
            <div className="w-full py-8 flex justify-center">
              <span className="loader"></span>
            </div>
          ) : (
            <>
              <div className="w-full overflow-hidden rounded-lg">
                <Img
                  src={filterDataServices?.Service[selectImages]?.mediaUrls[0] || "/temp-image-3.png"}
                  alt="temporary"
                  className="w-full h-72 sm:h-80"
                  cover
                />
              </div>
              <ImageSlider
                imgClassName="aspect-video"
                images={filterDataServices?.Service[selectImages]?.mediaUrls || ["/temp-image-3.png"]}
                spaceBetween={10}
                breakpoints={{ 0: { slidesPerView: 2 }, 768: { slidesPerView: 3 } }}
                slidesPerView={3}
              />
            </>
          )}
        </div>
        <div className="w-full space-y-4 sm:space-y-8 lg:pl-8">
          {loading ? (
            <div className="w-full py-8 flex justify-center">
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
                {filterDataServices?.Service.map((item, index) => (
                  <div key={index} className="space-y-4">
                    <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">{item.title}</h4>
                    <p className="text-sm leading-tight text-justify sm:text-base xl:text-lg">{item.description}</p>
                  </div>
                ))}
              </SmallSlider>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};
