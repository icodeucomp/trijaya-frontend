import Image from "next/image";

import { useTranslations } from "next-intl";

import { Container, Motion } from "@/components";

import { clientsImage } from "@/static";

import { shimmer, toBase64 } from "@/utils";

export const Clients = () => {
  const t = useTranslations("home.clients");

  return (
    <Container className="py-16 space-y-8">
      <Motion tag="div" initialY={-50} animateY={0} duration={0.4} className="space-y-2 text-center">
        <h3 className="text-4xl font-semibold text-primary">{t("title")}</h3>
        <p className="text-xl text-dark-gray">{t("description")}</p>
      </Motion>
      <Motion
        tag="div"
        initialY={50}
        animateY={0}
        duration={0.8}
        delay={0.4}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-items-center gap-x-8 sm:gap-x-12 gap-y-8"
      >
        {clientsImage.map((item, index) => {
          const sizes = index > 10 ? 100 : 160;
          return (
            <div key={index} className="grid w-full h-24 px-2 border rounded-lg border-primary bg-light place-items-center">
              <Image
                src={item}
                alt="image clients PT Trijata Berkah Mandiri"
                width={sizes}
                height={sizes}
                className="max-w-32 sm:max-w-40 max-h-20"
                placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(sizes, 80))}`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          );
        })}
      </Motion>
    </Container>
  );
};
