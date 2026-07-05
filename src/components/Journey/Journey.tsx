import React from "react";
import type { ExperienceItem, EducationItem } from "@/types/portfolio";
import useScrollReveal from "@hooks/useScrollReveal";

interface JourneyProps {
  experienceData: ExperienceItem[];
  educationData: EducationItem[];
}

const Journey: React.FC<JourneyProps> = ({ experienceData, educationData }) => {
  const expItemsRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });
  const eduItemsRef = useScrollReveal<HTMLDivElement>({ threshold: 0.1 });

  return (
    <section
      id="about"
      className="bg-primary text-bg-dark border border-primary/25 rounded-custom p-5 sm:p-10 md:p-15 shadow-[0_20px_50px_rgba(0,0,0,0.2)]"
    >
      <div className="text-center mb-10">
        <h2 className="text-[clamp(1.5rem,3vw,2rem)] font-bold text-bg-dark">
          My Journey
        </h2>
        <p className="text-[1rem] leading-[1.4] text-bg-dark/75 mt-[0.4rem]">
          My journey as a Full Stack Web Developer
        </p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-7.5">
        <div>
          <h3 className="text-[1.5rem] font-semibold text-bg-dark my-2.5">
            Professional Experience
          </h3>
          {experienceData.map((experience, index) => (
            <div
              className="reveal-item flex flex-col gap-1.25 w-auto pl-5 pb-6 -mt-0.5 border-l-2 border-bg-dark relative"
              key={index}
              ref={(el) => {
                expItemsRef.current[index] = el;
              }}
            >
              <span className="absolute w-4 aspect-square rounded-full -left-2 top-0 border-2 border-bg-dark bg-primary shadow-[0_0_10px_rgba(0,0,0,0.15)]"></span>
              <h4 className="text-[18px] font-semibold text-bg-dark">
                {experience.title}
              </h4>
              <h5 className="text-[16px] font-medium px-3 py-1 bg-bg-dark color-primary inline-block mb-1.5 w-fit rounded-sm border border-bg-dark/15 text-primary">
                {experience.date}
              </h5>
              <p className="text-[1rem] leading-[1.4] text-bg-dark/85">
                <em className="not-italic font-semibold text-bg-dark">
                  {experience.company}
                </em>
              </p>
              <p className="text-[1rem] leading-[1.4] text-bg-dark/85">
                {experience.description}
              </p>
            </div>
          ))}
        </div>
        <div>
          <h3 className="text-[1.5rem] font-semibold text-bg-dark my-2.5">
            Education
          </h3>
          {educationData.map((education, index) => (
            <div
              className="reveal-item flex flex-col gap-1.25 w-auto pl-5 pb-6 -mt-0.5 border-l-2 border-bg-dark relative"
              key={index}
              ref={(el) => {
                eduItemsRef.current[index] = el;
              }}
            >
              <span className="absolute w-4 aspect-square rounded-full -left-2 top-0 border-2 border-bg-dark bg-primary shadow-[0_0_10px_rgba(0,0,0,0.15)]"></span>
              <h4 className="text-[18px] font-semibold text-bg-dark">
                {education.title}
              </h4>
              <h5 className="text-[16px] font-medium px-3 py-1 bg-bg-dark color-primary inline-block mb-1.5 w-fit rounded-sm border border-bg-dark/15 text-primary">
                {education.date}
              </h5>
              <p className="text-[1rem] leading-[1.4] text-bg-dark/85">
                <em className="not-italic font-semibold text-bg-dark">
                  {education.institution}
                </em>
              </p>
              <p className="text-[1rem] leading-[1.4] text-bg-dark/85">
                {education.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Journey;
