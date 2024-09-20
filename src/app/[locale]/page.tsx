import Image from "next/image";

import { OurServices } from "@/layouts";
import { Articles, Clients, Hero, Message } from "@/layouts/home";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="relative">
        <Image
          src="/images/pattern.png"
          alt="pattern background"
          fill
          className="mx-auto 2xl:max-w-screen-xl opacity-70"
          objectFit="cover"
          objectPosition="center"
        />
        <Message />
        <OurServices />
      </section>
      <section className="bg-light-gray">
        <Clients />
      </section>
      <section className="relative py-20">
        <Articles />
      </section>
    </>
  );
}
