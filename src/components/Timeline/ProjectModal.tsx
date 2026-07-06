import { useCallback } from "react";
import type { Project } from "@/types/portfolio";
import useKeyDown from "@hooks/useKeyDown";
import Tags from "@components/Tags/Tags";
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
      {/* Modal card */}
      <div
        className="relative flex flex-col lg:flex-row max-w-5xl w-full max-h-[92vh] overflow-y-auto lg:overflow-hidden rounded-2xl shadow-[0_32px_100px_rgba(0,0,0,0.9)] animate-scale-up"
        style={{
          background:
            "linear-gradient(135deg, rgba(20,20,22,0.98) 0%, rgba(15,15,16,0.99) 100%)",
          border: "1px solid rgba(191,174,147,0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Left panel: project info ── */}
        <div className="flex flex-col gap-6 flex-initial lg:flex-1 min-w-0 p-8 lg:p-10 overflow-visible lg:overflow-y-auto">
          {/* Header row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-2">
              {/* Title */}
              <h2
                className="font-bold leading-none tracking-tight"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                  color: "var(--color-primary)",
                }}
              >
                {project.title}
              </h2>

              {/* Role + Duration */}
              {(project.role || project.duration) && (
                <Text variant="muted" as="p" className="font-medium">
                  {[project.role, project.duration].filter(Boolean).join(" · ")}
                </Text>
              )}
            </div>

            {/* Close button */}
            <CloseButton onClick={handleClose} ariaLabel="Close modal" />
          </div>

          {/* Divider */}
          <div
            className="w-full h-px"
            style={{ background: "rgba(191,174,147,0.1)" }}
          />

          {/* Description */}
          {project.detailedDescription?.desc && (
            <Text
              variant="body"
              className="text-[0.95rem] leading-[1.75] text-white/80"
            >
              {project.detailedDescription.desc}
            </Text>
          )}

          {/* Tech stack */}
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
