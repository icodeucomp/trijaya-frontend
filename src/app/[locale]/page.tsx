import Image from "next/image";

import { Projects } from "@/layouts";
import { Articles, Clients, Details, Experiences, Hero, Message, Products, Services } from "@/layouts/home";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Hero />
      <section className="relative">
        <Image
          src="/images/pattern.png"
          alt="pattern background"
          fill
          className="mx-auto 2xl:max-w-screen-xl opacity-40"
          objectFit="cover"
          objectPosition="center"
        />
        <Message />
        <Services />
      </section>
      <Details />
      <Projects />
      <Products />
      <section className="bg-light-gray">
        <Clients />
      </section>
      <Experiences />
      <Articles />
    </div>
  );
}
