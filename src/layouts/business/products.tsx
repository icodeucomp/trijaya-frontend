"use client";

import { useState } from "react";

import { Background, Container, Modal, Slider } from "@/components";

import { AnimatePresence } from "framer-motion";

export const Products = () => {
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
    <Container className="pt-10 pb-20">
      <Slider
        className="space-y-8"
        title="Products"
        isBold
        isButton
        linkButton="/business/sector"
        spaceBetween={10}
        slidesPerView={4}
        breakpoints={{ 0: { slidesPerView: 1 }, 640: { slidesPerView: 2 }, 768: { slidesPerView: 3 }, 1024: { slidesPerView: 4 } }}
      >
        {items.map((item, index) => (
          <div key={index} onClick={() => openModal(index)}>
            <Background src="/temp-image-4.png" className="flex-col justify-between py-8 aspect-square filter-image" parentClassName="rounded-lg">
              <div className="px-6 py-1 rounded-3xl bg-secondary w-max">
                <label className="text-sm">{item.category}</label>
              </div>
              <div className="space-y-1 text-light">
                <h5 className="text-lg">PT Trijaya Berkah Mandiri</h5>
                <h6 className="text-xl font-semibold">{item.products} Products</h6>
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
