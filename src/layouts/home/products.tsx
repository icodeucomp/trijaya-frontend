"use client";

import * as React from "react";

import { Link } from "@/i18n/routing";

import { useGetApi, useMediaQuery } from "@/hooks";

import { Background, Container, Motion, Pagination } from "@/components";

import { BusinessesTypes, ResponseBusinessesTypes } from "@/types";

export const Products = () => {
  const colorLabel = ["bg-red-600", "bg-green-600", "bg-blue-600", "bg-yellow-600", "bg-rose-600", "bg-orange-600", "bg-teal-600"];

  const [page, setPage] = React.useState<number>(1);
  const [limit, setLimit] = React.useState<number>(4);
  const [totalPage, setTotalPage] = React.useState<number>(0);

  const [products, setProducts] = React.useState<BusinessesTypes[]>();

  const { response: business, loading } = useGetApi<ResponseBusinessesTypes>({
    path: "/business",
    limit: limit.toString(),
    page: page.toString(),
  });

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
  const isMobile = useMediaQuery("(min-width: 0px) and (max-width: 767px)");

  React.useEffect(() => {
    if (business?.data && business?.data.length > 0) {
      setTotalPage(Math.ceil(business.total / limit));
      setProducts(business.data.filter((item) => item?.Product?.length > 0));
    } else {
      setTotalPage(0);
    }
  }, [business, limit]);

  React.useEffect(() => {
    if (isDesktop) {
      setLimit(4);
    } else if (isTablet) {
      setLimit(3);
    } else if (isMobile) {
      setLimit(2);
    }
  }, [isDesktop, isTablet, isMobile]);

  return (
    <Container className="py-16 space-y-8">
      <div className="flex items-center justify-between">
        <Motion tag="h3" initialX={-50} animateX={0} duration={0.4} className="heading">
          Products
        </Motion>
        <Motion tag="div" initialX={50} animateX={0} duration={0.8} delay={0.4}>
          <Pagination page={page} totalPage={totalPage} setPage={setPage} />
        </Motion>
      </div>

      {loading ? (
        <div className="flex justify-center py-16 min-h-300">
          <div className="loader"></div>
        </div>
      ) : (
        <Motion tag="div" initialY={40} animateY={0} duration={1} delay={0.6} className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((item, index) => (
            <Link key={index} href={`/business/sector/product/${item.slug}`}>
              <Background src={item.productHeader?.url || "/temp-business.webp"} className="flex-col justify-between w-full p-4 sm:p-6 min-h-300 filter-image" parentClassName="rounded-lg" isHover>
                <div className={`px-4 py-1 sm:px-6 rounded-3xl w-max ${colorLabel[index]}`}>
                  <label className="text-xs sm:text-sm">{item.title}</label>
                </div>
                <div className="space-y-1 text-light">
                  <h5 className="text-sm sm:text-base lg:text-lg">PT Trijaya Berkah Mandiri</h5>
                  <h6 className="text-base font-semibold lg:text-xl">{item.Product.length} Products</h6>
                </div>
              </Background>
            </Link>
          ))}
        </Motion>
      )}
    </Container>
  );
};
