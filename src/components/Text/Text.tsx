import React from "react";

export type TextVariant =
  | "title"
  | "h1"
  | "h2"
  | "h3"
  | "body"
  | "muted"
  | "code";
export type TextWeight = "light" | "normal" | "medium" | "semibold" | "bold";

interface TextProps {
  variant?: TextVariant;
  as?: React.ElementType;
  weight?: TextWeight;
  className?: string;
  children: React.ReactNode;
}

const DEFAULT_ELEMENT: Record<TextVariant, React.ElementType> = {
  title: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  body: "p",
  muted: "p",
  code: "code",
};

const VARIANT_CLASSES: Record<TextVariant, string> = {
  title:
    "text-[clamp(2rem,6vw,3.5rem)] font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-white leading-[1.1]",
  h1: "text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-white tracking-wide leading-tight",
  h2: "text-[clamp(1.35rem,3vw,1.85rem)] font-semibold text-secondary leading-snug",
  h3: "text-[1.15rem] md:text-[1.25rem] font-medium text-primary leading-normal",
  body: "text-[0.875rem] md:text-[1rem] text-white/90 leading-relaxed",
  muted: "text-[0.75rem] md:text-[0.875rem] text-muted-color leading-normal",
  code: "font-mono text-[0.85em] bg-white/5 border border-white/10 px-1.5 py-0.5 rounded-md text-primary inline",
};

const WEIGHT_CLASSES: Record<TextWeight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
};

const Text: React.FC<TextProps> = ({
  variant = "body",
  as,
  weight,
  className = "",
  children,
}) => {
  const Component = (as ?? DEFAULT_ELEMENT[variant]) as any;

  const classes = [
    "font-[var(--font-base)]",
    VARIANT_CLASSES[variant],
    weight ? WEIGHT_CLASSES[weight] : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes}>{children}</Component>;
};

export default Text;
