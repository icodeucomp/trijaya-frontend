import Image from "next/image";

import { Articles, Clients, Details, Experiences, Hero, Message, Products, Projects, Services } from "@/layouts/home";

export default function Home() {
  return (
    <section className="overflow-x-hidden">
      <Hero />
      <section className="relative">
        <Image src="/images/pattern.png" alt="pattern background" fill className="mx-auto 2xl:max-w-screen-xl opacity-40" objectFit="cover" objectPosition="center" />
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
    </section>
  );
}
