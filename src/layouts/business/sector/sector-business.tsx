import { useTranslations } from "next-intl";

import { Breadcrumbs, Button, Container, Img } from "@/components";

import { FaWhatsapp } from "react-icons/fa6";

export const SectorBusiness = ({ slug }: { slug: string }) => {
  const t = useTranslations("contact-us");
  return (
    <Container className="pt-10 pb-16 space-y-8">
      <div className="space-y-4">
        <Breadcrumbs
          items={[
            { name: "Business", path: "/business sector" },
            { name: slug, path: slug },
          ]}
        />
      </div>
      <div className="flex gap-8">
        <div className="max-w-screen-md space-y-4">
          <h3 className="text-4xl text-primary font-semibold">Electrical</h3>
          <p className="leading-normal text-primary text-justify">
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
            <Button className="flex items-center justify-center btn-secondary gap-2 w-full">
              <FaWhatsapp size={25} /> {t("left-side.button-text")}
            </Button>
          </a>
        </div>
        <div className="max-w-md w-full">
          <Img src="/images/business/electrical.png" alt={slug} className="w-full h-96 overflow-hidden rounded-lg" cover />
        </div>
      </div>
    </Container>
  );
};
