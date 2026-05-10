"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import { type ReactNode } from "react";

const easeOut = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easeOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: easeOut } },
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

type FadeUpProps = HTMLMotionProps<"div"> & {
  delay?: number;
  children: ReactNode;
};

export function FadeUp({ delay = 0, children, ...rest }: FadeUpProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ duration: 0.7, ease: easeOut, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

type StaggerProps = HTMLMotionProps<"div"> & {
  children: ReactNode;
  amount?: number;
};

export function Stagger({ children, amount = 0.15, ...rest }: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={stagger}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  ...rest
}: HTMLMotionProps<"div"> & { children: ReactNode }) {
  return (
    <motion.div variants={fadeUp} {...rest}>
      {children}
    </motion.div>
  );
}
