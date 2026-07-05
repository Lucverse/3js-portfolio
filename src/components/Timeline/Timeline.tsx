import React from "react";
import type { Project } from "../../types/portfolio";
import TimelineGrid from "./TimelineGrid";
import { PROJECTS_PAGE_SIZE } from "../../lib/constants";
import Button from "@components/Button/Button";

interface TimelineProps {
  projects: Project[];
}

const Timeline: React.FC<TimelineProps> = ({ projects }) => {
  const [listedProjects, setListedProjects] = React.useState<Project[]>(
    projects.slice(0, PROJECTS_PAGE_SIZE),
  );

  const loadMore = () => {
    const next = projects.slice(
      listedProjects.length,
      listedProjects.length + PROJECTS_PAGE_SIZE,
    );
    setListedProjects([...listedProjects, ...next]);
    setTimeout(() => {
      window.scrollBy({
        top: 250,
        behavior: "smooth",
      });
    }, 80);
  };

  const showLess = () => {
    setListedProjects(projects.slice(0, PROJECTS_PAGE_SIZE));
    const el = document.getElementById("projects");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div
        className="timeline-main overflow-hidden rounded-custom bg-linear-to-b from-primary/7 to-transparent backdrop-blur-[0.5px] max-md:p-2 w-full"
        id="projects"
      >
        {listedProjects.map((project, index) => (
          <TimelineGrid
            key={`${project.title}-${index}`}
            index={index}
            project={project}
            animate={index >= PROJECTS_PAGE_SIZE}
          />
        ))}
      </div>

      {listedProjects.length < projects.length ? (
        <Button onClick={loadMore} label="Load More ↓" />
      ) : (
        <Button onClick={showLess} label="Show Less ↑" />
      )}
    </div>
  );
};

export default Timeline;
