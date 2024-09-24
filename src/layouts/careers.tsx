import { Button, Container, Img } from "@/components";
import { Link } from "@/i18n/routing";
import { arrow_up_light } from "@/icons";
import { CareerLists } from "@/static";
import { useTranslations } from "next-intl";

export const Careers = () => {
  const t = useTranslations("career.head");

  const careers = CareerLists();

  return (
    <Container className="py-20 space-y-8">
      <div className="space-y-2 text-center">
        <h3 className="text-4xl font-semibold text-primary">{t("title")}</h3>
        <p className="text-xl text-dark-gray">{t("description")}</p>
      </div>
      <div className="flex justify-between gap-8">
        {careers.map((item, index) => (
          <div key={index} className="flex-1 p-8 space-y-4 rounded-lg shadow-lg bg-light">
            <div className="px-4 py-2 rounded-lg bg-light-gray w-max">
              <Img src={item.pathImg} alt={item.title} className="size-12" />
            </div>
            <h5 className="font-semibold text-primary text-2xl">{item.title}</h5>
            <p className="text-lg mb-8">{item.description}</p>
            <Link href="/" className="flex justify-end">
              <Button className="flex items-center btn-primary">
                {item.buttonText}
                <Img src={arrow_up_light} alt="arrow-up-light" className="w-8 h-8" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Container>
  );
};
