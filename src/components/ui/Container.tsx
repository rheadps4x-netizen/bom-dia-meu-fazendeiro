import { type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-6xl",
} as const;

export function Container({
  className,
  size = "lg",
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
