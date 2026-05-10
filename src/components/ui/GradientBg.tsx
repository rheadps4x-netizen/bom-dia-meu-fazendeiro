"use client";

import { motion } from "framer-motion";

type GradientBgProps = {
  variant?: "warm" | "cool" | "sunrise";
};

type Orb = {
  className: string;
  size: number;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
};

const palettes: Record<NonNullable<GradientBgProps["variant"]>, Orb[]> = {
  warm: [
    { className: "bg-rose-100/60", size: 520, top: "-15%", right: "-10%" },
    { className: "bg-sage-100/60", size: 460, bottom: "-15%", left: "-10%" },
    { className: "bg-terra-400/20", size: 320, top: "30%", left: "30%" },
  ],
  cool: [
    { className: "bg-sage-100/70", size: 480, top: "-10%", left: "-10%" },
    { className: "bg-cream-200/70", size: 420, bottom: "-10%", right: "-10%" },
  ],
  sunrise: [
    { className: "bg-terra-400/30", size: 520, top: "-20%", right: "-20%" },
    { className: "bg-rose-300/30", size: 440, top: "20%", left: "-10%" },
    { className: "bg-cream-300/40", size: 360, bottom: "-10%", right: "20%" },
  ],
};

export function GradientBg({ variant = "warm" }: GradientBgProps) {
  const orbs = palettes[variant];
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-3xl ${orb.className}`}
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            bottom: orb.bottom,
          }}
          animate={{
            x: [0, 20, -10, 0],
            y: [0, -15, 10, 0],
            scale: [1, 1.05, 0.98, 1],
          }}
          transition={{
            duration: 14 + i * 2,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />
      ))}
    </div>
  );
}
