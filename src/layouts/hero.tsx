import { Background } from "@/components";

import { TemplateTypes } from "@/types";

export const Hero = ({ title, description, pathImg }: TemplateTypes) => {
  return (
    <Background src={pathImg} className="flex items-center min-h-400" parentClassName="filter">
      <div className="max-w-2xl space-y-4 text-light">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <p className="text-lg">{description}</p>
      </div>
    </Background>
  );
};
