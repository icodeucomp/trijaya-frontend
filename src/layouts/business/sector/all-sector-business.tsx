"use client";

import { useState } from "react";

import { Background, Container, Modal, Slider } from "@/components";

import { AnimatePresence } from "framer-motion";

export const AllSectorBusiness = () => {
  const [openModalIndex, setOpenModalIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setOpenModalIndex(index);
  };

  const closeModal = () => {
    setOpenModalIndex(null);
  };

  const items = [
    { name: "Alat Bor", images: ["/temp-image-2.png", "/temp-image-2.png", "/temp-image-2.png"], category: "Electrical", products: 2 },
    { name: "Alat Bor", images: ["/temp-image-2.png", "/temp-image-2.png", "/temp-image-2.png"], category: "Fabrication", products: 5 },
    { name: "Alat Bor", images: ["/temp-image-2.png", "/temp-image-2.png", "/temp-image-2.png"], category: "Safety", products: 1 },
    { name: "Alat Bor", images: ["/temp-image-2.png", "/temp-image-2.png", "/temp-image-2.png"], category: "Mechanical", products: 6 },
    { name: "Alat Bor", images: ["/temp-image-2.png", "/temp-image-2.png", "/temp-image-2.png"], category: "Construction", products: 2 },
    { name: "Alat Bor", images: ["/temp-image-2.png", "/temp-image-2.png", "/temp-image-2.png"], category: "Civil", products: 3 },
  ];

  return (
    <Container className="pb-20">
      <Slider
        className="space-y-8"
        title="Products"
        isBold
        spaceBetween={10}
        slidesPerView={4}
        breakpoints={{ 0: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
      >
        {items.map((item, index) => (
          <div key={index} onClick={() => openModal(index)}>
            <Background src="/temp-image-4.png" className="flex-col justify-end w-full py-2 h-72 sm:h-80 filter-image" parentClassName="rounded-lg">
              <div className="text-light">
                <h5 className="text-base sm:text-lg">Alat Bor</h5>
                <h6 className="text-lg font-semibold sm:text-xl">Products</h6>
              </div>
            </Background>
          </div>
        ))}
      </Slider>
      <AnimatePresence>
        {openModalIndex !== null && (
          <Modal
            isVisible={openModalIndex !== null}
            onClose={closeModal}
            category={items[openModalIndex]?.category}
            content={items[openModalIndex]?.name}
            images={items[openModalIndex]?.images}
          />
        )}
      </AnimatePresence>
    </Container>
  );
};
