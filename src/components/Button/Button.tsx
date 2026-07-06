import React from "react";

export type ButtonVariant = "outline" | "solid";

interface ButtonProps {
  label?: string;
  variant?: ButtonVariant;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  href?: string;
  download?: string | boolean;
  target?: string;
  id?: string;
  ariaLabel?: string;
  className?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  label,
  variant = "outline",
  onClick,
  href,
  download,
  target,
  id,
  ariaLabel,
  className = "",
  children,
}) => {
  const solidClasses =
    "relative overflow-hidden inline-flex items-center justify-center gap-2 w-fit px-5 py-2.5 text-[0.875rem] font-semibold rounded-xl no-underline cursor-pointer transition-all duration-200 select-none bg-primary text-bg-dark hover:bg-primary-hover hover:shadow-[0_8px_24px_rgba(191,174,147,0.3)] hover:-translate-y-0.5";

  const outlineClasses =
    "relative overflow-hidden inline-flex items-center justify-center gap-2 w-fit mx-auto px-5 py-1.5 md:px-[1.6rem] md:py-2 bg-transparent border border-[rgba(191,174,147,0.3)] text-primary no-underline rounded-[10px] cursor-pointer text-[0.875rem] md:text-[0.95rem] font-medium font-[var(--font-base)] tracking-wider transition-all duration-300 ease-out backdrop-blur-xs select-none hover:border-primary hover:text-secondary hover:shadow-[0_0_20px_rgba(191,174,147,0.15)]";

  const baseClasses = variant === "solid" ? solidClasses : outlineClasses;
  const combinedClasses = [baseClasses, className].filter(Boolean).join(" ");
  const content = children ?? label;
  const resolvedAriaLabel = ariaLabel || label;

  if (href) {
    return (
      <a
        href={href}
        target={target}
        download={download}
        id={id}
        aria-label={resolvedAriaLabel}
        className={combinedClasses}
        onClick={onClick}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      id={id}
      aria-label={resolvedAriaLabel}
      className={combinedClasses}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
