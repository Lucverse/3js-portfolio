import { useState, useEffect, useCallback } from "react";
import type { Project } from "@/types/portfolio";
import { KEYPOINT_INTERVAL_MS, KEYPOINT_FADE_MS } from "@lib/constants";
import { getTechAnimDelay } from "@lib/utils";
import useKeyDown from "@hooks/useKeyDown";
import Icon from "@components/Icon/Icon";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [currentKeyPointIndex, setCurrentKeyPointIndex] = useState(0);
  const [textFade, setTextFade] = useState(true);
  const [imageFade, setImageFade] = useState(true);

  const keyPointsWithImages =
    project?.detailedDescription?.keyPoints?.filter((p) => p.image) ?? [];

  useEffect(() => {
    if (keyPointsWithImages.length <= 1) return;
    const interval = setInterval(() => {
      setTextFade(false);
      setImageFade(false);
      setTimeout(() => {
        setCurrentKeyPointIndex(
          (prevIndex) => (prevIndex + 1) % keyPointsWithImages.length,
        );
        setTextFade(true);
        setImageFade(true);
      }, KEYPOINT_FADE_MS);
    }, KEYPOINT_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [keyPointsWithImages.length]);

  const handleClose = useCallback(() => onClose(), [onClose]);
  useKeyDown("Escape", handleClose, !!project);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-99999 flex items-center justify-center p-4 bg-bg-dark/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div
        className="relative flex max-md:flex-col gap-10 bg-bg-dark border border-primary/20 rounded-custom max-w-240 w-full min-h-[500px] overflow-hidden p-10 max-md:p-6 shadow-[0_24px_80px_rgba(0,0,0,0.8)] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-6 right-8 text-[2rem] bg-primary/8 border border-primary/20 text-primary cursor-pointer z-10 flex items-center justify-center rounded-lg w-10 h-10 transition-all duration-300 ease hover:rotate-90 hover:bg-primary/15"
          onClick={handleClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="flex-1 flex flex-col gap-8 min-w-0 justify-between">
          <div className="flex flex-col gap-6">
            <h1 className="text-primary font-bold text-[clamp(2rem,4vw,3rem)] tracking-tight leading-none mt-4">
              {project.title}
            </h1>
            {project.detailedDescription?.desc && (
              <p className="text-[1rem] leading-[1.6] text-muted-color">
                {project.detailedDescription.desc}
              </p>
            )}
            <div className="flex flex-wrap gap-4 w-full">
              {project.techStack?.map(
                (tech, techIndex) =>
                  tech.icon &&
                  tech.name && (
                    <span
                      key={techIndex}
                      className="inline-flex cursor-pointer opacity-0 -translate-x-5 animate-slide-in-left"
                      style={{
                        animationDelay: getTechAnimDelay(techIndex),
                        animationFillMode: "forwards",
                      }}
                    >
                      <Icon
                        src={tech.icon}
                        alt={tech.name}
                        tooltip={tech.name}
                        size="w-5 md:w-6"
                        className="hover:-translate-y-0.5"
                      />
                    </span>
                  ),
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="w-fit padding-[0.25rem_0.75rem] text-bg-dark bg-primary rounded-[20px] text-[0.82rem] font-semibold border border-transparent transition-all duration-300 cursor-default hover:bg-transparent hover:border-primary hover:text-primary px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
            {(project.url || project.repo) && (
              <div className="flex gap-[0.8rem] flex-wrap">
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline color-primary border border-primary/35 padding-[0.4rem_0.9rem] rounded-md text-[0.9rem] transition-all duration-200 ease px-3 py-1.5 hover:bg-primary hover:text-bg-dark hover:border-primary"
                  >
                    🔗 Live
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline color-primary border border-primary/35 padding-[0.4rem_0.9rem] rounded-md text-[0.9rem] transition-all duration-200 ease px-3 py-1.5 hover:bg-primary hover:text-bg-dark hover:border-primary"
                  >
                    💻 Repo
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex-[0_0_40%] max-md:flex-none max-md:width-full min-w-0 margin-auto relative padding-[1rem] overflow-hidden h-100 max-md:min-h-75 max-md:h-75 bg-primary/3 p-4">
          {keyPointsWithImages.length > 0 ? (
            <>
              <img
                src={keyPointsWithImages[currentKeyPointIndex].image}
                alt={`${project.title} — ${keyPointsWithImages[currentKeyPointIndex].label}`}
                className="w-full h-[70%] object-contain rounded-lg absolute top-0 left-0 transition-opacity duration-800 ease-in-out"
                style={{ opacity: imageFade ? 1 : 0 }}
              />
              <div className="absolute bottom-5 left-4 right-4 flex flex-col items-center gap-2 z-10">
                <div
                  className="text-secondary text-[0.9rem] leading-normal mb-7 transition-opacity duration-800 ease-in-out"
                  style={{ opacity: textFade ? 1 : 0 }}
                >
                  {keyPointsWithImages[currentKeyPointIndex].label}
                </div>
                {keyPointsWithImages.length > 1 && (
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex justify-center gap-2">
                    {keyPointsWithImages.map((_, idx) => (
                      <span
                        key={idx}
                        className={`w-1.75 h-1.75 rounded-full transition-all duration-500 ease cursor-pointer ${idx === currentKeyPointIndex ? "bg-primary scale-[1.25]" : "bg-primary/25"}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="absolute top-0 left-0 w-full h-[70%] flex justify-center items-center bg-primary/5 text-muted-color text-[1rem] rounded-lg">
              No Preview Available
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
