import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  href?: string;
  variant?: "brand" | "light" | "white";
}

const sizeClasses = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl md:text-4xl",
  xl: "text-4xl md:text-5xl",
};

/**
 * Viral Dept. Official Brand Logo
 * Preserved exactly as the original brand identity:
 * Fraunces Serif typeface, "Viral" in font-black, "Dept." in italic font-medium.
 */
export function Logo({
  className,
  size = "md",
  href = "#top",
  variant = "brand",
}: LogoProps) {
  const colorClasses = {
    brand: "text-[#8b261e]",
    light: "text-[#f5c6c0]",
    white: "text-white",
  };

  const content = (
    <span
      className={cn(
        "inline-flex items-baseline tracking-tight select-none transition-opacity duration-200 hover:opacity-90",
        sizeClasses[size],
        className
      )}
      style={{ fontFamily: "var(--font-fraunces), serif" }}
      aria-label="Viral Dept."
    >
      <span className={cn("font-black", colorClasses[variant])}>Viral</span>
      <span className={cn("italic font-medium ml-[1px]", colorClasses[variant])}>Dept.</span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b261e]/40 rounded-sm">
        {content}
      </Link>
    );
  }

  return content;
}
