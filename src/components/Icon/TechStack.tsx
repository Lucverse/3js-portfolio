import React from "react";
import type { TechItem } from "@/types/portfolio";
import { getTechAnimDelay } from "@lib/utils";
import Icon from "@components/Icon/Icon";
import Text from "@components/Text/Text";

interface TechStackProps {
  items: TechItem[];
  label?: string | false;
  className?: string;
}
const TechStack: React.FC<TechStackProps> = ({
  items,
  label = "Tech Stack",
  className = "",
}) => {
  const withIcons = items.filter((t) => t.icon && t.name);
  if (withIcons.length === 0) return null;

  return (
    <div className={["flex flex-col gap-3", className].filter(Boolean).join(" ")}>
      {label !== false && (
        <Text
          as="span"
          size="xs"
          weight="semibold"
          color="muted"
          uppercase
          className="tracking-[0.12em]"
        >
          {label}
        </Text>
      )}
      <div className="flex flex-wrap gap-3 pl-3">
        {withIcons.map((tech, idx) => (
          <span
            key={`${tech.name}-${idx}`}
            className="inline-flex opacity-0 -translate-x-3 animate-slide-in-left"
            style={{
              animationDelay: getTechAnimDelay(idx),
              animationFillMode: "forwards",
            }}
          >
            <Icon
              src={tech.icon!}
              alt={tech.name}
              tooltip={tech.name}
              size="w-5 md:w-6"
              className="hover:-translate-y-1 transition-transform duration-200"
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
