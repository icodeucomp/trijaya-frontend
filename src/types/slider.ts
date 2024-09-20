import { SwiperOptions } from "swiper/types";

export interface SliderProps extends SwiperOptions {
  title: string;
  children: React.ReactNode[];
  className?: string;
  isBold?: boolean;
  isFilter?: boolean;
  isButton?: boolean;
  linkButton?: string;
}
