"use client";

import React, { useRef, useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
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

interface VideoPlayerProps {
  src: string;
  poster: string;
  fallbackImage?: string;
  alt?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  aspectRatio?: "16:9" | "9:16" | "4:3" | "1:1";
  playOnHover?: boolean;
  lazyLoad?: boolean;
  overlayOpacity?: number; // 0 to 1
}

export function VideoPlayer({
  src,
  poster,
  fallbackImage,
  alt = "Video player",
  className,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
  aspectRatio = "16:9",
  playOnHover = false,
  lazyLoad = true,
  overlayOpacity = 0,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(!lazyLoad);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // IntersectionObserver for lazy loading below the fold
  useEffect(() => {
    if (!lazyLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            if (autoPlay && !playOnHover && !reducedMotion && videoRef.current) {
              videoRef.current.play().catch(() => {});
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause();
            }
          }
        });
      },
      { threshold: 0.15, rootMargin: "100px" }
    );

    const currentElem = containerRef.current;
    if (currentElem) observer.observe(currentElem);

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, [lazyLoad, autoPlay, playOnHover, reducedMotion]);

  const handleMouseEnter = () => {
    if (playOnHover && !reducedMotion && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (playOnHover && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const aspectClasses = {
    "16:9": "aspect-[16/9]",
    "9:16": "aspect-[9/16]",
    "4:3": "aspect-[4/3]",
    "1:1": "aspect-square",
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative overflow-hidden bg-[#f0e8de] select-none",
        aspectClasses[aspectRatio],
        className
      )}
    >
      {/* Fallback image when reduced-motion is requested or video errors */}
      {(reducedMotion || hasError) ? (
        <Image
          src={poster || fallbackImage || "/assets/images/hero-image.jpg"}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <>
          {/* Poster image visible until video can play */}
          <div
            className={cn(
              "absolute inset-0 transition-opacity duration-700 pointer-events-none z-10",
              isLoaded ? "opacity-0" : "opacity-100"
            )}
          >
            <Image
              src={poster}
              alt={alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={!lazyLoad}
            />
          </div>

          {/* Actual Video element, loaded when in view */}
          {isInView && (
            <video
              ref={videoRef}
              src={src}
              poster={poster}
              loop={loop}
              muted={muted}
              playsInline={playsInline}
              autoPlay={autoPlay && !playOnHover}
              onLoadedData={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-700",
                isLoaded ? "opacity-100" : "opacity-0"
              )}
            />
          )}
        </>
      )}

      {/* Decorative Overlay for contrast */}
      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none z-20 bg-black"
          style={{ opacity: overlayOpacity }}
        />
      )}
    </div>
  );
}
