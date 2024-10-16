import Image from "next/image";

import { Container } from "./container";

import { shimmer, toBase64 } from "@/utils";

import { BackgroundProps } from "@/types";

export const Background = ({ src, className, children, parentClassName, isHover }: BackgroundProps) => {
  return (
    <figure className={`relative text-light shadow-lg overflow-hidden group ${parentClassName ?? ""}`}>
      <Image
        src={src}
        alt="background image"
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(400, 400))}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        fill
        priority
        objectFit="cover"
        objectPosition="center"
        className={`-z-10 ${isHover ? "duration-300 group-hover:scale-110" : ""}`}
      />
      <Container className={`z-1 relative flex ${className ?? ""}`}>{children}</Container>
    </figure>
  );
};
