"use client";

import React, { useRef, useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  TrendingUp,
  Eye,
  Heart,
  PackageCheck,
  Sparkles,
  ArrowRight,
  Award,
  CheckCircle2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BRAND_ASSETS } from "@/constants/assets";
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

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

// Hook to animate numbers smoothly when scrolled into view
function useCounter(target: number, duration: number = 2000, trigger: boolean = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) return;

    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out expo
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(easeOut * target));

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [target, duration, trigger]);

  return count;
}

export function CaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.15 }
    );

    const currentElem = sectionRef.current;
    if (currentElem) observer.observe(currentElem);

    return () => {
      if (currentElem) observer.unobserve(currentElem);
    };
  }, []);

  // Highlight metric counters
  const animatedViews = useCounter(1267418, 2200, isInView || reducedMotion);
  const animatedInteractions = useCounter(108345, 2000, isInView || reducedMotion);
  const animatedCases = useCounter(20000, 1800, isInView || reducedMotion);

  const reelResults = [
    {
      id: "reel-1",
      title: "Spending quality time with the people you love",
      theme: "Relatable Couple & Family Gameplay",
      views: "147K",
      viewsRaw: "147,000",
      interactions: "12,838",
      screenshot: BRAND_ASSETS.images.reelInsights1,
      badge: "High Engagement",
    },
    {
      id: "reel-2",
      title: "Romanticising your evenings",
      theme: "Aesthetic Lifestyle & Date Night Hook",
      views: "691K",
      viewsRaw: "691,240",
      interactions: "49,384",
      screenshot: BRAND_ASSETS.images.reelInsights2,
      badge: "Top Performer",
      featured: true,
    },
    {
      id: "reel-3",
      title: "Solving a real-time murder mystery",
      theme: "Native Product Unboxing & Mystery Clues",
      views: "429K",
      viewsRaw: "429,178",
      interactions: "46,123",
      screenshot: BRAND_ASSETS.images.reelInsights3,
      badge: "High Conversion",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="case-study"
      className="relative w-full pt-10 sm:pt-14 md:pt-16 pb-12 sm:pb-16 md:pb-20 bg-[#faf7f2] border-b border-[#8b261e]/10 overflow-hidden"
    >
      <Container size="default">
        {/* =========================================================================
            1. SECTION HEADER (Editorial & Bold)
            ========================================================================= */}
        <div className="max-w-3xl mb-8 md:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4ece3] border border-[#8b261e]/15 text-xs font-semibold tracking-wider text-[#8b261e] uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED CAMPAIGN / REAL RESULTS</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1e1614] leading-[1.08]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Not just views.{" "}
            <span className="text-[#8b261e] underline decoration-[#8b261e]/30 underline-offset-8">
              Real attention.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-[#524441] leading-relaxed max-w-2xl">
            We partnered with Case Crushers to bring their mystery board games to life through engaging creator-led content.
          </p>
        </div>

        {/* =========================================================================
            2. FEATURED CASE CRUSHERS SPLIT HERO: Visual + Highlight Metrics
            ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 md:mb-16">
          {/* Left: Featured Visual Card */}
          <div className="lg:col-span-7">
            <div className="group relative rounded-3xl overflow-hidden bg-white border border-[#8b261e]/15 shadow-[0_20px_50px_-10px_rgba(139,38,30,0.1)] transition-all duration-500 hover:shadow-[0_25px_60px_-10px_rgba(139,38,30,0.15)]">
              {/* Image Aspect Box */}
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-[#f4ece3] overflow-hidden">
                <Image
                  src={BRAND_ASSETS.images.casecrushersCard}
                  alt="Case Crushers Campaign Showcase"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                />

                {/* Floating Highlight Pill */}
                <div className="absolute bottom-5 right-5 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-[#8b261e]/20 text-[#1e1614] shadow-lg text-xs font-bold">
                  <Award className="w-4 h-4 text-[#8b261e]" />
                  <span>Viraldept Campaign Winner</span>
                </div>
              </div>

              {/* Card Meta Footer */}
              <div className="p-6 sm:p-8 bg-white border-t border-[#8b261e]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3
                    className="text-xl font-bold text-[#1e1614]"
                    style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                  >
                    Case Crushers × Viral Dept.
                  </h3>
                  <p className="text-xs sm:text-sm text-[#796a66]">
                    End-to-End Creator Strategy, Production, &amp; Distribution
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#8b261e]">
                  <span>4-Week Campaign Run</span>
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Right: 4 Core Campaign Metrics Grid */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            {/* Metric 1: Total Reel Views */}
            <div className="p-6 rounded-2xl bg-white border border-[#8b261e]/12 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#8b261e]/25">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#796a66]">
                  Total Reel Views
                </span>
                <div className="p-2 rounded-full bg-[#fbf0ec] text-[#8b261e]">
                  <Eye className="w-4 h-4" />
                </div>
              </div>
              <div
                className="text-3xl sm:text-4xl font-extrabold text-[#1e1614] tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {reducedMotion ? "1,267,418" : animatedViews.toLocaleString()}
              </div>
              <p className="mt-1 text-xs text-[#524441]">
                Organic creator impressions across target demographic
              </p>
            </div>

            {/* Metric 2: Total Interactions */}
            <div className="p-6 rounded-2xl bg-white border border-[#8b261e]/12 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#8b261e]/25">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#796a66]">
                  Total Interactions
                </span>
                <div className="p-2 rounded-full bg-[#fbf0ec] text-[#8b261e]">
                  <Heart className="w-4 h-4" />
                </div>
              </div>
              <div
                className="text-3xl sm:text-4xl font-extrabold text-[#8b261e] tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {reducedMotion ? "108,345" : animatedInteractions.toLocaleString()}
              </div>
              <p className="mt-1 text-xs text-[#524441]">
                Comments, shares, saves, and likes on creator reels
              </p>
            </div>

            {/* Sub-grid for Followers & Cases */}
            <div className="grid grid-cols-2 gap-4">
              {/* Metric 3: Instagram Followers */}
              <div className="p-5 rounded-2xl bg-white border border-[#8b261e]/12 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs text-[#796a66] mb-1 font-semibold">
                  <InstagramIcon className="w-3.5 h-3.5 text-[#8b261e]" />
                  <span>Followers</span>
                </div>
                <div
                  className="text-2xl sm:text-3xl font-extrabold text-[#1e1614]"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  14.9K
                </div>
                <span className="text-[11px] text-[#796a66]">Brand Page Growth</span>
              </div>

              {/* Metric 4: Cases Delivered */}
              <div className="p-5 rounded-2xl bg-white border border-[#8b261e]/12 shadow-sm">
                <div className="flex items-center gap-1.5 text-xs text-[#796a66] mb-1 font-semibold">
                  <PackageCheck className="w-3.5 h-3.5 text-[#8b261e]" />
                  <span>Cases</span>
                </div>
                <div
                  className="text-2xl sm:text-3xl font-extrabold text-[#1e1614]"
                  style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                >
                  {reducedMotion ? "20,000" : `${(animatedCases / 1000).toFixed(0)},000`}
                </div>
                <span className="text-[11px] text-[#796a66]">Units Delivered</span>
              </div>
            </div>
          </div>
        </div>

        {/* =========================================================================
            3. THREE REEL PERFORMANCE CARDS (With Authentic Screenshots)
            ========================================================================= */}
        <div className="mb-10 sm:mb-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8b261e] mb-1">
                Content Breakdown
              </p>
              <h3
                className="text-2xl sm:text-4xl font-bold text-[#1e1614]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Results from our Case Crushers campaign
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-[#796a66] max-w-xs">
              Every reel tested unique narrative angles to find winning creative formats.
            </p>
          </div>

          {/* Three Reel Cards: Horizontal Swipe Slider on Mobile, 3-col Grid on Desktop */}
          <div
            className={cn(
              // Mobile: Horizontal swipe carousel with snap, 1 card fully visible + peek of 2nd card
              "flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-4 sm:gap-5 pb-4 pt-1",
              "-mx-4 px-4 sm:-mx-6 sm:px-6",
              // Desktop/Tablet: Clean 3-col grid
              "md:grid md:grid-cols-3 md:gap-6 lg:gap-8 md:overflow-visible md:pb-0 md:mx-0 md:px-0"
            )}
          >
            {reelResults.map((reel) => (
              <div
                key={reel.id}
                className="snap-start shrink-0 w-[82vw] max-w-[320px] md:w-auto md:max-w-none flex flex-col h-full"
              >
                <div
                  className={cn(
                    "group relative rounded-3xl overflow-hidden bg-white border transition-all duration-300 flex flex-col justify-between h-full select-none",
                    reel.featured
                      ? "border-[#8b261e]/30 shadow-[0_16px_40px_-8px_rgba(139,38,30,0.12)] md:-translate-y-2 ring-1 ring-[#8b261e]/20"
                      : "border-[#8b261e]/10 shadow-[0_4px_24px_-4px_rgba(30,22,20,0.05)] hover:border-[#8b261e]/25 hover:shadow-lg hover:-translate-y-1"
                  )}
                >
                  {/* Visual Header / Authentic Insights Screenshot */}
                  <div className="relative aspect-[9/14] w-full bg-[#f5ede4] overflow-hidden">
                    <Image
                      src={reel.screenshot}
                      alt={reel.title}
                      fill
                      className="object-contain p-2 sm:p-3 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 85vw, 33vw"
                    />

                    {/* Floating Performance Pill */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-md",
                          reel.featured
                            ? "bg-[#8b261e] text-[#fff8f6]"
                            : "bg-white/95 text-[#1e1614] border border-[#8b261e]/15"
                        )}
                      >
                        {reel.badge}
                      </span>
                    </div>

                    {/* Gradient mask at bottom of image */}
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                  </div>

                  {/* Card Content & Numbers */}
                  <div className="p-6 sm:p-7 space-y-5 bg-white">
                    <div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[#796a66] block mb-1">
                        {reel.theme}
                      </span>
                      <h4
                        className="text-base sm:text-lg font-bold text-[#1e1614] leading-snug group-hover:text-[#8b261e] transition-colors"
                        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                      >
                        {reel.title}
                      </h4>
                    </div>

                    {/* Two Main Metrics */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#8b261e]/10">
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#796a66] block">
                          Views
                        </span>
                        <span
                          className="text-2xl font-black text-[#1e1614]"
                          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                        >
                          {reel.views}
                        </span>
                      </div>
                      <div>
                        <span className="text-[11px] uppercase tracking-wider text-[#796a66] block">
                          Interactions
                        </span>
                        <span
                          className="text-2xl font-black text-[#8b261e]"
                          style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                        >
                          {reel.interactions}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swipe Guidance Indicator */}
          <div className="flex md:hidden items-center justify-center gap-2 mt-3 text-[11px] font-semibold text-[#8b261e] tracking-wider uppercase">
            <span>Swipe reels</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* =========================================================================
            4. TOTAL RESULTS SUMMARY BANNER (Bottom Impact Card)
            ========================================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#1e1614] via-[#2a1714] to-[#1e1614] text-white p-8 sm:p-12 md:p-14 border border-[#8b261e]/30 shadow-2xl">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#8b261e]/20 blur-[120px] pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#f5c6c0] tracking-wide uppercase">
                <TrendingUp className="w-3.5 h-3.5 text-[#e57368]" />
                Campaign Impact Summary
              </div>
              <h3
                className="text-2xl sm:text-4xl font-bold leading-tight"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                1.2M+ Views. 108K+ Engaged Buyers. Zero Ad Waste.
              </h3>
              <p className="text-sm sm:text-base text-white/75 max-w-2xl leading-relaxed">
                By aligning authentic creator personalities with high-suspense storytelling, we helped Case Crushers establish proof-of-demand, build an engaged community, and ship over 20,000 cases nationwide.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Button
                href="#contact-brand"
                size="lg"
                variant="primary"
                withArrow
                className="w-full justify-center"
              >
                Create My Campaign
              </Button>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center gap-2 text-xs font-medium text-white/70 hover:text-white py-2 transition-colors"
              >
                <span>Talk to our campaign team</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
