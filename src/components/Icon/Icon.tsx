import React from "react";

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
  const hoverClasses = disableHover
    ? ""
    : "hover:-translate-y-1 hover:scale-110 hover:grayscale-0 hover:opacity-100 hover:filter-[drop-shadow(0_0_10px_rgba(191,174,147,0.6))]";

  const baseClasses =
    `${size} aspect-square transition-all duration-300 ease-out grayscale-20 opacity-85 ${hoverClasses}`.trim();

  const imgElement = (
    <img
      src={src}
      alt={alt}
      className={`${baseClasses} ${className}`.trim()}
    />
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={alt}
        data-tooltip={tooltip}
        className="inline-block"
      >
        {imgElement}
      </a>
    );
  }

  return (
    <span data-tooltip={tooltip} className="inline-flex">
      {imgElement}
    </span>
  );
};

export default Icon;
