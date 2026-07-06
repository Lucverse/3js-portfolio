import { useState, useEffect, useCallback } from "react";
import type { KeyPoint } from "@/types/portfolio";
import { KEYPOINT_INTERVAL_MS, KEYPOINT_FADE_MS } from "@lib/constants";

interface ProjectCarouselProps {
  keyPoints: KeyPoint[];
  resetKey?: string | number;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({
  keyPoints,
  resetKey,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  // Reset when the parent project changes
  useEffect(() => {
    setCurrentIndex(0);
    setFade(true);
  }, [resetKey]);

  const goTo = useCallback(
    (idx: number) => {
      if (idx === currentIndex) return;
      setFade(false);
      setTimeout(() => {
        setCurrentIndex(idx);
        setFade(true);
      }, KEYPOINT_FADE_MS);
    },
    [currentIndex],
  );

  if (keyPoints.length === 0) return null;

  const current = keyPoints[currentIndex];

  return (
    <div
      className="relative flex flex-col w-full lg:w-[42%] shrink-0 overflow-hidden border-t lg:border-t-0 lg:border-l border-[rgba(191,174,147,0.1)] bg-[rgba(191,174,147,0.03)]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Image area */}
      <div className="relative h-72 mx-auto flex items-center justify-center p-6">
        {/* Subtle gradient overlay at top */}
        <div className="absolute inset-x-0 top-0 h-16 pointer-events-none z-10 bg-gradient-to-b from-bg-dark/50 to-transparent" />
        {/* Subtle gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-10 bg-gradient-to-t from-bg-dark/95 to-transparent" />
        {/* Image */}
        <img
          key={currentIndex}
          src={current.image}
          alt={current.label}
          className={`w-full h-full object-contain rounded-xl max-h-full transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Caption + dots */}
      <div className="relative z-20 flex flex-col items-center gap-4 px-6 pb-6 pt-2">
        {/* Caption */}
        <p
          className={`text-center text-[0.82rem] leading-[1.6] line-clamp-3 text-secondary transition-opacity duration-500 ease-in-out ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {current.label}
        </p>

        {/* Dot navigation */}
        {keyPoints.length > 1 && (
          <div className="flex items-center gap-2">
            {keyPoints.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className={`cursor-pointer transition-all duration-300 rounded-full h-1.5 border-none p-0 ${
                  idx === currentIndex
                    ? "w-5 bg-primary"
                    : "w-1.5 bg-[rgba(191,174,147,0.3)]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Progress bar */}
      {keyPoints.length > 1 && (
        <div
          className={`absolute bottom-0 left-0 h-0.5 rounded-full w-full origin-left bg-primary ${
            isPaused
              ? "[animation-play-state:paused]"
              : "[animation-play-state:running]"
          }`}
          style={{
            animation: `progress-bar ${KEYPOINT_INTERVAL_MS}ms linear forwards`,
          }}
          key={`${currentIndex}-progress`}
          onAnimationEnd={() => {
            setFade(false);
            setTimeout(() => {
              setCurrentIndex((prev) => (prev + 1) % keyPoints.length);
              setFade(true);
            }, KEYPOINT_FADE_MS);
          }}
        />
      )}
    </div>
  );
};

export default ProjectCarousel;
