import React from "react";
import type { Project } from "@/types/portfolio";
import {
  calcMousePosition,
  getHoverBoxShadow,
  getTechAnimDelay,
} from "@lib/utils";
import Icon from "@components/Icon/Icon";
import Text from "@components/Text/Text";
import Tooltip from "@components/Tooltip/Tooltip";
import { PROJECTS_PAGE_SIZE } from "@lib/constants";

interface TimelineGridProps {
  project: Project;
  index: number;
  animate?: boolean;
  onSelect: () => void;
}

const TimelineGrid: React.FC<TimelineGridProps> = ({
  project,
  index,
  animate = false,
  onSelect,
}) => {
  const [mousePosition, setMousePosition] = React.useState({
    x: "50%",
    y: "50%",
  });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition(calcMousePosition(e));
    setIsHovered(true);
  };

  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      className={`relative overflow-hidden grid grid-cols-[1fr_1.5fr] max-md:grid-cols-1 w-full gap-8 md:gap-16 p-6 md:py-8 md:px-12 max-md:p-6 text-secondary min-h-37.5 cursor-pointer border-b border-primary/50 last:border-b-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        animate ? "animate-slide-up opacity-0" : ""
      }`}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: "transparent",
        boxShadow: getHoverBoxShadow(isHovered),
        ...(animate && {
          animationDelay: `${(index - PROJECTS_PAGE_SIZE) * 0.12}s`,
          animationFillMode: "forwards",
        }),
      }}
    >
      <div
        className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-[width,height,opacity] duration-300 ease-out z-0"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: isHovered ? "380px" : "0px",
          height: isHovered ? "380px" : "0px",
          opacity: isHovered ? 1 : 0,
          background: "radial-gradient(circle, rgba(191, 174, 147, 0.24) 0%, rgba(191, 174, 147, 0.09) 40%, transparent 70%)",
        }}
      />
      <div className="flex flex-col gap-4 justify-center z-10">
        <Text as="h2" size="2xl" weight="semibold" color="secondary">
          {project.title}
        </Text>
        <Text
          as="p"
          size="sm"
          weight="light"
          color="secondary"
          className="leading-[0.8] opacity-35"
        >
          ({project.duration})
        </Text>
      </div>
      <div className="flex items-center relative text-muted-color">
        <Text as="p" size="base" color="muted" className="leading-[1.4]">
          {project.description}
        </Text>
        <div className="absolute flex flex-wrap flex-row-reverse gap-[0.8rem] w-full -bottom-4 max-md:-top-12 max-md:bottom-auto">
          {(() => {
            const filteredTech = project.techStack.filter(
              (tech) => tech.icon && tech.name,
            );
            const hasMore = filteredTech.length > 4;
            const displayLimit = hasMore ? 3 : 4;
            const displayTech = filteredTech.slice(0, displayLimit);
            const remainingCount = filteredTech.length - 3;

            return (
              <>
                {hasMore && (
                  <Tooltip
                    content={filteredTech
                      .slice(3)
                      .map((t) => t.name)
                      .join(", ")}
                    direction="left"
                  >
                    <span
                      className="inline-flex opacity-0 translate-x-5 animate-slide-in-right items-center justify-center rounded-full border border-primary/30 bg-primary/10 backdrop-blur-[2px] text-primary text-[9px] md:text-[10px] font-bold w-5 md:w-6 h-5 md:h-6 aspect-square select-none cursor-help"
                      style={{
                        animationDelay: getTechAnimDelay(0),
                      }}
                    >
                      +{remainingCount}
                    </span>
                  </Tooltip>
                )}
                {displayTech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="inline-flex opacity-0 translate-x-5 animate-slide-in-right"
                    style={{
                      animationDelay: getTechAnimDelay(
                        hasMore ? techIndex + 1 : techIndex,
                      ),
                    }}
                  >
                    <Icon
                      src={tech.icon!}
                      alt={tech.name!}
                      tooltip={tech.name!}
                      size="w-5 md:w-6"
                      disableHover={true}
                    />
                  </span>
                ))}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default TimelineGrid;
