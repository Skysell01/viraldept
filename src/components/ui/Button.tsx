"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowRight } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  withArrow?: boolean;
  arrowType?: "up-right" | "right";
  icon?: React.ReactNode;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  href,
  external,
  withArrow = false,
  arrowType = "right",
  icon,
  ...props
}: ButtonProps) {
  const baseClasses =
    "group inline-flex items-center justify-center font-medium rounded-full transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b261e]/40 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const sizeClasses = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5",
  };

  const variantClasses = {
    primary:
      "bg-[#8b261e] text-[#fff8f6] shadow-sm hover:bg-[#731e17] hover:shadow-md hover:shadow-[#8b261e]/20 hover:scale-[1.02] active:scale-[0.98]",
    secondary:
      "bg-[#f0e8de] text-[#1e1614] hover:bg-[#e8ded3] hover:scale-[1.02] active:scale-[0.98]",
    outline:
      "border border-[#8b261e]/25 text-[#8b261e] hover:bg-[#8b261e]/5 hover:border-[#8b261e]/40 active:scale-[0.98]",
    ghost:
      "text-[#1e1614]/80 hover:text-[#8b261e] hover:bg-[#8b261e]/5",
  };

  const arrowIcon = withArrow ? (
    arrowType === "up-right" ? (
      <ArrowUpRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    ) : (
      <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
    )
  ) : null;

  const content = (
    <>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {arrowIcon}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
        >
          {content}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      {...props}
    >
      {content}
    </button>
  );
}

