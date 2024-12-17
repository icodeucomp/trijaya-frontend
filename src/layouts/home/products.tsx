"use client";

import * as React from "react";

import { Link } from "@/i18n/routing";

import { useTranslations } from "next-intl";

import { useGetApi, useMediaQuery } from "@/hooks";

import { Background, Motion, Slider } from "@/components";

import { BusinessesTypes, ResponseBusinessesTypes } from "@/types";

export const Products = () => {
  const t = useTranslations("home");

  const colorLabel = ["bg-red-600", "bg-green-600", "bg-blue-600", "bg-yellow-600", "bg-rose-600", "bg-orange-600", "bg-teal-600"];

  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(4);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const [products, setProducts] = React.useState<BusinessesTypes[]>();

  const { response: businesses, loading } = useGetApi<ResponseBusinessesTypes>({ path: "/business", limit: "100" });

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 767px)");

  React.useEffect(() => {
    const startIndex = (page - 1) * limit;
    if (businesses?.data && businesses?.data.length > 0) {
      setProducts(businesses.data.filter((business) => business.Product.length > 0).slice(startIndex, startIndex + limit));
      setTotalPage(Math.ceil(businesses.data.filter((business) => business.Product.length > 0).length / limit));
    } else {
      setTotalPage(0);
    }
  }, [businesses, limit, page]);

  React.useEffect(() => {
    if (isDesktop) {
      setLimit(4);
    } else if (isTablet) {
      setLimit(3);
    } else if (isMobile) {
      setLimit(2);
    }
  }, [isDesktop, isTablet, isMobile]);

  if (products && products.length < 1) {
    return null;
  }

  return (
    <Slider
      page={page}
      setPage={setPage}
      title={`${t("products")}`}
      totalPage={totalPage}
      loading={loading}
      parentClassName="py-16 space-y-8"
      className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4"
    >
      <>
        {products?.map((item, index) => (
          <Link key={index} href={`/business/sector/product/${item.slug}`}>
            <Motion tag="div" initialY={30} animateY={0} duration={1} delay={index * 0.1}>
              <Background src={item.productHeader?.url || "/temp-business.webp"} className="flex-col justify-between w-full p-4 sm:p-6 min-h-300 filter-image" parentClassName="rounded-lg" isHover>
                <div className={`px-4 py-1 sm:px-6 rounded-3xl w-max ${colorLabel[index]}`}>
                  <label className="text-xs sm:text-sm">{item.title}</label>
                </div>
                <div className="space-y-1 text-light">
                  <h5 className="text-sm sm:text-base lg:text-lg">PT Trijaya Berkah Mandiri</h5>
                  <h6 className="text-base font-semibold lg:text-xl">{item.Product.length} Products</h6>
                </div>
              </Background>
            </Motion>
          </Link>
        ))}
      </>
    </Slider>
  );
};
