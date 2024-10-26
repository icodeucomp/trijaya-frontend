import { SwiperOptions } from "swiper/types";

export interface BigSliderProps extends SwiperOptions {
  title: string;
  children: React.ReactNode[] | React.ReactNode;
  className: string;
  loadData: boolean;
  linkButton?: string;
}
