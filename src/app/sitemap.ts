import type { MetadataRoute } from "next";

import { baseUrlApi } from "@/utils";

import { BusinessesTypes } from "@/types";

interface DataBusinessesName {
  data: BusinessesTypes[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const response = await fetch(`${baseUrlApi}/business/metadata`);
  const { data }: DataBusinessesName = await response.json();

  const businessEntries = data.map((sector) => ({
    url: `https://www.trijayaberkahmandiri.id/business/sector/${sector.slug}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `https://www.trijayaberkahmandiri.id/en/business/sector/${sector.slug}`,
        id: `https://www.trijayaberkahmandiri.id/id/business/sector/${sector.slug}`,
      },
    },
  }));

  return [
    {
      url: "https://www.trijayaberkahmandiri.id",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://www.trijayaberkahmandiri.id/en",
          id: "https://www.trijayaberkahmandiri.id/id",
        },
      },
    },
    {
      url: "https://www.trijayaberkahmandiri.id/profile",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://www.trijayaberkahmandiri.id/en/profile",
          id: "https://www.trijayaberkahmandiri.id/id/profile",
        },
      },
    },
    {
      url: "https://www.trijayaberkahmandiri.id/profile/certification",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://www.trijayaberkahmandiri.id/en/profile/certification",
          id: "https://www.trijayaberkahmandiri.id/id/profile/certification",
        },
      },
    },
    {
      url: "https://www.trijayaberkahmandiri.id/media",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://www.trijayaberkahmandiri.id/en/media",
          id: "https://www.trijayaberkahmandiri.id/id/media",
        },
      },
    },
    {
      url: "https://www.trijayaberkahmandiri.id/contact-us",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://www.trijayaberkahmandiri.id/en/contact-us",
          id: "https://www.trijayaberkahmandiri.id/id/contact-us",
        },
      },
    },
    {
      url: "https://www.trijayaberkahmandiri.id/career",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://www.trijayaberkahmandiri.id/en/career",
          id: "https://www.trijayaberkahmandiri.id/id/career",
        },
      },
    },
    ...businessEntries,
  ];
}
