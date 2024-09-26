import { ChangeEvent } from "react";

export interface InputBusinessProps {
  id: number;
  title: string;
  description: string;
  images: File[];
  onInputChange: (id: number, e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImagesChange: (id: number, files: FileList | null) => void;
  onDelete: (id: number) => void;
}
