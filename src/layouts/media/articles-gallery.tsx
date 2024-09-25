import { Link } from "@/i18n/routing";

import { useTranslations } from "next-intl";

import { Button, Container, Img, Slider } from "@/components";

import { calendar, carbon_tag } from "@/icons";

import { GoArrowRight } from "react-icons/go";

export const ArticlesGallery = () => {
  const t = useTranslations("media");

  return (
    <Container className="pb-10 sm:pb-16">
      <Slider title={`${t("articles-gallery")}`} slidesPerView={1} grid={{ rows: 2 }} className="space-y-10" isBold>
        {Array.from({ length: 3 }, (_, i) => (
          <div key={i} className="grid grid-cols-1 gap-8 p-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 15 })
              .slice(i * 6, (i + 1) * 6)
              .map((_, j) => (
                <div key={j}>
                  <Img src={`/temp-image-5.png`} alt={`Profile ${j + 1}`} className="w-full h-64 overflow-hidden rounded-lg" cover />
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
                  <h4 className="mt-4 text-xl font-semibold md:text-2xl text-dark-blue">
                    ClearWater Engineering Breaks Ground on $500M Water Treatment Facility
                  </h4>
                  <Link href="/media/article/test-1" className="block mt-4">
                    <Button className="flex items-center gap-2 btn-outline group">
                      Read More <GoArrowRight className="fill-primary group-hover:fill-light" size={20} />
                    </Button>
                  </Link>
                </div>
              ))}
          </div>
        ))}
      </Slider>
    </Container>
  );
};
