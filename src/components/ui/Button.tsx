"use client";

import { type ButtonHTMLAttributes, type AnchorHTMLAttributes } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "white";
type Size = "md" | "lg" | "xl";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terra-500 focus-visible:ring-offset-cream-50 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-terra-500 via-terra-500 to-terra-600 text-cream-50 shadow-[0_16px_34px_-14px_rgba(168,90,66,0.75),0_8px_18px_-12px_rgba(42,31,24,0.42)] ring-1 ring-inset ring-white/15 hover:from-terra-400 hover:via-terra-500 hover:to-terra-600 hover:shadow-[0_22px_44px_-16px_rgba(168,90,66,0.9),0_10px_22px_-14px_rgba(42,31,24,0.48)]",
  secondary:
    "bg-cream-100 text-terra-700 ring-1 ring-inset ring-terra-500/30 shadow-card hover:bg-cream-200 hover:ring-terra-600/50 hover:text-terra-800",
  ghost:
    "bg-transparent text-ink-700 hover:bg-cream-100 hover:text-ink-900",
  white:
    "bg-cream-50 text-terra-700 hover:bg-cream-100 hover:text-terra-800 shadow-soft",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
  xl: "px-9 py-5 text-lg",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onAnimationStart" | "onDrag" | "onDragEnd" | "onDragStart"> & {
    href: string;
  };

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const {
    variant = "primary",
    size = "lg",
    className,
    children,
    ...rest
  } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  const motionProps = {
    whileHover: { y: -3, scale: 1.015 },
    whileTap: { y: 0, scale: 0.975 },
    transition: { type: "spring" as const, stiffness: 430, damping: 20 },
  };

  const content = (
    <>
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
      {variant === "primary" && (
        <span
          aria-hidden
          className="absolute inset-0 -z-0 bg-gradient-to-br from-terra-400 to-terra-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </>
  );

  if ("href" in rest && rest.href !== undefined) {
    return (
      <motion.a
        className={classes}
        {...motionProps}
        {...(rest as HTMLMotionProps<"a">)}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      {...motionProps}
      {...(rest as HTMLMotionProps<"button">)}
    >
      {content}
    </motion.button>
  );
}
