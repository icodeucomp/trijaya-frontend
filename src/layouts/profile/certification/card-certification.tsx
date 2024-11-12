"use client";

import { useGetApi } from "@/hooks";

import { DisplayThumbnail } from "@/components";

import { AiOutlineDownload, AiOutlineEye } from "react-icons/ai";

import { DEFAULT_FILE } from "@/static";

import { convertDate } from "@/utils";

import { DocumentsTypes } from "@/types";

interface CardCertificationProps extends DocumentsTypes {
  setSelected: (selected: string) => void;
  selected: string;
}

export const CardCertification = ({ selected, setSelected, slug, name, url, category, uploadedAt }: CardCertificationProps) => {
  const { response: resUrl, error } = useGetApi<string>({ path: `/download?url=${url}` });

  return (
    <div className={`card-certification group ${selected === slug && "bg-primary"}`} onClick={() => setSelected(slug)}>
      <div className="preview-thumbnail">
        <DisplayThumbnail fileUrl={url || DEFAULT_FILE} />
      </div>
      <div className="space-y-2">
        <h5 className={`text-sm sm:text-base md:text-lg font-semibold ${selected === slug ? "text-light" : "text-primary"}`}>{name}</h5>
        <p className={`text-xs sm:text-sm line-clamp-3 ${selected === slug ? "text-light" : "text-gray"}`}>{category}</p>
        <p className={`text-xxs sm:text-xs font-semibold ${selected === slug ? "text-light" : "text-gray"}`}>{convertDate(uploadedAt)}</p>
      </div>
      <div className="absolute flex items-center gap-4 right-6 bottom-5 sm:bottom-3">
        <a href={url} target="_blank" rel="noopener">
          <AiOutlineEye className={`size-5 sm:size-6 ${selected === slug ? "fill-light" : "fill-primary"}`} />
        </a>
        {!error && (
          <a href={resUrl || "/profile/certification"} download={name}>
            <AiOutlineDownload className={`size-5 sm:size-6 ${selected === slug ? "fill-light" : "fill-primary"}`} />
          </a>
        )}
      </div>
      <div className={`triangle hidden xl:block ${selected === slug ? "border-l-primary " : "border-l-transparent"}`}></div>
    </div>
  );
};
