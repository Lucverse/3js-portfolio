import React from "react";
import type { ExperienceItem, EducationItem } from "@/types/portfolio";
import useScrollReveal from "@hooks/useScrollReveal";
import Text from "@components/Text/Text";

interface JourneyProps {
  experienceData: ExperienceItem[];
  educationData: EducationItem[];
}

interface TabSwitcherProps {
  activeTab: "experience" | "education";
  onChange: (tab: "experience" | "education") => void;
}

interface TimelineItemProps {
  title: string;
  date: string;
  subtitle: string;
  description: string;
  itemRef: (el: HTMLDivElement | null) => void;
}

interface TimelineListProps {
  activeTab: "experience" | "education";
  experienceData: ExperienceItem[];
  educationData: EducationItem[];
  itemsRef: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ activeTab, onChange }) => {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex bg-bg-dark/5 p-1.5 px-2 rounded-full border border-bg-dark/10 shadow-inner">
        <button
          onClick={() => onChange("experience")}
          className={`px-6 sm:px-8 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === "experience"
              ? "bg-bg-dark text-primary shadow-md scale-[1.02]"
              : "text-bg-dark/60 hover:text-bg-dark/95"
          }`}
        >
          Professional
        </button>
        <button
          onClick={() => onChange("education")}
          className={`px-6 sm:px-8 py-2 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 cursor-pointer ${
            activeTab === "education"
              ? "bg-bg-dark text-primary shadow-md scale-[1.02]"
              : "text-bg-dark/60 hover:text-bg-dark/95"
          }`}
        >
          Education
        </button>
      </div>
    </div>
  );
};

const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  date,
  subtitle,
  description,
  itemRef,
}) => {
  return (
    <div
      className="reveal-item flex flex-col gap-1.5 pl-6 sm:pl-8 pb-6 last:pb-2 border-l-2 border-bg-dark/30 last:border-transparent relative animate-fade-in"
      ref={itemRef}
    >
      <span className="absolute w-4 h-4 rounded-full -left-2.25 top-1 border-2 border-bg-dark bg-primary shadow-[0_0_10px_rgba(0,0,0,0.1)] transition-transform duration-300 hover:scale-125"></span>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-0.5">
        <Text
          as="h4"
          size="lg"
          weight="bold"
          color="none"
          className="text-bg-dark leading-tight"
        >
          {title}
        </Text>
        <Text
          as="span"
          size="xs"
          weight="medium"
          color="primary"
          className="px-2.5 py-0.5 bg-bg-dark inline-block w-fit rounded-md border border-bg-dark/15"
        >
          {date}
        </Text>
      </div>

      <Text
        as="p"
        size="sm"
        weight="semibold"
        color="none"
        className="opacity-75"
      >
        {subtitle}
      </Text>
      <Text
        as="p"
        size="sm"
        color="none"
        className="opacity-80 mt-1 leading-relaxed"
      >
        {description}
      </Text>
    </div>
  );
};

const TimelineList: React.FC<TimelineListProps> = ({
  activeTab,
  experienceData,
  educationData,
  itemsRef,
}) => {
  if (activeTab === "experience") {
    return (
      <div className="flex flex-col">
        {experienceData.map((experience, index) => (
          <TimelineItem
            key={index}
            title={experience.title}
            date={experience.date}
            subtitle={experience.company}
            description={experience.description}
            itemRef={(el) => {
              itemsRef.current[index] = el;
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {educationData.map((education, index) => (
        <TimelineItem
          key={index}
          title={education.title}
          date={education.date}
          subtitle={education.institution}
          description={education.description}
          itemRef={(el) => {
            itemsRef.current[index] = el;
          }}
        />
      ))}
    </div>
  );
};

const Journey: React.FC<JourneyProps> = ({ experienceData, educationData }) => {
  const [activeTab, setActiveTab] = React.useState<"experience" | "education">(
    "experience",
  );
  const itemsRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <div className="w-full relative group">
      {/* Ambient Pulsing Glow behind the section */}
      <div className="absolute top-1/2 left-1/2 w-[85%] h-[85%] bg-primary rounded-full pointer-events-none -z-10 animate-glow-pulse" />

      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        {[
          { offset: "0%", opacity: "opacity-20" },
          { offset: "1.6%", opacity: "opacity-16" },
          { offset: "3.2%", opacity: "opacity-12" },
          { offset: "4.8%", opacity: "opacity-8" },
          { offset: "6.4%", opacity: "opacity-5" },
        ].map((layer, i) => (
          <div
            key={i}
            className={`
              absolute
              top-0
              h-full
              rounded-custom
              border
              border-primary/30
              bg-primary
              transition-all duration-500 ease-out
              ${layer.opacity}
              about-layer-${i}
            `}
            style={{
              left: layer.offset,
              right: layer.offset,
              zIndex: i,
            }}
          />
        ))}
      </div>

      <section
        id="about"
        className="
          relative
          z-10
          w-full
          lg:w-[87.2%]
          lg:mx-auto

          rounded-custom
          border border-primary/25
          bg-primary
          text-bg-dark

          p-6
          sm:p-10
          md:p-12

          shadow-[0_20px_50px_rgba(0,0,0,0.2)]
        "
      >
        <div className="text-center mb-4">
          <Text as="h2" size="3xl" weight="bold" color="none">
            My Journey
          </Text>
          <Text
            as="p"
            size="base"
            color="none"
            className="opacity-70 mt-[0.4rem]"
          >
            My journey as a Full Stack Web Developer
          </Text>
        </div>

        <TabSwitcher activeTab={activeTab} onChange={setActiveTab} />

        <div className="max-w-2xl mx-auto" key={activeTab}>
          <TimelineList
            activeTab={activeTab}
            experienceData={experienceData}
            educationData={educationData}
            itemsRef={itemsRef}
          />
        </div>
      </section>
    </div>
  );
};

export default Journey;
