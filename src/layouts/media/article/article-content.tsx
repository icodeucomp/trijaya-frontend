import { useTranslations } from "next-intl";

import { Breadcrumbs, Container, Img, Slider } from "@/components";

import { calendar, carbon_tag } from "@/icons";
import { FaInstagram, FaLink, FaLinkedin, FaXTwitter } from "react-icons/fa6";

const RelatedArticles = () => {
  return (
    <div className="flex items-center gap-4">
      <Img src="/temp-image-5.png" alt="temporary" className="overflow-hidden rounded-lg aspect-square w-60" cover />
      <div className="space-y-2">
        <div className="flex gap-2 text-xs lg:gap-4 text-dark-gray">
          <li className="flex gap-1">
            <Img src={calendar} alt="calendar icon" className="size-4" />
            22 January 2024
          </li>
          <li className="flex gap-1">
            <Img src={carbon_tag} alt="calendar icon" className="size-4" />
            Social
          </li>
        </div>
        <h5 className="text-sm font-semibold lg:text-base text-dark-blue line-clamp-3">
          Green Building Techniques Boost Energy Efficiency at Legacy Tower Construction
        </h5>
      </div>
    </div>
  );
};

export const ArticleContent = ({ slug }: { slug: string }) => {
  const t = useTranslations("media");

  return (
    <Container className="py-10 sm:py-16 md:py-20 grid grid-cols-1 lg:grid-cols-3 grid-rows-[auto,auto] gap-x-6 gap-y-4 xl:gap-16 text-dark-blue">
      <div className="w-full h-auto space-y-4 text-justify lg:col-span-2 sm:space-y-6 xl:space-y-8">
        <div className="hidden md:block">
          <Breadcrumbs
            items={[
              { name: "Media", path: "/media" },
              { name: slug, path: slug },
            ]}
          />
        </div>
        <h2 className="leading-snug heading">Green Building Techniques Boost Energy Efficiency at Legacy Tower Construction</h2>
        <div className="flex gap-4 text-xs sm:text-sm text-dark-gray">
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
      <div className="w-full h-auto text-justify lg:col-span-2">
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
        <div className="flex flex-col items-center justify-end gap-4 sm:flex-row">
          <span className="text-base sm:text-lg text-primary">{t("share-articles")}</span>
          <menu className="flex gap-2">
            <li className="social-media-icons group">
              <a href="#">
                <FaInstagram className="fill-primary size-4 sm:size-5 group-hover:fill-light" />
              </a>
            </li>
            <li className="social-media-icons group">
              <a href="#">
                <FaLinkedin className="fill-primary size-4 sm:size-5 group-hover:fill-light" />
              </a>
            </li>
            <li className="social-media-icons group">
              <a href="#">
                <FaXTwitter className="fill-primary size-4 sm:size-5 group-hover:fill-light" />
              </a>
            </li>
            <li className="social-media-icons group">
              <a href="#">
                <FaLink className="fill-primary size-4 sm:size-5 group-hover:fill-light" />
              </a>
            </li>
          </menu>
        </div>
      </div>
      <div className="w-full h-auto lg:row-span-2">
        <div className="sticky hidden space-y-12 lg:block top-4">
          <div className="flex items-center gap-4 pt-1">
            <i className="h-12 border-l-4 border-primary" />
            <h5 className="text-2xl font-semibold text-primary">{t("related-articles")}</h5>
          </div>
          <div className="space-y-8">
            {Array.from({ length: 6 }, (_, index) => (
              <RelatedArticles key={index} />
            ))}
          </div>
        </div>
        <div className="block my-10 lg:hidden">
          <Slider
            title={`${t("related-articles")}`}
            className="space-y-8"
            isBold
            slidesPerView={2}
            breakpoints={{ 0: { slidesPerView: 1 }, 660: { slidesPerView: 2 } }}
          >
            {Array.from({ length: 6 }, (_, index) => (
              <RelatedArticles key={index} />
            ))}
          </Slider>
        </div>
      </div>
    </Container>
  );
};
