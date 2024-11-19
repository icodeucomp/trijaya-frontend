// import { Link } from "@/i18n/routing";

import { useTranslations } from "next-intl";

import { Button, Container, Img, Motion } from "@/components";

// import { arrow_up_light } from "@/icons";

import { CareerLists } from "@/static";

export const Careers = () => {
  const t = useTranslations("career.head");

  const careers = CareerLists();

  return (
    <Container id="career" className="py-10 space-y-8 sm:py-16 md:py-20">
      <Motion tag="div" initialY={-40} animateY={0} duration={0.3} className="space-y-2 text-center">
        <h3 className="heading">{t("title")}</h3>
        <p className="subheading">{t("description")}</p>
      </Motion>
      <div className="flex flex-col justify-between gap-8 sm:flex-row">
        {careers.map((item, index) => (
          <Motion tag="div" initialX={40} animateX={0} duration={0.6} delay={index / 5 + 0.2} key={index} className="flex-1 p-6 space-y-4 rounded-lg card-shadow sm:p-8 bg-light">
            <div className="px-4 py-2 rounded-lg bg-light-gray w-max">
              <Img src={item.pathImg} alt={item.title} className="size-10 sm:size-12" />
            </div>
            <h5 className="text-xl font-semibold sm:text-2xl text-primary">{item.title}</h5>
            <p className="mb-8 text-sm sm:text-lg">{item.description}</p>
            <Button className="flex items-center ms-auto btn-primary pointer-events-none opacity-80" disabled>
              {item.buttonText}
              {/* <Img src={arrow_up_light} alt="arrow-up-light" className="size-4 sm:size-6 md:size-8" /> */}
            </Button>
            {/* <Link href="/" className="flex justify-end">
            </Link> */}
          </Motion>
        ))}
      </div>
    </Container>
  );
};
