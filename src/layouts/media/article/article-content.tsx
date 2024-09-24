import { useTranslations } from "next-intl";

import { Breadcrumbs, Container, Img } from "@/components";

import { calendar, carbon_tag } from "@/icons";
import { FaInstagram, FaLink, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export const ArticleContent = ({ slug }: { slug: string }) => {
  const t = useTranslations("media");

  return (
    <Container className="pb-16 pt-10 grid grid-cols-3 grid-rows-[auto,auto] gap-x-16 gap-y-4 text-dark-blue">
      <div className="w-full h-auto col-span-2 space-y-8 text-justify">
        <Breadcrumbs
          items={[
            { name: "Media", path: "/media" },
            { name: slug, path: slug },
          ]}
        />
        <h2 className="text-4xl font-semibold leading-snug">Green Building Techniques Boost Energy Efficiency at Legacy Tower Construction</h2>
        <div className="flex gap-4 text-sm text-dark-gray">
          <li className="flex gap-1">
            <Img src={calendar} alt="calendar icon" className="size-4" />
            22 January 2024
          </li>
          <li className="flex gap-1">
            <Img src={carbon_tag} alt="calendar icon" className="size-4" />
            Social
          </li>
        </div>
      </div>
      <div className="w-full h-auto col-span-2 text-justify">
        <div>
          <Img src="/temp-image-5.png" alt="temporary" className="w-full h-96" cover />
          <p className="mt-4 mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae repellendus impedit esse error odio porro distinctio maxime at? Ipsum
            possimus unde nihil. Animi vel, eum labore blanditiis cupiditate harum repudiandae itaque maxime nam minima ducimus iure facere optio
            beatae, dolores doloribus. Praesentium hic sunt dolores dolore, cumque voluptatum repudiandae cum, velit reprehenderit placeat veniam
            beatae qui quisquam debitis molestias laudantium totam facilis sapiente odio delectus ipsum animi porro esse. Distinctio ea tempora facere
            error mollitia odit sunt ratione consequatur voluptatum autem sequi, quisquam inventore eos id, iusto perspiciatis sed earum vitae! Illo
            maiores deleniti alias voluptas, quas quae asperiores, ratione earum quam voluptatum debitis esse facere ab placeat, exercitationem
            similique. Enim architecto voluptas sint aperiam nobis? Temporibus, possimus esse iure inventore nobis, rem perferendis magni architecto
            fugiat illum ad fugit ipsum ab! Perspiciatis, rerum aliquid ex distinctio dolorem nihil vel illum quisquam voluptatibus totam temporibus
            magni, deleniti explicabo dolor nam harum nobis placeat enim animi nemo eaque suscipit blanditiis sed aperiam? Tempora autem, ea nostrum
            dolore neque eius error corporis dolorem quisquam facere sequi obcaecati tempore consectetur vel minus quaerat cumque est fugit, veritatis
            nesciunt nihil necessitatibus. Facere reiciendis consectetur veritatis veniam magnam minus quibusdam eum, qui cumque perferendis quo?
          </p>
          <p className="mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae repellendus impedit esse error odio porro distinctio maxime at? Ipsum
            possimus unde nihil. Animi vel, eum labore blanditiis cupiditate harum repudiandae itaque maxime nam minima ducimus iure facere optio
            beatae, dolores doloribus. Praesentium hic sunt dolores dolore, cumque voluptatum repudiandae cum, velit reprehenderit placeat veniam
            beatae qui quisquam debitis molestias laudantium totam facilis sapiente odio delectus ipsum animi porro esse. Distinctio ea tempora facere
            error mollitia odit sunt ratione consequatur voluptatum autem sequi, quisquam inventore eos id, iusto perspiciatis sed earum vitae! Illo
            maiores deleniti alias voluptas, quas quae asperiores, ratione earum quam voluptatum debitis esse facere ab placeat, exercitationem
            similique. Enim architecto voluptas sint aperiam nobis? Temporibus, possimus esse iure inventore nobis, rem perferendis magni architecto
            fugiat illum ad fugit ipsum ab! Perspiciatis, rerum aliquid ex distinctio dolorem nihil vel illum quisquam voluptatibus totam temporibus
            magni, deleniti explicabo dolor nam harum nobis placeat enim animi nemo eaque suscipit blanditiis sed aperiam? Tempora autem, ea nostrum
            dolore neque eius error corporis dolorem quisquam facere sequi obcaecati tempore consectetur vel minus quaerat cumque est fugit, veritatis
            nesciunt nihil necessitatibus. Facere reiciendis consectetur veritatis veniam magnam minus quibusdam eum, qui cumque perferendis quo?
          </p>
          <p className="mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae repellendus impedit esse error odio porro distinctio maxime at? Ipsum
            possimus unde nihil. Animi vel, eum labore blanditiis cupiditate harum repudiandae itaque maxime nam minima ducimus iure facere optio
            beatae, dolores doloribus. Praesentium hic sunt dolores dolore, cumque voluptatum repudiandae cum, velit reprehenderit placeat veniam
            beatae qui quisquam debitis molestias laudantium totam facilis sapiente odio delectus ipsum animi porro esse. Distinctio ea tempora facere
            error mollitia odit sunt ratione consequatur voluptatum autem sequi, quisquam inventore eos id, iusto perspiciatis sed earum vitae! Illo
            maiores deleniti alias voluptas, quas quae asperiores, ratione earum quam voluptatum debitis esse facere ab placeat, exercitationem
            similique. Enim architecto voluptas sint aperiam nobis? Temporibus, possimus esse iure inventore nobis, rem perferendis magni architecto
            fugiat illum ad fugit ipsum ab! Perspiciatis, rerum aliquid ex distinctio dolorem nihil vel illum quisquam voluptatibus totam temporibus
            magni, deleniti explicabo dolor nam harum nobis placeat enim animi nemo eaque suscipit blanditiis sed aperiam? Tempora autem, ea nostrum
            dolore neque eius error corporis dolorem quisquam facere sequi obcaecati tempore consectetur vel minus quaerat cumque est fugit, veritatis
            nesciunt nihil necessitatibus. Facere reiciendis consectetur veritatis veniam magnam minus quibusdam eum, qui cumque perferendis quo?
          </p>
        </div>
        <div className="flex items-center justify-end gap-4">
          <span className="text-lg text-primary">{t("share-articles")}</span>
          <menu className="flex gap-2">
            <li className="social-media-icons group">
              <a href="#">
                <FaInstagram size={20} className="fill-primary group-hover:fill-light" />
              </a>
            </li>
            <li className="social-media-icons group">
              <a href="#">
                <FaLinkedin size={20} className="fill-primary group-hover:fill-light" />
              </a>
            </li>
            <li className="social-media-icons group">
              <a href="#">
                <FaXTwitter size={20} className="fill-primary group-hover:fill-light" />
              </a>
            </li>
            <li className="social-media-icons group">
              <a href="#">
                <FaLink size={20} className="fill-primary group-hover:fill-light" />
              </a>
            </li>
          </menu>
        </div>
      </div>
      <div className="w-full h-auto row-span-2">
        <div className="sticky space-y-12 top-4">
          <div className="flex items-center gap-4 pt-1">
            <i className="h-12 border-l-4 border-primary" />
            <h5 className="text-2xl font-semibold text-primary">{t("related-articles")}</h5>
          </div>
          <div className="space-y-8">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="flex items-center gap-4">
                <Img src="/temp-image-5.png" alt="temporary" className="overflow-hidden rounded-lg aspect-square w-60" cover />
                <div className="space-y-2">
                  <div className="flex gap-4 text-xs text-dark-gray">
                    <li className="flex gap-1">
                      <Img src={calendar} alt="calendar icon" className="size-4" />
                      22 January 2024
                    </li>
                    <li className="flex gap-1">
                      <Img src={carbon_tag} alt="calendar icon" className="size-4" />
                      Social
                    </li>
                  </div>
                  <h5 className="font-semibold text-dark-blue line-clamp-3">
                    Green Building Techniques Boost Energy Efficiency at Legacy Tower Construction
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
};
