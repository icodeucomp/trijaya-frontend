import { Link } from "@/i18n/routing";
import { BreadcrumbsProps } from "@/types";
import React from "react";

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
  return (
    <ol className="flex gap-x-1" aria-label="breadcrumbs">
      {items.map((item, index) => (
        <li key={item.path} className="flex items-center">
          {index !== 0 && <span className="mr-1 font-semibold text-gray">/</span>}
          {index === items.length - 1 ? (
            <span className="font-medium text-gray line-clamp-1">{item.name}</span>
          ) : (
            <Link href={item.path} className="font-medium text-primary hover:text-primary/90">
              {item.name}
            </Link>
          )}
        </li>
      ))}
    </ol>
  );
};
