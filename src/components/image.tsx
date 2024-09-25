import Image from "next/image";

import { ImgProps } from "@/types";

export const Img = ({ src, alt, className, cover, priority = false }: ImgProps) => {
  return (
    <div className={`relative ${className}`}>
      <Image src={src} alt={alt} fill objectFit={cover ? "cover" : ""} objectPosition="top" priority={priority} className="w-full h-full" />
    </div>
  );
};
