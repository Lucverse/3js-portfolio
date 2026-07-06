import { useCallback } from "react";
import type { Project } from "@/types/portfolio";
import useKeyDown from "@hooks/useKeyDown";
import Text from "@components/Text/Text";
import CloseButton from "@components/Button/CloseButton";
import TechStack from "@components/Icon/TechStack";
import ProjectCarousel from "@components/Carousel/ProjectCarousel";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const keyPointsWithImages =
    project?.detailedDescription?.keyPoints?.filter((p) => p.image) ?? [];

  const handleClose = useCallback(() => onClose(), [onClose]);
  useKeyDown("Escape", handleClose, !!project);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-99999 flex items-center justify-center p-4 sm:p-6 bg-bg-dark/80 backdrop-blur-lg animate-fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div
        className="relative flex flex-col lg:flex-row max-w-5xl w-full max-h-[92vh] overflow-y-auto lg:overflow-hidden rounded-2xl shadow-[0_32px_100px_rgba(0,0,0,0.9)] animate-scale-up"
        style={{
          background:
            "linear-gradient(135deg, rgba(20,20,22,0.98) 0%, rgba(15,15,16,0.99) 100%)",
          border: "1px solid rgba(191,174,147,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-6 flex-initial lg:flex-1 min-w-0 p-8 lg:p-10 overflow-visible lg:overflow-y-auto">
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              <Text as="h2" size="3xl" weight="bold" color="primary">
                {project.title}
              </Text>

              {(project.role || project.duration) && (
                <Text as="p" size="sm" weight="medium" color="muted">
                  {[project.role, project.duration].filter(Boolean).join(" · ")}
                </Text>
              )}
            </div>

            <CloseButton onClick={handleClose} ariaLabel="Close modal" />
          </div>

          <div
            className="w-full h-px"
            style={{ background: "rgba(191,174,147,0.1)" }}
          />

          {project.detailedDescription?.desc && (
            <Text
              as="p"
              size="base"
              color="white"
              className="opacity-80 leading-relaxed"
            >
              {project.detailedDescription.desc}
            </Text>
          )}

          {project.techStack && project.techStack.length > 0 && (
            <TechStack items={project.techStack} className="pt-2" />
          )}
        </div>

        {keyPointsWithImages.length > 0 && (
          <ProjectCarousel
            keyPoints={keyPointsWithImages}
            resetKey={project.title}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
