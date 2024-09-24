import { useTranslations } from "next-intl";

import { Hero } from "@/layouts";
import { ArticlesGallery, ProjectActivities } from "@/layouts/media";

export default function Media() {
  const t = useTranslations("media.hero");

  return (
    <>
      <Hero pathImg="/images/media-header.webp" title={`${t("title")}`} description={`${t("description")}`} />
      <ProjectActivities />
      <ArticlesGallery />
    </>
  );
}
