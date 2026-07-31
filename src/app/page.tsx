import { getPortfolioData } from "@/lib/getPortfolioData";

import HeroName from "@components/HeroName/HeroName";
import HeroDetails from "@components/HeroDetails/HeroDetails";
import Timeline from "@components/Timeline/Timeline";
import Footer from "@components/Footer/Footer";
import Socials from "@components/Socials/Socials";
import Journey from "@components/Journey/Journey";
import Navbar from "@components/Navbar/Navbar";
import ConsoleCommands from "@components/Console/ConsoleCommands";
import EarthCanvasClient from "@components/Canvas/EarthCanvasClient";
import SectionErrorBoundary from "@components/ErrorBoundary/SectionErrorBoundary";

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
              heroOnly ? "gap-4 p-5 max-md:p-4" : "gap-8 p-8"
            }`}
          >
            <HeroName username={data.name} />
            <HeroDetails heroDetails={data} />
            <Socials socialLinks={data.socialLinks} />
          </div>
          <div
            className={`flex flex-col justify-center max-md:w-full ${
              heroOnly
                ? "gap-3 max-md:h-[38dvh] max-[375px]:h-[34dvh]"
                : "gap-8 max-md:h-80"
            }`}
          >
            <SectionErrorBoundary sectionName="Earth 3D Canvas">
              <EarthCanvasClient />
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
