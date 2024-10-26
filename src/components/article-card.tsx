import { Link } from "@/i18n/routing";

import { Img } from "./image";
import { Button } from "./button";

import { calendar } from "@/icons";

import { GoArrowRight } from "react-icons/go";

import { convertDate } from "@/utils";

import { ArticleCardProps } from "@/types";

export const ArticleCard = ({ date, title, pathUrl, pathImg }: ArticleCardProps) => {
  return (
    <>
      <Img src={pathImg || "/temp-article.webp"} alt={title} className="w-full h-60 rounded-lg" cover />
      <div className="flex gap-4 mt-2 text-xs sm:text-sm text-dark-gray">
        <li className="flex gap-1">
          <Img src={calendar} alt="calendar icon" className="size-4" />
          {convertDate(date)}
        </li>
      </div>
      <h4 className="mt-4 text-xl font-semibold h-14 sm:h-16 sm:text-2xl text-dark-blue line-clamp-2">{title}</h4>
      <Link href={`/media/article/${pathUrl}`} className="block mt-4">
        <Button className="flex items-center gap-2 btn-outline group">
          Read More <GoArrowRight className="fill-primary group-hover:fill-light" size={20} />
        </Button>
      </Link>
    </>
  );
};
