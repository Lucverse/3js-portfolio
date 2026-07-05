import React from "react";
import type { PortfolioData } from "@/types/portfolio";

interface HeroDetailsProps {
  heroDetails: Pick<PortfolioData, "title" | "address">;
}

const HeroDetails: React.FC<HeroDetailsProps> = ({ heroDetails }) => {
  return (
    <div className="max-w-160">
      <p className="text-muted-color text-[clamp(1.2rem,4vw,1.8rem)] md:text-[clamp(1.5rem,5vw,2.2rem)] lg:text-[clamp(2rem,6vw,3rem)] font-light tracking-wide">
        {heroDetails.title}
      </p>
      <p className="text-primary text-[1rem] mt-2 opacity-80">
        {heroDetails.address.city}, {heroDetails.address.country}
      </p>
    </div>
  );
};

export default HeroDetails;
