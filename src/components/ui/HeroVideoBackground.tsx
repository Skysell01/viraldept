"use client";

import React, { useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { HERO_VIDEOS } from "@/constants/videos";
import { cn } from "@/lib/utils";

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => mediaQuery.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

interface HeroVideoBackgroundProps {
  className?: string;
  overlayClassName?: string;
  children?: React.ReactNode;
}

export function HeroVideoBackground({
  className,
  overlayClassName,
  children,
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  return (
    <div className={cn("relative w-full overflow-hidden select-none bg-[#1e1614]", className)}>
      {/* Background Poster / Fallback */}
      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-1000 z-0",
          isLoaded && !reducedMotion ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <Image
          src={HERO_VIDEOS.desktop.poster}
          alt="Viral Dept. Influencer Marketing Hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Responsive Video Element */}
      {!reducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={HERO_VIDEOS.desktop.poster}
          onCanPlayThrough={() => setIsLoaded(true)}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 z-0",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
        >
          {/* Mobile cut when screen width <= 768px */}
          <source
            media="(max-width: 768px)"
            src={HERO_VIDEOS.mobile.src}
            type="video/mp4"
          />
          {/* Desktop cut */}
          <source
            src={HERO_VIDEOS.desktop.src}
            type="video/mp4"
          />
        </video>
      )}

      {/* Cinematic Gradient Overlays for contrast & brand warmth */}
      <div
        className={cn(
          "absolute inset-0 z-10 bg-gradient-to-t from-[#1e1614]/80 via-black/30 to-black/40 pointer-events-none",
          overlayClassName
        )}
      />

      {/* Content slot */}
      {children && <div className="relative z-20 w-full">{children}</div>}
    </div>
  );
}
