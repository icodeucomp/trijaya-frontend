"use client";

import { DisplayThumbnail } from "@/components";

import { AiOutlineDownload, AiOutlineEye } from "react-icons/ai";

import { DocumentsTypes } from "@/types";

import { baseUrlApi, convertDate } from "@/utils";

interface CardCertificationProps extends DocumentsTypes {
  setSelected: (selected: string) => void;
  selected: string;
}

export const CardCertification = ({ selected, setSelected, slug, name, url, category, uploadedAt }: CardCertificationProps) => {
  return (
    <div className={`card-certification group ${selected === slug && "bg-primary"}`} onClick={() => setSelected(slug)}>
      <div className="preview-thumbnail">
        <DisplayThumbnail
          fileUrl={
            url ||
            "https://icodeu-storage.s3.ap-southeast-1.amazonaws.com/documents/award/surat-pernyataan-ambil-sertifikat-toeflmuhammad-helmy-fadlail-albab-1728069726585.pdf"
          }
        />
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
        <a href={`${baseUrlApi}/download?url=${url}`} download={name}>
          <AiOutlineDownload className={`size-5 sm:size-6 ${selected === slug ? "fill-light" : "fill-primary"}`} />
        </a>
      </div>
      <div className={`triangle hidden xl:block ${selected === slug ? "border-l-primary " : "border-l-transparent"}`}></div>
    </div>
  );
};
