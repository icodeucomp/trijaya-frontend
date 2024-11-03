import { useTranslations } from "next-intl";

import { Hero } from "@/layouts";
import { Albums, ArticlesGallery, ProjectsGallery } from "@/layouts/media";

export default function Media() {
  const t = useTranslations("media.hero");

  return (
    <section className="overflow-x-hidden">
      <Hero pathImg="/images/media-header.webp" title={`${t("title")}`} description={`${t("description")}`} />
      <ProjectsGallery />
      <Albums />
      <ArticlesGallery />
    </section>
  );
}
