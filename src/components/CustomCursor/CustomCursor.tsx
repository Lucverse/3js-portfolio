import React, { useEffect, useRef, useState } from "react";

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [isHovering, setIsHovering] = useState(false);
  const [tooltipText, setTooltipText] = useState("");
  const [lastTooltipText, setLastTooltipText] = useState("");
  const [tooltipRect, setTooltipRect] = useState<DOMRect | null>(null);
  const [tooltipDir, setTooltipDir] = useState<string>("top");
  const [isHidden, setIsHidden] = useState(true);
  const [inProjectsGrid, setInProjectsGrid] = useState(false);
  const [inLightBg, setInLightBg] = useState(false);

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsHidden(false);

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
      if (isHidden) setIsHidden(false);

      const target = e.target as HTMLElement | null;
      if (target) {
        const inProjects = target.closest("#projects");
        const inModal = target.closest("[role='dialog']");
        setInProjectsGrid(!!(inProjects && !inModal));

        const inAbout = target.closest("#about");
        setInLightBg(!!(inAbout && !inModal));
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target) {
        const inProjects = target.closest("#projects");
        const inModal = target.closest("[role='dialog']");
        setInProjectsGrid(!!(inProjects && !inModal));

        const inAbout = target.closest("#about");
        setInLightBg(!!(inAbout && !inModal));

        const interactive = target.closest(
          "a, button, [role='button'], [data-tooltip], [data-cursor-tooltip], input, select, textarea, .cursor-pointer",
        );
        setIsHovering(!!interactive);

        const tooltipEl = target.closest(
          "[data-cursor-tooltip], [data-tooltip]",
        ) as HTMLElement | null;
        if (tooltipEl) {
          const text =
            tooltipEl.getAttribute("data-cursor-tooltip") ||
            tooltipEl.getAttribute("data-tooltip") ||
            "";
          setTooltipText(text);
          setLastTooltipText(text);
          setTooltipRect(tooltipEl.getBoundingClientRect());
          setTooltipDir(
            tooltipEl.getAttribute("data-tooltip-dir") ||
              tooltipEl.getAttribute("data-tooltip-direction") ||
              "top",
          );
        } else {
          setTooltipText("");
        }
      }
    };

    const onMouseLeave = () => {
      setIsHidden(true);
    };

    const onMouseEnter = () => {
      setIsHidden(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    let animationFrameId: number;

    const render = () => {
      const ease = 0.16;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHidden]);

  const getTooltipStyles = () => {
    if (!tooltipRect) return { opacity: 0 };

    const dist = 8; // distance from the element boundary in pixels
    let x = 0;
    let y = 0;
    let transformStr = "";

    switch (tooltipDir) {
      case "top":
        x = tooltipRect.left + tooltipRect.width / 2;
        y = tooltipRect.top - dist;
        transformStr = "translate(-50%, -100%)";
        break;
      case "bottom":
        x = tooltipRect.left + tooltipRect.width / 2;
        y = tooltipRect.bottom + dist;
        transformStr = "translate(-50%, 0)";
        break;
      case "left":
        x = tooltipRect.left - dist;
        y = tooltipRect.top + tooltipRect.height / 2;
        transformStr = "translate(-100%, -50%)";
        break;
      case "right":
        x = tooltipRect.right + dist;
        y = tooltipRect.top + tooltipRect.height / 2;
        transformStr = "translate(0, -50%)";
        break;
      default:
        x = tooltipRect.left + tooltipRect.width / 2;
        y = tooltipRect.top - dist;
        transformStr = "translate(-50%, -100%)";
    }

    return {
      position: "fixed" as const,
      left: `${x}px`,
      top: `${y}px`,
      transform: transformStr,
      willChange: "left, top, transform",
    };
  };

  const getEntryTransitionClass = () => {
    if (!tooltipText) {
      switch (tooltipDir) {
        case "top":
          return "opacity-0 translate-y-2 scale-95";
        case "bottom":
          return "opacity-0 -translate-y-2 scale-95";
        case "left":
          return "opacity-0 translate-x-2 scale-95";
        case "right":
          return "opacity-0 -translate-x-2 scale-95";
        default:
          return "opacity-0 translate-y-2 scale-95";
      }
    }
    return "opacity-100 translate-x-0 translate-y-0 scale-100";
  };

  if (isHidden) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-9999999">
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-9999999 transition-[width,height,background-color,opacity] ease-out ${
          inProjectsGrid
            ? "w-4 h-4 bg-primary/0 opacity-0 duration-300"
            : `w-1.5 h-1.5 opacity-100 duration-100 ${inLightBg ? "bg-bg-dark" : "bg-primary"}`
        }`}
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none -translate-x-1/2 -translate-y-1/2 z-9999998 transition-[width,height,background-color,border-color,opacity] ease-out ${
          inProjectsGrid
            ? "w-20 h-20 bg-primary/0 border-primary/0 opacity-0 duration-300"
            : isHovering
              ? `${inLightBg ? "bg-bg-dark/15 border-bg-dark/65 shadow-[0_0_12px_rgba(15,15,16,0.15)]" : "bg-primary/10 border-primary/65 shadow-[0_0_12px_rgba(191,174,147,0.25)]"} w-11 h-11 opacity-100 duration-300`
              : `${inLightBg ? "border-bg-dark/45" : "border-primary/45"} w-7 h-7 bg-transparent opacity-100 duration-300`
        }`}
        style={{ willChange: "transform" }}
      />
      {/* Tooltip wrapper that tracks target rect position */}
      {tooltipRect && (
        <div
          className="fixed pointer-events-none z-9999999"
          style={getTooltipStyles()}
        >
          <div
            className={`px-2.5 py-1 rounded-md text-[10px] md:text-xs font-semibold border backdrop-blur-md transition-all duration-200 pointer-events-none ease-out whitespace-nowrap ${
              inLightBg
                ? "border-bg-dark bg-bg-dark text-primary shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                : "border-primary bg-primary text-bg-dark shadow-[0_4px_16px_rgba(0,0,0,0.35)]"
            } ${getEntryTransitionClass()}`}
          >
            {tooltipText || lastTooltipText}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCursor;
