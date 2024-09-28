import { Dispatch, SetStateAction } from "react";
import { SwiperOptions } from "swiper/types";

export interface SmallSliderProps extends SwiperOptions {
  title: string;
  children: React.ReactNode[] | React.ReactNode;
  setIndex?: Dispatch<SetStateAction<number>>;
  className?: string;
  loadData?: boolean;
  isButton?: boolean;
  linkButton?: string;
}
