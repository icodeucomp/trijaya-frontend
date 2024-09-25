import { Link } from "@/i18n/routing";

import { useTranslations } from "next-intl";

import { Button, Container, Img, Slider } from "@/components";

import { calendar, carbon_tag } from "@/icons";

import { GoArrowRight } from "react-icons/go";

export const Articles = () => {
  const t = useTranslations();
  return (
    <Container className="py-12 sm:py-16 md:py-20">
      <Slider
        title={`${t("home.articles")}`}
        breakpoints={{ 0: { slidesPerView: 1 }, 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
        slidesPerView={3}
        className="space-y-6 sm:space-y-10"
        isBold
      >
        {[...Array(4)].map((_, index) => (
          <div key={index}>
            <Img
              src={`/images/home/profile-${index + 1}.png`}
              alt={`Profile ${index + 1}`}
              className="w-full h-64 overflow-hidden rounded-lg"
              cover
            />
            <div className="flex gap-4 mt-2 text-xs sm:text-sm text-dark-gray">
              <li className="flex gap-1">
                <Img src={calendar} alt="calendar icon" className="size-4" />
                22 January 2024
              </li>
              <li className="flex gap-1">
                <Img src={carbon_tag} alt="calendar icon" className="size-4" />
                Social
              </li>
            </div>
            <h4 className="mt-4 text-xl font-semibold sm:text-2xl text-dark-blue">
              ClearWater Engineering Breaks Ground on $500M Water Treatment Facility
            </h4>
            <Link href="/media/article/test-1" className="block mt-4">
              <Button className="flex items-center gap-2 btn-outline group">
                Read More <GoArrowRight className="fill-primary group-hover:fill-light" size={20} />
              </Button>
            </Link>
          </div>
        ))}
      </Slider>
    </Container>
  );
};
