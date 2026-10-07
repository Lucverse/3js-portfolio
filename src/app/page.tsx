import { getPortfolioData } from "@/lib/getPortfolioData";

import HeroName from "@components/HeroName/HeroName";
import HeroDetails from "@components/HeroDetails/HeroDetails";
import Timeline from "@components/Timeline/Timeline";
import Footer from "@components/Footer/Footer";
import Socials from "@components/Socials/Socials";
import Journey from "@components/Journey/Journey";
import Navbar from "@components/Navbar/Navbar";
import ConsoleCommands from "@components/Console/ConsoleCommands";
import DitherVeilClient from "@components/DitherVeilClient";
import SectionErrorBoundary from "@components/ErrorBoundary/SectionErrorBoundary";

// ============================================================================
// DitherVeil Controls & Customization
// ============================================================================

// --- Colors ---
// Ink: Dark shadow tone used in duotone dithering
// Accepts: Hex color string (e.g., "#120f17", "#0f0f10", "#000000")
const DITHER_INK = "#120f17";

// Paper: Light highlight / dot color for the dither pattern
// Accepts: Hex color string (e.g., "#bfae93", "#f4f1ea", "#ffffff")
const DITHER_PAPER = "#bfae93";

// Rim Color: Accent color for the glowing rim edge around the reveal stroke
// Accepts: Hex color string (e.g., "#a78bfa", "#9e8a75")
const DITHER_RIM_COLOR = "#a78bfa";

// --- Layout & Algorithm ---
// Fit: How the image fits the container
// Accepts: 'contain' (maintains full aspect ratio) | 'cover' (fills container, crops edges)
const DITHER_FIT: "contain" | "cover" = "contain";

// Pattern: Dithering algorithm
// Accepts: 'atkinson' | 'floyd' | 'bayer' | 'noise' | 'lines'
// - 'atkinson': Retro Macintosh 1-bit high-contrast dither
// - 'floyd': Floyd-Steinberg error diffusion for smooth gradients
// - 'bayer': Classic 8x8 ordered matrix crosshatch
// - 'noise': Blue-noise stochastic distribution
// - 'lines': Horizontal/diagonal engraving etching
const DITHER_PATTERN: "atkinson" | "floyd" | "bayer" | "noise" | "lines" =
  "atkinson";

// Palette: Color space mode
// Accepts: 'duotone' (rendered in ink & paper tones) | 'rgb' (3-channel color dithering)
const DITHER_PALETTE: "duotone" | "rgb" = "duotone";

// --- Sliders & Numeric Ranges ---
// Mobile Pixel Size: Dither cell size in pixels on mobile screens (< 768px)
// Range: 0.25 to 16 px (default: 0.5 or 1) — 0.5 gives ultra-fine crisp detail on high-DPI mobile screens
const DITHER_MOBILE_PIXEL_SIZE = 0.7;

// Desktop Pixel Multiplier: Desktop = multiplier * mobile pixel size (e.g., 3 * 0.5px = 1.5px)
// Range: 1 to 5 (default: 3) — desktop (≥ 768px) is 3x the mobile pixel size
const DITHER_DESKTOP_PIXEL_MULTIPLIER = 1.5;

// Levels: Quantization steps for tonal shading
// Range: 2 to 16 (default: 2) — 2 is classic 1-bit binary (black/white), higher values add intermediate shades
const DITHER_LEVELS = 2;

// Contrast: Contrast multiplier curve before dithering
// Range: 0.5 to 2.5 (default: 0.85 to 1.15) — lower softens tones, higher sharpens separation
const DITHER_CONTRAST = 0.85;

// Brightness: Exposure offset added before dithering
// Range: -0.5 to 0.5 (default: 0) — negative darkens shadows, positive brightens highlights
const DITHER_BRIGHTNESS = 0;

// Reveal Radius: Radius of the cursor / touch burn-through trail
// Range: 20 to 500 px (default: 100 to 200 px) — size of the brush revealing the photo
const DITHER_REVEAL_RADIUS = 100;

// Softness: Edge feathering of the reveal brush
// Range: 0.0 to 1.0 (default: 0.75) — 0.0 is sharp cutoff edge, 1.0 is smooth feather
const DITHER_SOFTNESS = 0.75;

// Linger: Time before the revealed photo knits back into dither
// Range: 0.1 to 5.0 seconds (default: 1.0 s) — how long trail persists before healing
const DITHER_LINGER = 1;

// Rim: Intensity / width of the illuminated neon outline around the reveal edge
// Range: 0.0 to 1.0 (default: 0, max: 0.95) — 0 disables rim, 0.1–0.5 adds visible glowing outline
const DITHER_RIM = 0;

// --- Toggles & Switches ---
// Reverse: Inverts veil behavior
// Accepts: true | false (default: false) — if true, photo is shown by default and cursor reveals dither
const DITHER_REVERSE = false;

// Wander: Autonomous drifting animation when no cursor is moving
// Accepts: true | false (default: false or true) — keeps canvas animated when idle
const DITHER_WANDER = false;

