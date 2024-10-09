"use client";

import { notFound } from "next/navigation";

import { useGetApi } from "@/hooks";

import { useTranslations } from "next-intl";

import { Breadcrumbs, Button, Container, Img } from "@/components";

import { FaWhatsapp } from "react-icons/fa6";

import { ResponseBusinessTypes } from "@/types";

export const SectorBusiness = ({ slug }: { slug: string }) => {
  const { response: business, loading, error } = useGetApi<ResponseBusinessTypes>(`/business/${slug}`);

  const t = useTranslations("contact-us");

  if (error) {
    notFound();
  }

  const templateMessage: string = `Halo%2C%20saya%20tertarik%20dengan%20layanan%20${business?.data.title}%20PT.Trijaya%20Berkah%20Mandiri.%0ABisakah%20saya%20mendapatkan%20informasi%20lebih%20lanjut%3F%20Terima%20kasih.`;

  return (
    <Container className="pt-10 pb-16 space-y-8">
      {loading ? (
        <div className="flex justify-center w-full py-16">
          <span className="loader"></span>
        </div>
      ) : (
        <>
          <div className="hidden md:block">
            <Breadcrumbs
              items={[
                { name: "Business", path: "/business/sector" },
                { name: business?.data.title || "", path: slug },
              ]}
            />
          </div>
          <div className="flex flex-col-reverse gap-4 md:gap-8 md:flex-row">
            <div className="flex flex-col w-full max-w-screen-md gap-4">
              <h3 className="heading">{business?.data.title}</h3>
              <p className="h-full overflow-y-auto text-sm leading-normal text-justify text-primary sm:text-base md:h-64 xl:h-auto scrollbar">
                {business?.data.description}
              </p>
              <a href={`https://wa.me/6281288385837?text=${templateMessage}`} rel="noreferrer" target="_blank" className="block mt-auto">
                <Button className="flex items-center justify-center w-full gap-2 btn-secondary">
                  <FaWhatsapp className="size-4 sm:size-5 md:size-6" /> {t("left-side.button-text")}
                </Button>
              </a>
            </div>
            <div className="w-full max-w-md mx-auto">
              <Img src={business?.data.imageHeader.url || "/temp-business.webp"} alt={slug} className="w-full rounded-lg h-80 md:h-96" cover />
            </div>
          </div>
        </>
      )}
    </Container>
  );
};
