import Image from "next/image";

import { ImgProps } from "@/types";
import { shimmer, toBase64 } from "@/utils";

export const Img = ({ src, alt, className, cover, priority = false }: ImgProps) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        objectFit={cover ? "cover" : ""}
        objectPosition="top"
        placeholder={`data:image/svg+xml;base64,${toBase64(shimmer(500, 500))}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        className="w-full h-full"
      />
    </div>
  );
};
