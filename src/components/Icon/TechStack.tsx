import React from "react";
import type { TechItem } from "@/types/portfolio";
import { getTechAnimDelay } from "@lib/utils";
import Icon from "@components/Icon/Icon";
import Text from "@components/Text/Text";

interface TechStackProps {
  items: TechItem[];
  /** Shown above the icons. Defaults to "Tech Stack". Pass false to hide. */
  label?: string | false;
  className?: string;
}

/**
 * Renders a labelled row of technology icons with a staggered slide-in animation.
 * Extracted from ProjectModal so it can be reused anywhere a tech list is needed.
 */
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
          variant="muted"
          as="span"
          className="uppercase tracking-[0.12em] font-semibold"
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
