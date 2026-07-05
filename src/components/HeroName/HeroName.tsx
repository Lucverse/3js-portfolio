import React from "react";

interface HeroNameProps {
  username: string;
}

const HeroName: React.FC<HeroNameProps> = ({ username }) => {
  const nameParts = username.split(" ");
  return (
    <div className="flex flex-col gap-0 select-none">
      {nameParts.map((part, index) => (
        <h1
          className="text-primary font-extrabold text-[clamp(3.5rem,14vw,4.5rem)] md:text-[clamp(4.5rem,10vw,5.5rem)] lg:text-[clamp(5rem,12vw,7rem)] leading-none"
          key={index}
        >
          {part}
        </h1>
      ))}
    </div>
  );
};

export default HeroName;
