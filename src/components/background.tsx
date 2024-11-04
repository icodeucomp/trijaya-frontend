import Image from "next/image";

import { shimmer, toBase64 } from "@/utils";

import { BackgroundProps } from "@/types";

export const Background = ({ src, className, children, parentClassName, isHover, isTop }: BackgroundProps) => {
  return (
    <figure className={`relative text-light shadow-lg overflow-hidden group ${parentClassName ?? ""}`}>
      <Image
        src={src}
        alt="background image"
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(400, 400))}`}
        fill
        quality={100}
        priority
        objectFit="cover"
        objectPosition={isTop ? "top" : "center"}
        className={`absolute inset-0 w-full h-full ${isHover ? "duration-300 group-hover:scale-110" : ""}`}
      />
      <div className={`z-1 relative flex mx-auto w-full ${className ?? ""}`}>{children}</div>
    </figure>
  );
};
