import rawData from "./data";
import type { PortfolioData } from "./types/portfolio";
import HeroName from "@components/HeroName/HeroName";
import HeroDetails from "@components/HeroDetails/HeroDetails";
import Timeline from "@components/Timeline/Timeline";
import Footer from "@components/Footer/Footer";
import Socials from "@components/Socials/Socials";
import Journey from "@components/Journey/Journey";
import Navbar from "@components/Navbar/Navbar";
import ConsoleCommands from "@components/Console/ConsoleCommands";
import StarsCanvas from "@components/Canvas/StarsCanvas";
import EarthCanvas from "@components/Canvas/EarthCanvas";
import Terminal from "@components/Terminal/Terminal";
import CustomCursor from "@components/CustomCursor/CustomCursor";

const data = rawData as PortfolioData;

function App() {
  return (
    <div className="relative overflow-hidden">
      <CustomCursor />
      <ConsoleCommands />
      <div className="fixed top-0 left-0 w-full h-dvh -z-1">
        <StarsCanvas />
      </div>
      <div className="flex flex-col gap-20 max-md:gap-12 max-[520px]:gap-8 w-full p-[4%] md:p-[5%] pb-0 md:pb-0 max-[520px]:p-[2%] max-[520px]:pb-0">
        <Navbar />
        {/* <Terminal /> */}
        <div
          className="min-h-[80dvh] rounded-custom border border-primary shadow-[0_0_30px_rgba(191,174,147,0.1),inset_0_0_80px_rgba(191,174,147,0.03)] overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-8 bg-transparent backdrop-blur-[0.5px] max-md:flex max-md:flex-col-reverse max-md:justify-center max-md:items-center max-md:min-h-[75dvh] max-md:h-auto max-md:py-10 max-md:pb-12"
          id="home"
        >
          <div className="flex flex-col justify-center gap-8 p-8 items-center text-center md:items-end md:text-end">
            <HeroName username={data.name} />
            <HeroDetails heroDetails={data} />
            <Socials socialLinks={data.socialLinks} />
          </div>
          <div className="flex flex-col justify-center gap-8 max-md:h-80 max-md:w-full">
            <EarthCanvas />
          </div>
        </div>
        <Journey
          educationData={data.educationData}
          experienceData={data.experienceData}
        />
        <Timeline projects={data.projects} />
        <Footer footerInfo={data.socialLinks} />
      </div>
    </div>
  );
}

export default App;
