import { SwiperOptions } from "swiper/types";

export interface ImageSliderProps extends SwiperOptions {
  images: string[];
  imgClassName: string;
}
