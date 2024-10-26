"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { useGet } from "@/hooks";

import { ImageSlider, Img, SmallSlider } from "@/components";

import { PiCaretLeftLight } from "react-icons/pi";

import { ResponseBusinessTypes } from "@/types";

export const ShowBusiness = ({ slug }: { slug: string }) => {
  const router = useRouter();
  const { response: business, loading } = useGet<ResponseBusinessTypes>(`/business/${slug}`);

  const [selectImageProduct, setSelectImageProduct] = useState<number>(0);
  const [selectImageProject, setSelectImageProject] = useState<number>(0);
  const [selectImageService, setSelectImageService] = useState<number>(0);

  return (
    <>
      <div className="px-2 py-4">
        <span className="flex items-center gap-2">
          <button type="button" onClick={() => router.back()}>
            <PiCaretLeftLight size={24} />
          </button>
          <h1 className="heading">Show Category</h1>
        </span>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="w-full max-w-2xl px-4 pt-8 mx-auto space-y-4 sm:px-8">
            <div className="flex justify-between">
              <Img src={business?.data.header.url || "/temp-business.webp"} alt="temporary" className="mx-auto rounded-lg aspect-square w-72" cover />
              <Img
                src={business?.data.productHeader.url || "/temp-business.webp"}
                alt="temporary"
                className="mx-auto rounded-lg aspect-square w-72"
                cover
              />
            </div>
            <h3 className="text-center heading">{business?.data.title}</h3>
            <p className="text-sm text-justify sm:text-base text-dark-gray">{business?.data.description}</p>
          </div>
          {business?.data && business?.data.Product.length > 0 && (
            <div className="grid w-full grid-cols-1 gap-4 px-4 pt-20 mx-auto sm:px-8 md:grid-cols-2 lg:grid-cols-3">
              {business?.data && business?.data.Product[selectImageProduct].media.length > 0 ? (
                <ImageSlider
                  images={business?.data.Product[selectImageProduct].media?.map((item) => item.url)}
                  imgClassName="w-full max-w-xs md:max-w-full mx-auto h-60 sm:72 md:h-80"
                />
              ) : (
                <ImageSlider images={["/temp-business.webp"]} imgClassName="w-full max-w-xs md:max-w-full mx-auto h-60 sm:72 md:h-80" />
              )}
              <SmallSlider slidesPerView={1} title="Products" className="space-y-2 md:space-y-4 lg:col-span-2" setIndex={setSelectImageProduct}>
                {business?.data.Product.map((item, index) => (
                  <div key={index} className="space-y-2 md:space-y-4">
                    <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">{item.title}</h4>

                    <p className="h-32 overflow-y-auto text-sm leading-tight text-justify md:h-40 sm:text-base scrollbar">{item.description}</p>
                  </div>
                ))}
              </SmallSlider>
            </div>
          )}
          {business?.data && business?.data.Service.length > 0 && (
            <div className="grid w-full grid-cols-1 gap-4 px-4 pt-20 mx-auto sm:px-8 md:grid-cols-2 lg:grid-cols-3">
              {business?.data && business?.data.Service[selectImageService].media.length > 0 ? (
                <ImageSlider
                  images={business?.data.Service[selectImageService].media?.map((item) => item.url)}
                  imgClassName="w-full max-w-xs md:max-w-full mx-auto h-60 sm:72 md:h-80"
                />
              ) : (
                <ImageSlider images={["/temp-business.webp"]} imgClassName="w-full max-w-xs md:max-w-full mx-auto h-60 sm:72 md:h-80" />
              )}
              <SmallSlider slidesPerView={1} title="Services" className="space-y-2 md:space-y-4 lg:col-span-2" setIndex={setSelectImageService}>
                {business?.data.Service.map((item, index) => (
                  <div key={index} className="space-y-2 md:space-y-4">
                    <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">{item.title}</h4>

                    <p className="h-32 overflow-y-auto text-sm leading-tight text-justify md:h-40 sm:text-base scrollbar">{item.description}</p>
                  </div>
                ))}
              </SmallSlider>
            </div>
          )}
          {business?.data && business?.data.Project.length > 0 && (
            <div className="grid w-full grid-cols-1 gap-4 px-4 pt-20 mx-auto sm:px-8 md:grid-cols-2 lg:grid-cols-3">
              {business?.data && business?.data.Project[selectImageProject].media.length > 0 ? (
                <ImageSlider
                  images={business?.data.Project[selectImageProject].media?.map((item) => item.url)}
                  imgClassName="w-full max-w-xs md:max-w-full mx-auto h-60 sm:72 md:h-80"
                />
              ) : (
                <ImageSlider images={["/temp-business.webp"]} imgClassName="w-full max-w-xs md:max-w-full mx-auto h-60 sm:72 md:h-80" />
              )}
              <SmallSlider slidesPerView={1} title="Projects" className="space-y-2 md:space-y-4 lg:col-span-2" setIndex={setSelectImageProject}>
                {business?.data.Project.map((item, index) => (
                  <div key={index} className="space-y-2 md:space-y-4">
                    <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">{item.title}</h4>

                    <p className="h-32 overflow-y-auto text-sm leading-tight text-justify md:h-40 sm:text-base scrollbar">{item.description}</p>
                  </div>
                ))}
              </SmallSlider>
            </div>
          )}
        </>
      )}
    </>
  );
};
