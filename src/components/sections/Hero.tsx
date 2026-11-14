"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ArrowRight, Sparkles, Video, Users, Building2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
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

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const floatingBadgeRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Ensure background video plays automatically and muted
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;

    const playVideo = () => {
      setIsVideoLoaded(true);
      video.play().catch(() => {
        // Autoplay policy fallback
      });
    };

    video.addEventListener("loadeddata", playVideo);
    video.addEventListener("canplay", playVideo);
    video.addEventListener("playing", () => setIsVideoLoaded(true));

    playVideo();

    return () => {
      video.removeEventListener("loadeddata", playVideo);
      video.removeEventListener("canplay", playVideo);
    };
  }, []);

  // GSAP Entrance Animation
  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        delay: 0.15,
      });

      // 1. Eyebrow badge
      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: -20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8 }
        );
      }

      // 2. Headline word/line reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll(".hero-word");
        if (words.length > 0) {
          tl.fromTo(
            words,
            { opacity: 0, y: 35, rotateX: -15 },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.9,
              stagger: 0.08,
            },
            "-=0.5"
          );
        } else {
          tl.fromTo(
            headlineRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.9 },
            "-=0.5"
          );
        }
      }

      // 3. Supporting headline
      if (subheadlineRef.current) {
        tl.fromTo(
          subheadlineRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.5"
        );
      }

      // 4. Description
      if (descriptionRef.current) {
        tl.fromTo(
          descriptionRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.5"
        );
      }

      // 5. CTA buttons stagger
      if (ctaGroupRef.current) {
        const buttons = ctaGroupRef.current.children;
        tl.fromTo(
          buttons,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 },
          "-=0.4"
        );
      }

      // 6. Floating badge
      if (floatingBadgeRef.current) {
        tl.fromTo(
          floatingBadgeRef.current,
          { opacity: 0, x: 20, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8 },
          "-=0.4"
        );
      }

      // 7. Scroll indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(
          scrollIndicatorRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3"
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToNextSection = () => {
    const nextElem = document.getElementById("brands") || document.getElementById("case-study");
    if (nextElem) {
      nextElem.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#120b0a] text-white select-none"
    >
      {/* =========================================================================
          BACKGROUND VIDEO & POSTER FALLBACK
          ========================================================================= */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {/* High-resolution WebP poster fallback */}
        <div
          className={cn(
            "absolute inset-0 transition-opacity duration-700",
            isVideoLoaded && !reducedMotion ? "opacity-0" : "opacity-100"
          )}
        >
          <Image
            src={HERO_VIDEOS.desktop.poster}
            alt="Viral Dept. Creator and Influencer Production"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Video Element: autoplays muted in loop with mobile/desktop source tags */}
        {!reducedMotion && (
          <video
            ref={videoRef}
            src={HERO_VIDEOS.desktop.src}
            poster={HERO_VIDEOS.desktop.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            {/* Mobile portrait cut (max-width: 768px) */}
            <source
              media="(max-width: 768px)"
              src={HERO_VIDEOS.mobile.src}
              type="video/mp4"
            />
            {/* Desktop 16:9 cinematic landscape cut */}
            <source
              src={HERO_VIDEOS.desktop.src}
              type="video/mp4"
            />
          </video>
        )}

        {/* Balanced Subtle Dark Overlay (Lightened for brighter video clarity while maintaining text legibility) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120b0a]/80 via-[#120b0a]/45 to-[#120b0a]/50 z-10" />
        
        {/* Subtle Brand Crimson Ambient Atmospheric Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#8b261e]/20 blur-[150px] pointer-events-none z-10" />
      </div>

      {/* Spacing spacer for header height */}
      <div className="h-16 md:h-20 w-full shrink-0 z-20" />

      {/* =========================================================================
          HERO MAIN CONTENT
          ========================================================================= */}
      <div ref={contentRef} className="relative z-20 w-full my-auto py-10 md:py-16">
        <Container size="default">
          <div className="max-w-4xl mx-auto text-center md:text-left md:mx-0">
            {/* Floating top row: Eyebrow text + Floating live studio badge */}
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-4 mb-6 md:mb-8">
              {/* Eyebrow Text */}
              <div
                ref={eyebrowRef}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold tracking-widest text-[#f5c6c0] uppercase shadow-inner"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#e57368]" />
                <span>INFLUENCE. CONNECT. GROW.</span>
              </div>

              {/* Floating Live Indicator Badge */}
              <div
                ref={floatingBadgeRef}
                className="hidden lg:inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#8b261e]/20 border border-[#8b261e]/40 backdrop-blur-md text-xs text-white/90"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e57368] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8b261e]" />
                </span>
                <span className="font-medium text-white/80">Active Creator Network</span>
                <span className="text-white/40">•</span>
                <span className="text-[#f5c6c0] font-semibold">Q1/Q2 Collabs Open</span>
              </div>
            </div>

            {/* Main Headline with word-split for GSAP reveal */}
            <h1
              ref={headlineRef}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-[5rem] font-bold tracking-tight text-white leading-[1.06] mb-5 md:mb-6 drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              <span className="inline-block hero-word">We</span>{" "}
              <span className="inline-block hero-word">bring</span>{" "}
              <span className="inline-block hero-word text-[#e57368] font-black underline decoration-[#8b261e]/60 underline-offset-8">
                brands
              </span>{" "}
              <span className="inline-block hero-word">and</span>{" "}
              <span className="inline-block hero-word text-[#f29f96] font-black italic">
                creators
              </span>{" "}
              <span className="inline-block hero-word">together.</span>
            </h1>

            {/* Supporting Headline */}
            <p
              ref={subheadlineRef}
              className="text-xl sm:text-2xl md:text-3xl font-medium text-white/95 tracking-tight leading-snug mb-5 drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              You bring the vision.{" "}
              <span className="text-[#f5c6c0] font-semibold">We bring the influence.</span>
            </p>

            {/* Supporting Description */}
            <p
              ref={descriptionRef}
              className="text-base sm:text-lg md:text-xl text-white/85 max-w-2xl leading-relaxed mb-8 md:mb-10 drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            >
              Whether you&apos;re a brand looking for the right creators or an influencer looking for your next big collaboration, you&apos;re in the right place.
            </p>

            {/* =========================================================================
                TWO PRIMARY CTA BUTTONS
                1. "I'm a Brand" -> Navigates to #contact-brand
                2. "I'm an Influencer" -> Navigates to #contact-influencer
                ========================================================================= */}
            <div
              ref={ctaGroupRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1"
            >
              {/* Brand CTA */}
              <Link
                href="#contact-brand"
                className={cn(
                  "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 shadow-lg cursor-pointer",
                  "bg-[#8b261e] text-[#fff8f6] hover:bg-[#731e17] hover:scale-[1.03] active:scale-[0.98]",
                  "hover:shadow-[#8b261e]/40 hover:shadow-xl border border-[#ba3a30]"
                )}
              >
                <Building2 className="w-5 h-5 text-[#f5c6c0] transition-transform duration-200 group-hover:scale-110" />
                <span>I&apos;m a Brand</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              {/* Influencer CTA */}
              <Link
                href="#contact-influencer"
                className={cn(
                  "group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-base font-semibold transition-all duration-300 cursor-pointer",
                  "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 hover:border-white/40 hover:scale-[1.03] active:scale-[0.98]",
                  "shadow-md hover:shadow-white/10"
                )}
              >
                <Users className="w-5 h-5 text-[#f5c6c0] transition-transform duration-200 group-hover:scale-110" />
                <span>I&apos;m an Influencer</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Live helper status pill */}
            <div className="mt-6 flex items-center justify-center md:justify-start gap-4 text-xs text-white/50">
              <span className="flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5 text-[#e57368]" />
                High-Conversion Reels &amp; UGC
              </span>
              <span>•</span>
              <span>Zero Agency Fluff</span>
              <span>•</span>
              <span>Guaranteed Creator Match</span>
            </div>
          </div>
        </Container>
      </div>

      {/* =========================================================================
          SCROLL INDICATOR (Bottom of viewport)
          ========================================================================= */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-20 w-full pb-8 md:pb-10 pt-2 flex flex-col items-center justify-center"
      >
        <button
          onClick={scrollToNextSection}
          className="group flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b261e] rounded-full p-2"
          aria-label="Scroll to discover our work"
        >
          <span className="text-[11px] font-semibold tracking-widest uppercase text-white/60 group-hover:text-white transition-colors">
            Scroll to explore
          </span>
          <div className="w-6 h-10 rounded-full border-2 border-white/30 group-hover:border-white/70 flex items-start justify-center p-1.5 transition-colors">
            <span className="w-1.5 h-2 bg-[#e57368] rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
