import React from "react";
import Tooltip from "../Tooltip/Tooltip";

interface IconProps {
  src: string;
  alt: string;
  tooltip?: string;
  href?: string;
  className?: string;
  size?: string;
  disableHover?: boolean;
}

const Icon: React.FC<IconProps> = ({
  src,
  alt,
  tooltip,
  href,
  className = "",
  size = "w-7 md:w-8",
  disableHover = false,
}) => {
  const normalizedSrc = src?.trim();
  if (!normalizedSrc) return null;

  const hoverClasses = disableHover
    ? ""
    : "hover:grayscale-0 hover:opacity-100";

  const baseClasses =
    `${size} aspect-square transition-all duration-300 ease-out grayscale-20 opacity-85 ${hoverClasses}`.trim();

  const imgElement = (
    <img
      src={normalizedSrc}
      alt={alt}
      width={24}
      height={24}
      decoding="async"
      className={`${baseClasses} ${className}`.trim()}
    />
  );

  const renderIcon = () => {
    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={alt}
          className="inline-flex items-center justify-center p-1.5 min-w-11 min-h-11"
          data-cursor="icon"
        >
          {imgElement}
        </a>
      );
    }

    return (
      <span className="inline-flex" data-cursor="icon">
        {imgElement}
      </span>
    );
  };

  if (tooltip) {
    return <Tooltip content={tooltip}>{renderIcon()}</Tooltip>;
  }

  return renderIcon();
};

export default Icon;
