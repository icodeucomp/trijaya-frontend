import { Background } from "@/components";

import { TemplateTypes } from "@/types";

export const Hero = ({ title, description, pathImg }: TemplateTypes) => {
  return (
    <Background src={pathImg} className="min-h-400 flex items-center filter">
      <div className="space-y-4 text-light max-w-2xl">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
    </Background>
  );
};
