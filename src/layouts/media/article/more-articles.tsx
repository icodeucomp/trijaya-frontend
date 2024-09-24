import { Link } from "@/i18n/routing";

import { useTranslations } from "next-intl";

import { Button, Container, Img, Slider } from "@/components";

import { calendar, carbon_tag } from "@/icons";

import { GoArrowRight } from "react-icons/go";

export const MoreArticles = () => {
  const t = useTranslations("media");

  return (
    <div className="py-10 bg-light-gray">
      <Container>
        <Slider
          title={`${t("more-articles")}`}
          breakpoints={{ 0: { slidesPerView: 1 }, 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
          slidesPerView={3}
          className="space-y-10"
          isBold
        >
          {[...Array(4)].map((_, index) => (
            <div key={index}>
              <Img
                src={`/images/home/profile-${index + 1}.png`}
                alt={`Profile ${index + 1}`}
                className="overflow-hidden rounded-lg aspect-video w-96"
                cover
              />
              <div className="flex text-sm gap-4 text-dark-gray !mt-2">
                <li className="flex gap-1">
                  <Img src={calendar} alt="calendar icon" className="size-4" />
                  22 January 2024
                </li>
                <li className="flex gap-1">
                  <Img src={carbon_tag} alt="calendar icon" className="size-4" />
                  Social
                </li>
              </div>
              <h4 className="mt-4 text-2xl font-semibold text-dark-blue">ClearWater Engineering Breaks Ground on $500M Water Treatment Facility</h4>
              <Link href="/" className="block mt-4">
                <Button className="flex items-center gap-2 btn-outline group">
                  Read More <GoArrowRight className="fill-primary group-hover:fill-light" size={20} />
                </Button>
              </Link>
            </div>
          ))}
        </Slider>
      </Container>
    </div>
  );
};
