import { Background, Motion } from "@/components";

import { TemplateTypes } from "@/types";

export const Hero = ({ title, description, pathImg }: TemplateTypes) => {
  return (
    <Background src={pathImg} className="items-center min-h-400 max-w-screen-xl px-4 sm:px-8" parentClassName="filter">
      <div className="max-w-2xl space-y-4 text-light">
        <Motion tag="h1" initialX={-50} animateX={0} duration={0.4} className="text-3xl font-semibold md:text-4xl">
          {title}
        </Motion>
        <Motion tag="p" initialX={-50} animateX={0} duration={0.8} delay={0.4} className="text-base sm:text-lg">
          {description}
        </Motion>
      </div>
    </Background>
  );
};
