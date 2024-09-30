import { ChangeEvent } from "react";

export interface InputBusinessProps {
  slug: string;
  title: string;
  description: string;
  images: string[];
  uploading: boolean;
  onInputChange: (slug: string, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImagesChange: (slug: string, e: ChangeEvent<HTMLInputElement>) => void;
  onDelete: (slug: string) => void;
  handleDeleteImage: (slug: string, index: number) => void;
  handleSubmitImage: (slug: string) => void;
  handleSubmitForm: (slug: string) => void;
  loadData?: boolean;
}
