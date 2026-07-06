import React from "react";
import type { Project } from "@/types/portfolio";
import {
  calcMousePosition,
  getRadialGradient,
  getHoverBoxShadow,
  getTechAnimDelay,
} from "@lib/utils";
import Icon from "@components/Icon/Icon";
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
      className={`grid grid-cols-[1fr_1.5fr] max-md:grid-cols-1 w-full gap-8 md:gap-16 p-6 md:py-8 md:px-12 max-md:p-6 text-secondary min-h-37.5 cursor-pointer border-b border-primary/50 last:border-b-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        animate ? "animate-slide-up opacity-0" : ""
      }`}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: isHovered
          ? getRadialGradient(mousePosition.x, mousePosition.y)
          : "transparent",
        boxShadow: getHoverBoxShadow(isHovered),
        ...(animate && {
          animationDelay: `${(index - PROJECTS_PAGE_SIZE) * 0.12}s`,
          animationFillMode: "forwards",
        }),
      }}
    >
      <div className="flex flex-col gap-4 justify-center">
        <h2 className="text-secondary font-semibold text-[clamp(1.5rem,3vw,2rem)]">
          {project.title}
        </h2>
        <p className="text-[clamp(0.9rem,1.5vw,1.1rem)] leading-[0.8] opacity-35 font-light text-secondary">
          ({project.duration})
        </p>
      </div>
      <div className="flex items-center relative text-muted-color">
        <p className="text-[1rem] leading-[1.4] text-muted-color">
          {project.description}
        </p>
        <div className="absolute flex flex-wrap flex-row-reverse gap-[0.8rem] w-full -bottom-4 max-md:-top-12 max-md:bottom-auto">
          {project.techStack.map(
            (tech, techIndex) =>
              tech.icon &&
              tech.name && (
                <span
                  key={techIndex}
                  className="inline-flex opacity-0 translate-x-5 animate-slide-in-right"
                  style={{
                    animationDelay: getTechAnimDelay(techIndex),
                  }}
                >
                  <Icon
                    src={tech.icon}
                    alt={tech.name}
                    tooltip={tech.name}
                    size="w-5 md:w-6"
                    disableHover={true}
                  />
                </span>
              ),
          )}
        </div>
      </div>
    </div>
  );
};

export default TimelineGrid;
