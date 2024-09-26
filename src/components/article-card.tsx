import { Link } from "@/i18n/routing";

import { Img } from "./image";
import { Button } from "./button";

import { calendar, carbon_tag } from "@/icons";

import { GoArrowRight } from "react-icons/go";

import { convertDate } from "@/utils";

import { ArticleCardProps } from "@/types";

export const ArticleCard = ({ pathImg, date, category, title, pathUrl }: ArticleCardProps) => {
  return (
    <>
      <Img src={pathImg} alt={title} className="w-full h-64 overflow-hidden rounded-lg" cover />
      <div className="flex gap-4 mt-2 text-xs sm:text-sm text-dark-gray">
        <li className="flex gap-1">
          <Img src={calendar} alt="calendar icon" className="size-4" />
          {convertDate(date)}
        </li>
        <li className="flex gap-1">
          <Img src={carbon_tag} alt="calendar icon" className="size-4" />
          {category}
        </li>
      </div>
      <h4 className="mt-4 text-xl font-semibold sm:text-2xl text-dark-blue">{title}</h4>
      <Link href={`/media/article/${pathUrl}`} className="block mt-4">
        <Button className="flex items-center gap-2 btn-outline group">
          Read More <GoArrowRight className="fill-primary group-hover:fill-light" size={20} />
        </Button>
      </Link>
    </>
  );
};
