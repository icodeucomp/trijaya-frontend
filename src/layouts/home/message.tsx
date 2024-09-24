import { Container, Img } from "@/components";
import { useTranslations } from "next-intl";

export const Message = () => {
  const t = useTranslations("home.message");

  const images: string[] = ["/images/home/profile-1.png", "/images/home/profile-2.png", "/images/home/profile-3.png", "/images/home/profile-4.png"];
  return (
    <Container className="flex flex-col-reverse gap-8 pt-24 lg:flex-row">
      <div className="flex-1 space-y-1 font-semibold">
        <h2 className="text-3xl text-primary">{t("welcome")}</h2>
        <h2 className="text-3xl text-primary">PT Trijaya Berkah Mandiri</h2>
        <p className="text-lg font-normal text-justify text-dark-gray">{t("description")}</p>
        <h4 className="text-lg text-primary">Dudi Hikmat</h4>
        <p className="text-sm text-secondary">{t("job-title")}</p>
      </div>
      <div className="relative grid flex-1 grid-cols-2 gap-4">
        {images.map((item, index) => (
          <Img key={index} src={item} alt="image profile PT Trijaya Berkah Mandiri" className="w-full h-48 lg:h-full" cover />
        ))}
        <div className="absolute p-8 -translate-x-1/2 -translate-y-1/2 rounded-full top-1/2 left-1/2 bg-light">
          <Img src="/logo-company.png" alt="logo PT Trijaya Berkah Mandiri" className="size-24 lg:size-28 xl:size-32" />
        </div>
      </div>
    </Container>
  );
};
