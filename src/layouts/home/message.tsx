import { useTranslations } from "next-intl";

import { Container, Img } from "@/components";

export const Message = () => {
  const t = useTranslations("home.message");

  const images: string[] = [
    "/images/home-message-1.webp",
    "/images/home-message-2.webp",
    "/images/home-message-3.webp",
    "/images/home-message-4.webp",
  ];

  return (
    <Container className="flex flex-col-reverse gap-8 pt-10 sm:pt-16 md:pt-20 lg:flex-row">
      <div className="flex-1 space-y-4 font-semibold sm:space-y-2">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl text-primary">{t("welcome")}</h2>
          <h2 className="text-2xl sm:text-3xl text-primary">PT Trijaya Berkah Mandiri</h2>
        </div>
        <p className="text-sm font-normal leading-relaxed text-justify sm:text-base md:text-lg text-dark-gray">{t("description")}</p>
        <div className="space-y-1">
          <h4 className="text-base sm:text-lg text-primary">Dudi Hikmat</h4>
          <p className="text-sm text-secondary">{t("job-title")}</p>
        </div>
      </div>
      <div className="relative grid flex-1 grid-cols-2 gap-4">
        {images.map((item, index) => (
          <Img key={index} src={item} alt="image profile PT Trijaya Berkah Mandiri" className="w-full h-32 sm:h-48 md:h-52 lg:h-full" cover />
        ))}
        <div className="absolute p-8 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-light">
          <Img src="/logo-company.png" alt="logo PT Trijaya Berkah Mandiri" className="size-20 sm:size-24 md:size-28 xl:size-32" />
        </div>
      </div>
    </Container>
  );
};
