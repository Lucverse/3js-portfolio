import React from "react";

type TextSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl";

type TextWeight =
  | "light"
  | "normal"
  | "medium"
  | "semibold"
  | "bold"
  | "extrabold";

type TextColor =
  | "default"
  | "none"
  | "white"
  | "primary"
  | "secondary"
  | "muted"
  | "success"
  | "danger";

type TextAlign = "left" | "center" | "right";

type TextVariant = "default" | "hero" | "pageTitle" | "gradient";

interface TextProps {
  children: React.ReactNode;

  as?: React.ElementType;

  variant?: TextVariant;
  size?: TextSize;
  weight?: TextWeight;
  color?: TextColor;
  align?: TextAlign;

  italic?: boolean;
  underline?: boolean;
  uppercase?: boolean;
  truncate?: boolean;

  className?: string;
}

const SIZE: Record<TextSize, string> = {
  xs: "text-xs",
  sm: "text-sm",
  base: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl",
};

const WEIGHT: Record<TextWeight, string> = {
  light: "font-light",
  normal: "font-normal",
  medium: "font-medium",
  semibold: "font-semibold",
  bold: "font-bold",
  extrabold: "font-extrabold",
};

const COLOR: Record<TextColor, string> = {
  default: "text-white",
  none: "",
  white: "text-white",
  primary: "text-primary",
  secondary: "text-secondary",
  muted: "text-muted-color",
  success: "text-green-500",
  danger: "text-red-500",
};

const ALIGN: Record<TextAlign, string> = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
};

const VARIANT: Record<TextVariant, string> = {
  default: "",

  hero: `
    text-[clamp(3.5rem,14vw,7rem)]
    leading-none
    tracking-tight
  `,

  pageTitle: `
    text-[clamp(2rem,6vw,4rem)]
    leading-tight
    tracking-tight
  `,

  gradient: `
    text-transparent
    bg-clip-text
    bg-gradient-to-r
    from-primary
    via-secondary
    to-white
  `,
};

const Text: React.FC<TextProps> = ({
  children,

  as: Tag = "p",

  variant = "default",
  size = "base",
  weight = "normal",
  color = "default",
  align,

  italic = false,
  underline = false,
  uppercase = false,
  truncate = false,

  className = "",
}) => {
  const Component = Tag as any;
  const classes = [
    "font-[var(--font-base)]",

    VARIANT[variant],

    variant === "default" || variant === "gradient" ? SIZE[size] : "",

    WEIGHT[weight],
    COLOR[color],
    align && ALIGN[align],

    italic && "italic",
    underline && "underline",
    uppercase && "uppercase",
    truncate && "truncate",

    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <Component className={classes}>{children}</Component>;
};

export default Text;
