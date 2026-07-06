import React from "react";

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}

/**
 * A rotating ✕ close button used in modals and drawers.
 * Rotates 90° on hover using CSS transitions — no inline style mutations needed.
 */
const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  className = "",
  ariaLabel = "Close",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={[
        "shrink-0 flex items-center justify-center w-9 h-9 rounded-xl",
        "text-[1.1rem] cursor-pointer transition-all duration-200",
        "bg-[rgba(191,174,147,0.08)] border border-[rgba(191,174,147,0.2)] text-primary",
        "hover:bg-[rgba(191,174,147,0.18)] hover:rotate-90",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      ✕
    </button>
  );
};

export default CloseButton;
