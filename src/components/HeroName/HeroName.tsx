import React from "react";
import Text from "@components/Text/Text";

interface HeroNameProps {
  username: string;
}

const HeroName: React.FC<HeroNameProps> = ({ username }) => {
  const nameParts = username.split(" ");
  return (
    <div className="flex flex-col gap-0">
      {nameParts.map((part, index) => (
        <Text
          key={index}
          variant="hero"
          as="h1"
          weight="extrabold"
          color="primary"
        >
          {part}
        </Text>
      ))}
    </div>
  );
};

export default HeroName;
