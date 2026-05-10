"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type SectionTitleProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  light?: boolean;
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "mb-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.18em] ring-1 ring-inset backdrop-blur-sm",
            light
              ? "bg-cream-50/10 text-cream-50 ring-cream-50/20"
              : "bg-white/70 text-terra-700 ring-terra-500/15",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              light ? "bg-cream-50" : "bg-terra-500",
            )}
          />
          {eyebrow}
        </div>
      )}
      <h2
        className={cn(
          "text-balance text-3xl leading-[1.08] sm:text-4xl md:text-5xl",
          light ? "text-cream-50" : "text-ink-900",
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-5 text-pretty text-base leading-relaxed sm:text-lg",
            light ? "text-cream-100/85" : "text-ink-700",
          )}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}
