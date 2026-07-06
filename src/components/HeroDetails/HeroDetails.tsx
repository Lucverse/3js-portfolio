import React from "react";
import type { PortfolioData } from "@/types/portfolio";
import Text from "../Text/Text";

interface HeroDetailsProps {
  heroDetails: Pick<PortfolioData, "title" | "address">;
}

const HeroDetails: React.FC<HeroDetailsProps> = ({ heroDetails }) => {
  return (
    <div className="max-w-160 w-full flex flex-col">
      {heroDetails.title.map((line, index) => (
        <Text
          key={index}
          as="p"
          weight="light"
          color="muted"
          className="text-[clamp(1.2rem,4vw,1.8rem)] md:text-[clamp(1.35rem,4.5vw,2rem)] lg:text-[clamp(1.5rem,5vw,2.4rem)] tracking-wide leading-snug"
        >
          {line}
        </Text>
      ))}
      <Text as="p" size="base" color="primary" className="mt-2 opacity-80">
        {heroDetails.address.city}, {heroDetails.address.country}
      </Text>
    </div>
  );
};

export default HeroDetails;
