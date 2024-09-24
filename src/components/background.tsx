import Image from "next/image";
import { Container } from "./container";
import { BackgroundProps } from "@/types";

export const Background = ({ src, className, children, parentClassName }: BackgroundProps) => {
  return (
    <figure className={`relative text-light shadow-lg overflow-hidden ${parentClassName}`}>
      <Image src={src} alt="background image" fill priority objectFit="cover" objectPosition="center" className="-z-10" />
      <Container className={`z-1 relative flex ${className}`}>{children}</Container>
    </figure>
  );
};
