import Image from "next/image";

import { OurServices } from "@/layouts";
import { Articles, Clients, Hero, Message } from "@/layouts/home";

import { Motion } from "@/components";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="relative">
        <Motion tag="div" initialY={0} animateY={0} duration={0.5}>
          <Image
            src="/images/pattern.png"
            alt="pattern background"
            fill
            className="mx-auto 2xl:max-w-screen-xl opacity-40"
            objectFit="cover"
            objectPosition="center"
          />
        </Motion>
        <Message />
        <OurServices />
      </section>
      <section className="bg-light-gray">
        <Clients />
      </section>
      <Articles />
    </>
  );
}
