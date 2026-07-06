import React from "react";

export type TagVariant = "solid" | "outline" | "glow";
export type TagSize = "sm" | "md" | "lg";

export interface TagProps {
  label: string;
  variant?: TagVariant;
  size?: TagSize;
  interactive?: boolean;
  onClick?: (label: string) => void;
  onRemove?: (label: string) => void;
  className?: string;
}

const VARIANT_CLASSES: Record<TagVariant, string> = {
  solid: "bg-primary/10 border-primary/20 text-primary hover:bg-primary/20",
  outline:
    "bg-transparent border-primary/25 text-primary hover:border-primary hover:shadow-[0_0_10px_rgba(191,174,147,0.1)]",
  glow: "bg-primary/5 border-primary/30 text-secondary shadow-[0_0_12px_rgba(191,174,147,0.15)] hover:shadow-[0_0_18px_rgba(191,174,147,0.3)] hover:border-primary/60",
};

const SIZE_CLASSES: Record<TagSize, string> = {
  sm: "px-2.5 py-0.5 text-[0.7rem] md:text-[0.75rem]",
  md: "px-3 py-1 text-[0.75rem] md:text-[0.85rem]",
  lg: "px-4 py-1.5 text-[0.875rem] md:text-[0.95rem]",
};

export const Tag: React.FC<TagProps> = ({
  label,
  variant = "outline",
  size = "md",
  interactive = false,
  onClick,
  onRemove,
  className = "",
}) => {
  const isClickable = interactive || !!onClick;

  const classes = [
    "inline-flex items-center gap-1.5 font-[var(--font-base)] font-medium rounded-full transition-all duration-300 select-none border",
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    isClickable
      ? "cursor-pointer active:scale-95 hover:-translate-y-0.5 hover:scale-[1.03]"
      : "cursor-default",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.stopPropagation();
      onClick(label);
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    if (onRemove) {
      e.stopPropagation();
      onRemove(label);
    }
  };

  return (
    <span className={classes} onClick={handleClick}>
      {label}
      {onRemove && (
        <button
          type="button"
          onClick={handleRemove}
          className="w-3.5 h-3.5 rounded-full inline-flex items-center justify-center text-primary/60 hover:text-primary hover:bg-primary/25 transition-colors cursor-pointer shrink-0"
          aria-label={`Remove ${label}`}
        >
          ×
        </button>
      )}
    </span>
  );
};

interface TagsProps {
  items: string[];
  variant?: TagVariant;
  size?: TagSize;
  interactive?: boolean;
  onClickItem?: (tag: string) => void;
  onRemoveItem?: (tag: string) => void;
  className?: string;
  tagClassName?: string;
}

const Tags: React.FC<TagsProps> = ({
  items,
  variant = "outline",
  size = "md",
  interactive = false,
  onClickItem,
  onRemoveItem,
  className = "",
  tagClassName = "",
}) => {
  return (
    <div
      className={["flex flex-wrap gap-2", className].filter(Boolean).join(" ")}
    >
      {items.map((item, idx) => (
        <Tag
          key={`${item}-${idx}`}
          label={item}
          variant={variant}
          size={size}
          interactive={interactive}
          onClick={onClickItem}
          onRemove={onRemoveItem}
          className={tagClassName}
        />
      ))}
    </div>
  );
};

export default Tags;
