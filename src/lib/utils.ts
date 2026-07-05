import { COLORS, TECH_ICON_ANIM_STEP_S } from "./constants";

// ─── Mouse / pointer helpers ──────────────────────────────────────────────────

/**
 * Convert a mouse event into percentage-based coordinates relative to its
 * target element.  Returns `{ x: "42%", y: "17%" }` style strings ready for
 * use in CSS `background` / `radial-gradient` values.
 */
export function calcMousePosition(e: React.MouseEvent<HTMLElement>): {
  x: string;
  y: string;
} {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  return { x: `${x}%`, y: `${y}%` };
}

// ─── Gradient / shadow helpers ────────────────────────────────────────────────

/**
 * Build the CSS `radial-gradient` string used for the interactive hover glow
 * on timeline grid items.
 *
 * @param x        Horizontal centre as a percentage string, e.g. `"42%"`
 * @param y        Vertical centre as a percentage string, e.g. `"17%"`
 * @param color    RGBA colour string for the glow (defaults to the primary palette colour)
 * @param inner    Radius of the fully opaque centre stop (default `"10%"`)
 * @param outer    Radius at which the gradient fades to transparent (default `"28%"`)
 */
export function getRadialGradient(
  x: string,
  y: string,
  color: string = `rgba(${hexToRgb(COLORS.primary)}, 0.18)`,
  inner = "10%",
  outer = "28%",
): string {
  return `radial-gradient(circle at ${x} ${y}, ${color} ${inner}, transparent ${outer})`;
}

/**
 * Return the CSS `box-shadow` string for the hover state of timeline cards.
 * Returns `"none"` when `active` is false.
 */
export function getHoverBoxShadow(
  active: boolean,
): string {
  if (!active) return "none";
  return "0 8px 32px rgba(0,0,0,0.35)";
}

// ─── Animation helpers ────────────────────────────────────────────────────────

/**
 * Compute the CSS `animation-delay` for a staggered tech-icon slide-in.
 * Index is 0-based; internally shifted by +1 so the first icon isn't instant.
 *
 * @example
 *   style={{ animationDelay: getTechAnimDelay(techIndex) }}
 */
export function getTechAnimDelay(index: number): string {
  return `${(index + 1) * TECH_ICON_ANIM_STEP_S}s`;
}

// ─── Body scroll lock ─────────────────────────────────────────────────────────

/**
 * Lock or unlock body scrolling.
 * Prefer the `useBodyScrollLock` hook over calling this directly in effects.
 */
export function lockBodyScroll(locked: boolean): void {
  document.body.style.overflow = locked ? "hidden" : "auto";
}

// ─── Section scrolling ────────────────────────────────────────────────────────

/**
 * Smoothly scroll to a page section by its element `id`.
 *
 * @param id          The `id` attribute of the target element
 * @param onBefore    Optional callback invoked before the scroll starts
 * @param onAfter     Optional callback invoked after `resetDelayMs`
 * @param resetDelayMs  How long to wait (ms) before calling `onAfter` (default 700)
 */
export function scrollToSection(
  id: string,
  onBefore?: () => void,
  onAfter?: () => void,
  resetDelayMs = 700,
): void {
  const el = document.getElementById(id);
  if (!el) return;
  onBefore?.();
  el.scrollIntoView({ behavior: "smooth" });
  if (onAfter) setTimeout(onAfter, resetDelayMs);
}

// ─── Internal helpers ─────────────────────────────────────────────────────────

/**
 * Convert a 6-digit hex colour (e.g. `"#bfae93"` or `"bfae93"`) to its
 * comma-separated `r,g,b` form (e.g. `"191,174,147"`).
 * Used internally to build rgba() strings from the constants palette.
 */
function hexToRgb(hex: string): string {
  const clean = hex.replace(/^#/, "");
  const num = parseInt(clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `${r},${g},${b}`;
}
