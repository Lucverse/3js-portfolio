import React from "react";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  download?: string | boolean;
  target?: string;
  id?: string;
  ariaLabel?: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  href,
  download,
  target,
  id,
  ariaLabel,
  className = "",
}) => {
  const baseClasses =
    "relative overflow-hidden inline-flex items-center justify-center w-fit mx-auto px-5 py-1.5 md:px-[1.6rem] md:py-2 bg-transparent border border-[rgba(191,174,147,0.3)] text-primary no-underline rounded-[10px] cursor-pointer text-[0.875rem] md:text-[0.95rem] font-medium font-base tracking-wider transition-all duration-300 ease-out backdrop-blur-xs select-none hover:border-primary hover:text-secondary hover:shadow-[0_0_20px_rgba(191,174,147,0.15)]";

  const combinedClasses = `${baseClasses} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        target={target}
        download={download}
        id={id}
        aria-label={ariaLabel || label}
        className={combinedClasses}
        onClick={onClick}
      >
        {label}
      </a>
    );
  }

  return (
    <button
      type="button"
      id={id}
      aria-label={ariaLabel || label}
      className={combinedClasses}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
