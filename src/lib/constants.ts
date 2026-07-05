// ─── Colour palette ──────────────────────────────────────────────────────────
export const COLORS = {
  primary: "#bfae93",
  primaryHover: "#9e8a75",
  secondary: "#d1c5ad",
  muted: "#acacac",
  bgDark: "#0f0f10",
  /** Terminal error text */
  error: "#ff8080",
  /** macOS-style traffic-light dots */
  terminalDotRed: "#ff5f56",
  terminalDotYellow: "#ffbd2e",
  terminalDotGreen: "#27c93f",
} as const;

// ─── Z-index scale ────────────────────────────────────────────────────────────
export const Z = {
  /** Stars background canvas */
  stars: -1,
  /** Floating nav pill */
  navbar: 999,
  /** Full-screen mobile menu overlay */
  mobileMenu: 9999,
  /** Project / modal backdrop */
  modal: 9999,
  /** Terminal floating panel */
  terminal: 10000,
  /** Close buttons that sit above modal/terminal panels */
  closeBtn: 10001,
} as const;

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS: { id: string; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
];

// ─── Scroll behaviour ─────────────────────────────────────────────────────────
/** Minimum scroll-Y in px before navbar hide kicks in */
export const SCROLL_HIDE_THRESHOLD = 100;
/** ms to wait before clearing the auto-scroll flag after smooth-scroll */
export const AUTO_SCROLL_RESET_MS = 700;

// ─── Tech-stack icon animation ────────────────────────────────────────────────
/** Seconds per icon in the staggered slide-in animation */
export const TECH_ICON_ANIM_STEP_S = 0.1;

// ─── Project modal slideshow ──────────────────────────────────────────────────
/** ms between automatic key-point transitions */
export const KEYPOINT_INTERVAL_MS = 5000;
/** ms for the cross-fade between key-points */
export const KEYPOINT_FADE_MS = 500;

// ─── Timeline / project list ──────────────────────────────────────────────────
/** How many projects to show per "Load More" page */
export const PROJECTS_PAGE_SIZE = 3;
