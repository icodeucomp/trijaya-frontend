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
          <div className="w-full max-w-screen-sm px-4 pt-8 mx-auto space-y-4 sm:px-8">
            <Img src={business?.data.imageHeaderUrl as string} alt="temporary" className="aspect-square w-60 mx-auto" cover />
            <h3 className="heading">{business?.data.title}</h3>
            <p className="text-sm sm:text-base text-dark-gray text-justify">{business?.data.description}</p>
          </div>
          <div className="w-full px-4 pt-20 mx-auto sm:px-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <ImageSlider images={business?.data.Product[selectImageProduct].mediaUrls || []} imgClassName="w-full max-w-xs mx-auto h-60 md:h-72" />
            <SmallSlider slidesPerView={1} title="Products" className="space-y-2 md:space-y-4 md:col-span-2" setIndex={setSelectImageProduct}>
              {business?.data.Product.map((item, index) => (
                <div key={index} className="space-y-2 md:space-y-4">
                  <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">{item.title}</h4>

                  <p className="overflow-y-auto text-sm leading-tight text-justify h-32 md:h-40 sm:text-base scrollbar">{item.description}</p>
                </div>
              ))}
            </SmallSlider>
          </div>
          <div className="w-full px-4 pt-20 mx-auto sm:px-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <ImageSlider images={business?.data.Service[selectImageService].mediaUrls || []} imgClassName="w-full max-w-xs mx-auto h-60 md:h-72" />
            <SmallSlider slidesPerView={1} title="Services" className="space-y-2 md:space-y-4 md:col-span-2" setIndex={setSelectImageService}>
              {business?.data.Service.map((item, index) => (
                <div key={index} className="space-y-2 md:space-y-4">
                  <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">{item.title}</h4>

                  <p className="overflow-y-auto text-sm leading-tight text-justify h-32 md:h-40 sm:text-base scrollbar">{item.description}</p>
                </div>
              ))}
            </SmallSlider>
          </div>
          <div className="w-full px-4 pt-20 mx-auto sm:px-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <ImageSlider images={business?.data.Project[selectImageProject].mediaUrls || []} imgClassName="w-full max-w-xs mx-auto h-60 md:h-72" />
            <SmallSlider slidesPerView={1} title="Projects" className="space-y-2 md:space-y-4 md:col-span-2" setIndex={setSelectImageProject}>
              {business?.data.Project.map((item, index) => (
                <div key={index} className="space-y-2 md:space-y-4">
                  <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">{item.title}</h4>

                  <p className="overflow-y-auto text-sm leading-tight text-justify h-32 md:h-40 sm:text-base scrollbar">{item.description}</p>
                </div>
              ))}
            </SmallSlider>
          </div>
        </>
      )}
    </>
  );
};
