import React from "react";
import { Html, useProgress } from "@react-three/drei";
import Text from "@components/Text/Text";

const CanvasLoader: React.FC = () => {
  const { progress } = useProgress();
  return (
    <Html as="div" center className="flex justify-center items-center flex-col">
      <span className="block w-10 h-10 border-[3px] border-primary/10 border-t-primary rounded-full animate-spin"></span>
      <Text
        as="p"
        size="sm"
        weight="extrabold"
        color="primary"
        className="mt-10 tracking-[1px]"
      >
        {progress.toFixed(0)}%
      </Text>
    </Html>
  );
};

export default CanvasLoader;
