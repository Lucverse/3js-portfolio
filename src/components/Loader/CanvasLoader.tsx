import React from "react";
import { Html, useProgress } from "@react-three/drei";

const CanvasLoader: React.FC = () => {
  const { progress } = useProgress();
  return (
    <Html as="div" center className="flex justify-center items-center flex-col">
      <span className="block w-10 h-10 border-[3px] border-primary/10 border-t-primary rounded-full animate-spin"></span>
      <p className="text-[14px] text-primary font-extrabold mt-10 font-base tracking-[1px]">
        {progress.toFixed(0)}%
      </p>
    </Html>
  );
};

export default CanvasLoader;
