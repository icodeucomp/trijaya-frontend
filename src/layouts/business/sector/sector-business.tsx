import { useTranslations } from "next-intl";

import { Breadcrumbs, Button, Container, Img } from "@/components";

import { FaWhatsapp } from "react-icons/fa6";

export const SectorBusiness = ({ slug }: { slug: string }) => {
  const t = useTranslations("contact-us");
  return (
    <Container className="pt-10 pb-16 space-y-8">
      <div className="hidden md:block">
        <Breadcrumbs
          items={[
            { name: "Business", path: "/business sector" },
            { name: slug, path: slug },
          ]}
        />
      </div>
      <div className="flex flex-col-reverse gap-4 md:gap-8 md:flex-row">
        <div className="w-full max-w-screen-md space-y-4">
          <h3 className="heading">Electrical</h3>
          <p className="h-full overflow-y-auto text-sm leading-normal text-justify text-primary sm:text-base md:h-64 xl:h-auto scrollbar">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod quas minus veritatis corporis. Esse incidunt error unde iusto expedita
            commodi repudiandae eaque praesentium perspiciatis quo consequatur doloribus saepe, qui consequuntur molestiae, ipsum sunt ex nobis
            officia delectus minus dolore! Nam sequi, voluptatibus suscipit harum eos exercitationem cum obcaecati eaque cumque excepturi, in sed
            fugit deleniti ea ex non iusto, labore facilis nobis cupiditate quis repellendus tenetur fugiat. Commodi veritatis nesciunt voluptatibus,
            ab dolorum perferendis odit eius quisquam magnam quas provident suscipit nemo possimus rem accusamus obcaecati saepe dolor error
            aspernatur voluptatum? Ipsam veritatis ipsum perspiciatis maiores? Nostrum deleniti omnis cupiditate dolorum saepe recusandae vel iusto
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos excepturi quisquam, tenetur quasi soluta cum. Dicta harum
            praesentium tenetur excepturi.
          </p>
          <a href="https://wa.me/6281334105663" rel="noreferrer" target="_blank" className="block">
            <Button className="flex items-center justify-center w-full gap-2 btn-secondary">
              <FaWhatsapp className="size-4 sm:size-5 md:size-6" /> {t("left-side.button-text")}
            </Button>
          </a>
        </div>
        <div className="w-full max-w-md mx-auto">
          <Img src="/images/business/electrical.png" alt={slug} className="w-full overflow-hidden rounded-lg h-80 lg:h-96" cover />
        </div>
      </div>
    </Container>
  );
};
