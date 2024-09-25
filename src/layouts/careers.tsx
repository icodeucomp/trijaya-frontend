import { Button, Container, Img } from "@/components";
import { Link } from "@/i18n/routing";
import { arrow_up_light } from "@/icons";
import { CareerLists } from "@/static";
import { useTranslations } from "next-intl";

export const Careers = () => {
  const t = useTranslations("career.head");

  const careers = CareerLists();

  return (
    <Container className="py-10 space-y-8 sm:py-16 md:py-20">
      <div className="space-y-2 text-center">
        <h3 className="heading">{t("title")}</h3>
        <p className="subheading">{t("description")}</p>
      </div>
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        {careers.map((item, index) => (
          <div key={index} className="flex-1 p-6 space-y-4 rounded-lg card-shadow sm:p-8 bg-light">
            <div className="px-4 py-2 rounded-lg bg-light-gray w-max">
              <Img src={item.pathImg} alt={item.title} className="size-10 sm:size-12" />
            </div>
            <h5 className="text-xl font-semibold sm:text-2xl text-primary">{item.title}</h5>
            <p className="mb-8 text-sm sm:text-lg">{item.description}</p>
            <Link href="/" className="flex justify-end">
              <Button className="flex items-center btn-primary">
                {item.buttonText}
                <Img src={arrow_up_light} alt="arrow-up-light" className="size-4 sm:size-6 md:size-8" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};
