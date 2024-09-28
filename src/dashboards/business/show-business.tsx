"use client";

import * as React from "react";

import { useRouter } from "next/navigation";

import { ImageSlider, Img, SmallSlider } from "@/components";

import { PiCaretLeftLight } from "react-icons/pi";

export const ShowBusiness = ({ slug }: { slug: string }) => {
  const router = useRouter();

  const [selectImages, setSelectImages] = React.useState<number>(0);
  console.log("🚀 ~ ShowBusiness ~ selectImages:", selectImages);

  const images = ["/temp-image-2.png", "/temp-image-2.png", "/temp-image-2.png"];

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
      <div className="w-full max-w-screen-sm px-4 pt-8 mx-auto space-y-4 sm:px-8">
        <Img src="/temp-image-2.png" alt="temporary" className="aspect-square w-60 mx-auto" cover />
        <h3 className="heading">{slug}</h3>
        <p className="text-sm text-dark-gray text-justify">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, in quam. Explicabo similique fugit iure voluptatibus tempore. Vero, labore
          ducimus quam ad temporibus porro modi, excepturi aperiam saepe assumenda recusandae maxime. Saepe eius quisquam repellendus ullam temporibus
          provident odit, illum, nesciunt voluptas voluptates, natus praesentium tenetur sint ducimus reprehenderit deserunt cum exercitationem vitae
          eum quas atque aliquam! Cum sequi alias optio obcaecati atque nesciunt voluptas porro cupiditate. Quia at nobis temporibus.
        </p>
      </div>
      <div className="w-full px-4 pt-20 mx-auto sm:px-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <ImageSlider images={images} imgClassName="w-full max-w-xs mx-auto h-60 md:h-72" />
        <SmallSlider slidesPerView={1} title="Products" className="space-y-2 md:space-y-4 md:col-span-2" setIndex={setSelectImages}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2 md:space-y-4">
              <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">Alat bor {index + 1}</h4>

              <p className="overflow-y-auto text-sm leading-tight text-justify h-32 md:h-40 sm:text-base scrollbar">
                Our scope of work encompasses a wide range of services, including the construction and repair of industrial buildings tailored to meet
                the unique needs of various sectors. We specialize in the installation of diverse roofing systems, such as Spandek models, Bitumen
                models, and other advanced materials designed for durability and efficiency. Additionally, we provide comprehensive partitioning
                solutions to optimize space and functionality. Beyond construction, our expertise extends to all aspects of fabrication work, ensuring
                precise and high-quality outcomes for every project we undertake.
              </p>
            </div>
          ))}
        </SmallSlider>
      </div>
      <div className="w-full px-4 pt-20 mx-auto sm:px-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <ImageSlider images={images} imgClassName="w-full max-w-xs mx-auto h-60 md:h-72" />
        <SmallSlider slidesPerView={1} title="Services" className="space-y-2 md:space-y-4 md:col-span-2" setIndex={setSelectImages}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2 md:space-y-4">
              <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">Alat bor {index + 1}</h4>

              <p className="overflow-y-auto text-sm leading-tight text-justify h-32 md:h-40 sm:text-base scrollbar">
                Our scope of work encompasses a wide range of services, including the construction and repair of industrial buildings tailored to meet
                the unique needs of various sectors. We specialize in the installation of diverse roofing systems, such as Spandek models, Bitumen
                models, and other advanced materials designed for durability and efficiency. Additionally, we provide comprehensive partitioning
                solutions to optimize space and functionality. Beyond construction, our expertise extends to all aspects of fabrication work, ensuring
                precise and high-quality outcomes for every project we undertake.
              </p>
            </div>
          ))}
        </SmallSlider>
      </div>
      <div className="w-full px-4 pt-20 mx-auto sm:px-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <ImageSlider images={images} imgClassName="w-full max-w-xs mx-auto h-60 md:h-72" />
        <SmallSlider slidesPerView={1} title="Projects" className="space-y-2 md:space-y-4 md:col-span-2" setIndex={setSelectImages}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2 md:space-y-4">
              <h4 className="text-xl font-semibold sm:text-2xl md:text-3xl text-primary">Alat bor {index + 1}</h4>

              <p className="overflow-y-auto text-sm leading-tight text-justify h-32 md:h-40 sm:text-base scrollbar">
                Our scope of work encompasses a wide range of services, including the construction and repair of industrial buildings tailored to meet
                the unique needs of various sectors. We specialize in the installation of diverse roofing systems, such as Spandek models, Bitumen
                models, and other advanced materials designed for durability and efficiency. Additionally, we provide comprehensive partitioning
                solutions to optimize space and functionality. Beyond construction, our expertise extends to all aspects of fabrication work, ensuring
                precise and high-quality outcomes for every project we undertake.
              </p>
            </div>
          ))}
        </SmallSlider>
      </div>
    </>
  );
};
