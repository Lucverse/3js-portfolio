import React, { useEffect, useRef, useState, useCallback } from "react";

// Supported cursor modes (title merged into text)
type CursorMode =
  | "default"
  | "button"
  | "text"
  | "icon"
  | "canvas"
  | "nav"
  | "card";

// Tags that auto-trigger the text (I-beam) cursor
const TEXT_TAGS = new Set([
  "P",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "SPAN",
  "LI",
  "LABEL",
  "STRONG",
  "EM",
  "BLOCKQUOTE",
  "DT",
  "DD",
]);

const CustomCursor: React.FC = () => {
  // ─── Element refs ─────────────────────────────────────────────────────────
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const orbitRef = useRef<HTMLDivElement | null>(null);
  const crosshairHRef = useRef<HTMLDivElement | null>(null);
  const crosshairVRef = useRef<HTMLDivElement | null>(null);
  const crosshairRingRef = useRef<HTMLDivElement | null>(null);
  const ibeamRef = useRef<HTMLDivElement | null>(null);

  // ─── Position refs (mutated in RAF, never trigger re-renders) ─────────────
  const mousePos = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  // Stores the bounding rect of the currently-hovered nav link so the ring
  // can snap to its exact position rather than following the lagged cursor.
  const navRectRef = useRef<DOMRect | null>(null);
  // Mirror of `mode` state that's readable inside the RAF closure without
  // going stale (avoids adding mode to the effect dependency array).
  const modeRef = useRef<CursorMode>("default");

  // ─── React state ──────────────────────────────────────────────────────────
  const [isHidden, setIsHidden] = useState(true);
  const [mode, setMode] = useState<CursorMode>("default");
  const [isHovering, setIsHovering] = useState(false);
  const [inProjectsGrid, setInProjectsGrid] = useState(false);
  const [inLightBg, setInLightBg] = useState(false);

  // Random orbit-start angle: regenerated each time the icon mode is entered
  const [orbitDelay, setOrbitDelay] = useState("0s");

  // Nav link rect — drives the ring's exact width and position for the underline
  const [navRect, setNavRect] = useState<DOMRect | null>(null);

  // Tooltip
  const [tooltipText, setTooltipText] = useState("");
  const [lastTooltipText, setLastTooltipText] = useState("");
  const [tooltipRect, setTooltipRect] = useState<DOMRect | null>(null);
  const [tooltipDir, setTooltipDir] = useState<string>("top");

  // ─── Randomise orbit start when entering icon mode ─────────────────────────
  useEffect(() => {
    if (mode === "icon") {
      // Negative delay makes the animation start mid-cycle → random starting
      // position on the orbit ring each time the user hovers a new icon.
      setOrbitDelay(`-${(Math.random() * 1.4).toFixed(3)}s`);
    }
  }, [mode]);

  // ─── Resolve cursor mode ───────────────────────────────────────────────────
  const resolveMode = useCallback((target: HTMLElement | null): CursorMode => {
    if (!target) return "default";

    // Explicit data-cursor attribute always wins (checks nearest ancestor)
    const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
    if (cursorEl) {
      return (cursorEl.getAttribute("data-cursor") as CursorMode) || "default";
    }

    // Auto-detect text elements by tag name (only the element itself, not its
    // container div – this is why we check target.tagName directly).
    if (TEXT_TAGS.has(target.tagName)) {
      return "text";
    }

    return "default";
  }, []);

  // ─── Event setup + RAF ────────────────────────────────────────────────────
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
      if (!target) return;

      const inProjects = target.closest("#projects");
      const inModal = target.closest("[role='dialog']");
      setInProjectsGrid(!!(inProjects && !inModal));

      const inAbout = target.closest("#about");
      setInLightBg(!!(inAbout && !inModal));

      const newMode = resolveMode(target);
      setMode(newMode);
      modeRef.current = newMode;

      // If nav mode: capture the <a> element's rect so the ring can snap to it
      if (newMode === "nav") {
        const navEl = target.closest(
          "[data-cursor='nav']",
        ) as HTMLElement | null;
        const rect = navEl ? navEl.getBoundingClientRect() : null;
        navRectRef.current = rect;
        setNavRect(rect);
      } else {
        navRectRef.current = null;
        setNavRect(null);
      }

      // Generic interactive-hover flag (drives default ring expansion)
      const interactive = target.closest(
        "a, button, [role='button'], [data-tooltip], [data-cursor-tooltip], input, select, textarea, .cursor-pointer",
      );
      setIsHovering(!!interactive);

      // Tooltip
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
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    // ─── RAF loop: ONLY positions, never styles ──────────────────────────
    let rafId: number;

    const render = () => {
      const ease = 0.12;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      // Dot: instant (mousePos)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }
      // Ring: lagged by default; snaps instantly for nav mode
      if (ringRef.current) {
        const nr = navRectRef.current;
        if (modeRef.current === "nav" && nr) {
          // Centre the ring horizontally on the link, anchor it vertically
          const cx = nr.left + nr.width / 2;
          const cy = nr.bottom + 2; // Align vertically with the bottom of the link element
          ringRef.current.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
        } else {
          ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
        }
      }
      // Orbit container: same lag as ring
      if (orbitRef.current) {
        orbitRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }
      // I-beam: instant
      if (ibeamRef.current) {
        ibeamRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      // Crosshair arms + scope ring: instant
      if (crosshairHRef.current) {
        crosshairHRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      if (crosshairVRef.current) {
        crosshairVRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }
      if (crosshairRingRef.current) {
        crosshairRingRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = requestAnimationFrame(render);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isHidden, resolveMode]);

  // ─── Tooltip helpers ──────────────────────────────────────────────────────
  const getTooltipStyles = (): React.CSSProperties => {
    if (!tooltipRect) return { opacity: 0 };
    const dist = 8;
    let x = 0,
      y = 0,
      transformStr = "";
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
      position: "fixed",
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

  // ─── Derived booleans ─────────────────────────────────────────────────────
  const isButton = mode === "button" && !inProjectsGrid;
  const isText = mode === "text" && !inProjectsGrid;
  const isIcon = mode === "icon" && !inProjectsGrid;
  const isCanvas = mode === "canvas" && !inProjectsGrid;
  const isNav = mode === "nav" && !inProjectsGrid;
  const isCard = mode === "card" && !inProjectsGrid;

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-9999999">
      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  DOT — always visible, follows mouse instantly                  ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          willChange: "transform",
          zIndex: 9999999,
          width: isButton ? "9px" : isIcon ? "5px" : "6px",
          height: isButton ? "9px" : isIcon ? "5px" : "6px",
          // Always opacity:1 (except on icon hover, where we hide it)
          opacity: isIcon ? 0 : 1,
          backgroundColor: inLightBg
            ? "rgba(15,15,16,1)"
            : "rgba(191,174,147,1)",
          transition:
            "width 0.2s cubic-bezier(0.16,1,0.3,1), " +
            "height 0.2s cubic-bezier(0.16,1,0.3,1), " +
            "background-color 0.2s ease",
        }}
      />

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  RING — lagged, mode-driven appearance                          ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          willChange: "transform",
          zIndex: 9999998,
          borderStyle: "solid",
          borderWidth: isCard ? "0px" : "1.5px",
          transition: [
            "width 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            "height 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            "border-color 0.3s ease",
            "border-radius 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            "background 0.3s ease",
            "box-shadow 0.3s ease",
            "opacity 0.3s ease",
          ].join(", "),

          // Nav: pill width matches the link text width with padding for a clean look
          width: isNav
            ? `${(navRect?.width ?? 40) + 4}px`
            : isCard
              ? "90px"
              : isIcon
                ? "52px"
                : isHovering
                  ? "44px"
                  : "28px",

          height: isNav
            ? "5px"
            : isCard
              ? "90px"
              : isIcon
                ? "52px"
                : isHovering
                  ? "44px"
                  : "28px",

          borderRadius: isNav ? "4px" : "50%",

          borderColor: isCard
            ? "transparent"
            : inLightBg
              ? isHovering
                ? "rgba(15,15,16,0.65)"
                : "rgba(15,15,16,0.45)"
              : isNav
                ? "rgba(191,174,147,0.75)"
                : isIcon
                  ? "rgba(191,174,147,0.6)"
                  : isHovering
                    ? "rgba(191,174,147,0.75)"
                    : "rgba(191,174,147,0.45)",

          background: isCard
            ? "radial-gradient(circle at center, rgba(191,174,147,0.14) 0%, rgba(191,174,147,0.05) 50%, transparent 75%)"
            : isHovering && !isNav && !isIcon && !isButton && !inProjectsGrid
              ? inLightBg
                ? "rgba(15,15,16,0.1)"
                : "rgba(191,174,147,0.08)"
              : "transparent",

          boxShadow: isCard
            ? "0 0 40px 20px rgba(191,174,147,0.1), 0 0 80px 40px rgba(191,174,147,0.04)"
            : isNav
              ? "0 0 8px 2px rgba(191,174,147,0.3)"
              : isIcon
                ? "0 0 14px 3px rgba(191,174,147,0.2)"
                : isHovering
                  ? inLightBg
                    ? "0 0 12px rgba(15,15,16,0.15)"
                    : "0 0 12px rgba(191,174,147,0.25)"
                  : "none",

          // Button + projects grid: hide ring (dot-only)
          // Canvas / text: ring hidden too (special indicator takes over)
          opacity: inProjectsGrid || isButton || isCanvas || isText ? 0 : 1,
        }}
      />

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  I-BEAM — instant, text elements only                           ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <div
        ref={ibeamRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          opacity: isText ? 1 : 0,
          transition: "opacity 0.2s ease",
          willChange: "transform",
          zIndex: 9999999,
        }}
      >
        {/* Stem */}
        <div
          style={{
            position: "absolute",
            width: "2px",
            height: "22px",
            marginLeft: "-1px",
            marginTop: "-11px",
            borderRadius: "2px",
            background: inLightBg
              ? "rgba(15,15,16,0.8)"
              : "rgba(191,174,147,0.9)",
            boxShadow: inLightBg
              ? "0 0 8px 2px rgba(15,15,16,0.3)"
              : "0 0 8px 2px rgba(191,174,147,0.45)",
          }}
        />
        {/* Top serif */}
        <div
          style={{
            position: "absolute",
            width: "9px",
            height: "2px",
            marginLeft: "-4.5px",
            marginTop: "-11px",
            borderRadius: "2px",
            background: inLightBg
              ? "rgba(15,15,16,0.7)"
              : "rgba(191,174,147,0.8)",
          }}
        />
        {/* Bottom serif */}
        <div
          style={{
            position: "absolute",
            width: "9px",
            height: "2px",
            marginLeft: "-4.5px",
            marginTop: "9px",
            borderRadius: "2px",
            background: inLightBg
              ? "rgba(15,15,16,0.7)"
              : "rgba(191,174,147,0.8)",
          }}
        />
      </div>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  ORBIT — lagged, icon mode only                                 ║
          ║  Structure:                                                      ║
          ║    orbitRef  → positioned by RAF (follows ring lag)             ║
          ║      tiltDiv → perspective + rotateX to make orbit feel 3D     ║
          ║        spinDiv → animation: cursor-orbit + random delay         ║
          ║          dot → tiny glowing bead                                ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      <div
        ref={orbitRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          willChange: "transform",
          zIndex: 9999997,
          width: "52px",
          height: "52px",
          marginLeft: "-26px",
          marginTop: "-26px",
          opacity: isIcon ? 1 : 0,
          transition: "opacity 0.3s ease",
          // Perspective context so child rotateX creates a true 3-D tilt
          perspective: "140px",
        }}
      >
        {/* Tilt plane — makes orbit look like a tilted ellipse in 3-D */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transform: "rotateX(32deg) rotateZ(-8deg)",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Spinning arm */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "52px",
              height: "52px",
              marginLeft: "-26px",
              marginTop: "-26px",
              animation: isIcon ? "cursor-orbit 1.5s linear infinite" : "none",
              animationDelay: orbitDelay,
            }}
          >
            {/* Glowing bead at the arm tip (slides out from center to orbit edge) */}
            <div
              style={{
                position: "absolute",
                top: isIcon ? "0" : "50%",
                left: "50%",
                marginLeft: "-3px",
                marginTop: "-3px",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                background: "rgba(191,174,147,1)",
                boxShadow:
                  "0 0 6px 2px rgba(191,174,147,0.6), " +
                  "0 0 14px 4px rgba(191,174,147,0.25)",
                transition: "top 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  CROSSHAIR — instant, canvas mode                               ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
      {/* Horizontal arm */}
      <div
        ref={crosshairHRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: "36px",
          height: "1.5px",
          marginLeft: "-18px",
          marginTop: "-0.75px",
          background: isCanvas
            ? "linear-gradient(90deg, transparent, rgba(191,174,147,0.75) 30%, rgba(191,174,147,1) 50%, rgba(191,174,147,0.75) 70%, transparent)"
            : "transparent",
          opacity: isCanvas ? 1 : 0,
          transition: "opacity 0.25s ease",
          willChange: "transform",
          zIndex: 9999999,
        }}
      />
      {/* Vertical arm */}
      <div
        ref={crosshairVRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{
          width: "1.5px",
          height: "36px",
          marginLeft: "-0.75px",
          marginTop: "-18px",
          background: isCanvas
            ? "linear-gradient(180deg, transparent, rgba(191,174,147,0.75) 30%, rgba(191,174,147,1) 50%, rgba(191,174,147,0.75) 70%, transparent)"
            : "transparent",
          opacity: isCanvas ? 1 : 0,
          transition: "opacity 0.25s ease",
          willChange: "transform",
          zIndex: 9999999,
        }}
      />
      {/* Slowly-rotating scope ring */}
      <div
        ref={crosshairRingRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full"
        style={{
          zIndex: 9999997,
          width: "44px",
          height: "44px",
          border: "1px solid rgba(191,174,147,0.35)",
          boxShadow:
            "0 0 14px 3px rgba(191,174,147,0.12), " +
            "inset 0 0 8px rgba(191,174,147,0.07)",
          opacity: isCanvas ? 1 : 0,
          transition: "opacity 0.25s ease",
          animation: isCanvas
            ? "cursor-crosshair-spin 9s linear infinite"
            : "none",
        }}
      />

      {/* ╔══════════════════════════════════════════════════════════════════╗
          ║  TOOLTIP                                                         ║
          ╚══════════════════════════════════════════════════════════════════╝ */}
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
