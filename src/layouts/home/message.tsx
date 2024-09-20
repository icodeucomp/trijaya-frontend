import { Container, Img } from "@/components";
import { useTranslations } from "next-intl";

export const Message = () => {
  const t = useTranslations("home.message");

  const images: string[] = ["/images/home/profile-1.png", "/images/home/profile-2.png", "/images/home/profile-3.png", "/images/home/profile-4.png"];
  return (
    <Container className="pt-24 flex gap-8">
      <div className="flex-1 space-y-1 font-semibold">
        <h2 className="text-primary text-3xl">{t("welcome")}</h2>
        <h2 className="text-primary text-3xl">PT Trijaya Berkah Mandiri</h2>
        <p className="text-dark-gray font-normal text-lg text-justify">{t("description")}</p>
        <h4 className="text-primary text-lg">Dudi Hikmat</h4>
        <p className="text-secondary text-sm">{t("job-title")}</p>
      </div>
      <div className="flex-1 relative grid grid-cols-2 gap-4">
        {images.map((image, index) => (
          <Img key={index} src={image} alt="image profile PT Trijaya Berkah Mandiri" className="w-72 h-48" cover />
        ))}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-8 bg-light">
          <Img src="/logo-company.png" alt="logo PT Trijaya Berkah Mandiri" className="size-32" />
        </div>
      </div>
    </Container>
  );
};