// Click Burst: Expanding shockwave ripple on click / tap
// Accepts: true | false (default: true) — clicking sends an animated expanding wave
const DITHER_CLICK_BURST = true;

// Transparent Background: Keys out black background void so starry canvas shows through
// Accepts: true | false (default: true)
const DITHER_TRANSPARENT_BG = true;

// Image Source: Local image in public folder or remote URL
// Accepts: Path string (e.g., "/hero-image.avif")
const DITHER_SRC = "/hero-image.avif";

export default async function Page() {
  const data = await getPortfolioData();
  const dbUnresponsive = data.isDbUnresponsive;
  const hasContent =
    data.projects.length > 0 ||
    data.experienceData.length > 0 ||
    data.educationData.length > 0 ||
    data.socialLinks.length > 0;
  const heroOnly = dbUnresponsive || !hasContent;

  return (
    <div className="relative overflow-hidden w-full">
      <ConsoleCommands />
      <div
        className={`flex flex-col w-full p-[4%] md:p-[5%] max-[520px]:p-[2%] ${
          heroOnly
            ? "h-dvh overflow-hidden pb-[4%] md:pb-[5%] max-[520px]:pb-[2%]"
            : "gap-20 max-md:gap-12 max-[520px]:gap-8 pb-0 md:pb-0 max-[520px]:pb-0"
        }`}
      >
        {!heroOnly && <Navbar />}
        {dbUnresponsive && (
          <div className="absolute top-[2%] left-1/2 -translate-x-1/2 z-20 w-[92%] rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-center text-xs text-amber-200">
            DB unresponsive. Showing fallback.
          </div>
        )}
        <div
          className={`rounded-custom border border-primary shadow-[0_0_30px_rgba(191,174,147,0.1),inset_0_0_80px_rgba(191,174,147,0.03)] overflow-hidden grid grid-cols-1 md:grid-cols-2 bg-transparent backdrop-blur-[0.5px] max-md:flex max-md:flex-col-reverse max-md:justify-center max-md:items-center ${
            heroOnly
              ? "h-full min-h-0 gap-4 max-md:gap-2 max-md:h-full max-md:min-h-0"
              : "min-h-[80dvh] max-md:min-h-[75dvh] max-md:h-auto max-md:py-10 max-md:pb-12"
          }`}
          id="intro"
        >
          <div
            className={`flex flex-col justify-center items-center text-center md:items-end md:text-end ${
              heroOnly
                ? "gap-4 p-5 max-md:p-4"
                : "gap-8 p-8 max-md:p-4 max-md:pt-2 max-md:gap-5"
            }`}
          >
            <HeroName username={data.name} />
            <HeroDetails heroDetails={data} />
            <Socials socialLinks={data.socialLinks} />
          </div>
          <div
            className={`flex flex-col justify-center items-center max-md:w-full ${
              heroOnly
                ? "gap-2 max-md:h-[38dvh] max-[375px]:h-[33dvh]"
                : "gap-4 md:gap-8 max-md:h-87.5 sm:max-md:h-95 max-[375px]:h-75 md:h-full md:min-h-115"
            }`}
          >
            <SectionErrorBoundary sectionName="Dither Veil">
              <div className="relative w-full h-full max-w-85 sm:max-w-95 max-[375px]:max-w-72.5 md:max-w-none flex items-center justify-center overflow-hidden">
                <DitherVeilClient
                  src={DITHER_SRC}
                  fit={DITHER_FIT}
                  pattern={DITHER_PATTERN}
                  palette={DITHER_PALETTE}
                  inkColor={DITHER_INK}
                  paperColor={DITHER_PAPER}
                  rimColor={DITHER_RIM_COLOR}
                  mobilePixelSize={DITHER_MOBILE_PIXEL_SIZE}
                  desktopPixelMultiplier={DITHER_DESKTOP_PIXEL_MULTIPLIER}
                  levels={DITHER_LEVELS}
                  contrast={DITHER_CONTRAST}
                  brightness={DITHER_BRIGHTNESS}
                  revealRadius={DITHER_REVEAL_RADIUS}
                  softness={DITHER_SOFTNESS}
                  linger={DITHER_LINGER}
                  rim={DITHER_RIM}
                  reverse={DITHER_REVERSE}
                  wander={DITHER_WANDER}
                  clickBurst={DITHER_CLICK_BURST}
                  transparentBg={DITHER_TRANSPARENT_BG}
                  className="w-full h-full"
                />
              </div>
            </SectionErrorBoundary>
          </div>
        </div>
        {!heroOnly && (
          <SectionErrorBoundary sectionName="Journey timeline">
            <Journey
              educationData={data.educationData}
              experienceData={data.experienceData}
            />
          </SectionErrorBoundary>
        )}
        {!heroOnly && (
          <SectionErrorBoundary sectionName="Work timeline">
            <Timeline projects={data.projects} />
          </SectionErrorBoundary>
        )}
        {!heroOnly && <Footer footerInfo={data.socialLinks} />}
      </div>
    </div>
  );
}
