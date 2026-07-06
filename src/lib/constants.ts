// ─── Colour palette ──────────────────────────────────────────────────────────
export const COLORS = {
  primary: "#bfae93",
  primaryHover: "#9e8a75",
  secondary: "#d1c5ad",
  muted: "#acacac",
  bgDark: "#0f0f10",
  error: "#ff8080",
  terminalDotRed: "#ff5f56",
  terminalDotYellow: "#ffbd2e",
  terminalDotGreen: "#27c93f",
} as const;

// ─── Z-index scale ────────────────────────────────────────────────────────────
export const Z = {
  stars: -1,
  navbar: 999,
  mobileMenu: 9999,
  modal: 9999,
  terminal: 10000,
  closeBtn: 10001,
} as const;

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
] as const;

// ─── Scroll behaviour ─────────────────────────────────────────────────────────
export const SCROLL_HIDE_THRESHOLD = 100;
export const AUTO_SCROLL_RESET_MS = 700;

// ─── Tech-stack icon animation ────────────────────────────────────────────────
export const TECH_ICON_ANIM_STEP_S = 0.1;

// ─── Project modal slideshow ──────────────────────────────────────────────────
export const KEYPOINT_INTERVAL_MS = 5000;
export const KEYPOINT_FADE_MS = 500;

// ─── Timeline / project list ──────────────────────────────────────────────────
export const PROJECTS_PAGE_SIZE = 3;

// ─── Terminal Enums & Constants ───────────────────────────────────────────────
export enum TerminalLineType {
  Input = "input",
  Output = "output",
  Error = "error",
  Title = "title",
  Info = "info",
}

export enum TerminalCommand {
  Help = "help",
  About = "about",
  Experience = "experience",
  Education = "education",
  Projects = "projects",
  GetProject = "getproject",
  Socials = "socials",
  TechStack = "techstack",
  Clear = "clear",
}

export interface TerminalLine {
  type: TerminalLineType;
  content: string;
}

export const INITIAL_TERMINAL_LINES: TerminalLine[] = [
  { type: TerminalLineType.Title, content: "Portfolio Terminal v1.0" },
  {
    type: TerminalLineType.Info,
    content: `Welcome! Type "help" to see available commands.`,
  },
  { type: TerminalLineType.Info, content: "" },
];

// ─── Console Commands Configuration ───────────────────────────────────────────
export const VALID_CONSOLE_COMMANDS: Record<string, string> = {
  about: "about",
  experience: "experience",
  education: "education",
  projects: "projects",
  getproject: "getProject",
  socials: "socials",
  techstack: "techStack",
  help: "help",
} as const;
