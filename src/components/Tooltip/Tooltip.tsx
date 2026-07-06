import React from "react";

interface TooltipProps {
  content: React.ReactNode;
  direction?: "top" | "bottom" | "left" | "right";
  children: React.ReactElement;
  disabled?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  direction = "top",
  children,
  disabled = false,
}) => {
  if (!content || disabled) return children;
  return React.cloneElement(children, {
    "data-cursor-tooltip": content,
    "data-tooltip-dir": direction,
  } as any);
};

export default Tooltip;
