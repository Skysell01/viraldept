"use client";

import React, { useRef, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Compass,
  Sparkles,
  Clapperboard,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
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

interface StepData {
  step: string;
  name: string;
  tagline: string;
  description: string;
  deliverable: string;
  icon: React.ComponentType<{ className?: string }>;
  imageSrc: string;
}

const STEPS: StepData[] = [
  {
    step: "01",
    name: "Discover",
    tagline: "Vision & Briefing",
    description:
      "First, we understand your goals, audience, vision, and campaign requirements.",
    deliverable: "Campaign Blueprint & Creative Angles",
    icon: Compass,
    imageSrc: "/assets/images/process/process-discover.jpg",
  },
  {
    step: "02",
    name: "Match",
    tagline: "Vetted Creator Roster",
    description:
      "We find the right creators and connect them with brands based on audience, niche, and creative fit.",
    deliverable: "Curated Shortlist & Negotiated Rates",
    icon: Sparkles,
    imageSrc: "/assets/images/process/process-match.jpg",
  },
  {
    step: "03",
    name: "Create",
    tagline: "Shooting & Direction",
    description:
      "We bring campaigns to life with creative direction, content production, and seamless collaboration.",
    deliverable: "Native High-Retention Reels & Ads",
    icon: Clapperboard,
    imageSrc: "/assets/images/process/process-create.jpg",
  },
  {
    step: "04",
    name: "Amplify",
    tagline: "Launch & Analytics",
    description:
      "We launch, monitor, measure, and optimize campaigns to maximize their impact.",
    deliverable: "Live Dashboard & Performance Report",
    icon: TrendingUp,
    imageSrc: "/assets/images/process/process-amplify.jpg",
  },
];

/**
 * Single Process Card Component
 * Showcases authentic process visual with smooth hover scale, large step numbers, and editorial styling
 */
function ProcessCard({ data }: { data: StepData }) {
  const IconComponent = data.icon;

  return (
    <div
      className={cn(
        "process-card group relative h-full rounded-3xl p-6 sm:p-8 bg-white border border-[#8b261e]/12 shadow-[0_4px_24px_-4px_rgba(30,22,20,0.04)]",
        "flex flex-col justify-between transition-all duration-300 hover:shadow-[0_16px_40px_-8px_rgba(139,38,30,0.12)] hover:border-[#8b261e]/30 hover:-translate-y-2",
        "select-none overflow-hidden"
      )}
    >
      {/* Decorative top ambient glow on hover */}
      <div className="pointer-events-none absolute -top-16 -right-16 w-36 h-36 rounded-full bg-[#8b261e]/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Section */}
      <div>
        {/* Top Row: Large Step Number + Phase Icon */}
        <div className="flex items-center justify-between mb-6">
          <span
            className="text-4xl sm:text-5xl font-black text-[#1e1614]/20 group-hover:text-[#8b261e] transition-colors duration-300 tracking-tighter"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {data.step}
          </span>

          <div className="p-3 rounded-2xl bg-[#fbf0ec] text-[#8b261e] border border-[#8b261e]/15 group-hover:scale-110 group-hover:bg-[#8b261e] group-hover:text-[#fff8f6] transition-all duration-300">
            <IconComponent className="w-5 h-5" />
          </div>
        </div>

        {/* Process Image Showcase Window */}
        <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#f4ece3] mb-6 border border-[#8b261e]/10 shadow-inner">
          <Image
            src={data.imageSrc}
            alt={`${data.name} process stage`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 85vw, 25vw"
          />
        </div>

        {/* Step Title & Tagline */}
        <div className="space-y-1.5 mb-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#8b261e]">
            {data.tagline}
          </span>
          <h3
            className="text-2xl font-bold text-[#1e1614] group-hover:text-[#8b261e] transition-colors"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {data.name}
          </h3>
        </div>

        {/* Official Description */}
        <p className="text-sm text-[#524441] leading-relaxed mb-6">
          {data.description}
        </p>
      </div>

      {/* Card Bottom Deliverable Badge */}
      <div className="pt-4 border-t border-[#8b261e]/10 flex items-center justify-between text-xs text-[#796a66]">
        <div className="flex items-center gap-1.5 font-medium">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#8b261e]" />
          <span>{data.deliverable}</span>
        </div>
        <ArrowRight className="w-4 h-4 text-[#8b261e]/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#8b261e]" />
      </div>
    </div>
  );
}

/**
 * Phase 5 — How Do We Operate / Our Process Section
 * Animated 4-step interactive timeline with video previews, large numerals, and GSAP ScrollTrigger
 */
export function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const timelineBarRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Reveal header
      if (headingRef.current) {
        gsap.fromTo(
          headingRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headingRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 2. Animate timeline bar progress
      if (timelineBarRef.current) {
        gsap.fromTo(
          timelineBarRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power2.out",
            transformOrigin: "left center",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 75%",
            },
          }
        );
      }

      // 3. Staggered Process Cards entrance with subtle scale & rotation
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll(".process-card");
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 50,
            scale: 0.94,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.16,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: "top 78%",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full pt-10 sm:pt-14 md:pt-16 pb-10 sm:pb-12 md:pb-14 bg-[#faf7f2] border-b border-[#8b261e]/10 overflow-hidden"
    >
      <Container size="default">
        {/* =========================================================================
            HEADER: OUR PROCESS
            ========================================================================= */}
        <div ref={headingRef} className="max-w-3xl mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4ece3] border border-[#8b261e]/15 text-xs font-semibold tracking-wider text-[#8b261e] uppercase">
            <Clock className="w-3.5 h-3.5" />
            <span>OUR PROCESS</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1e1614] leading-[1.08]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            From first hello to{" "}
            <span className="text-[#8b261e] underline decoration-[#8b261e]/30 underline-offset-8">
              viral impact.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-[#524441] leading-relaxed max-w-2xl">
            Simple process. Smart connections. Content that makes people stop scrolling.
          </p>
        </div>

        {/* =========================================================================
            HORIZONTAL CONNECTING TRACK (Desktop visual connector)
            ========================================================================= */}
        <div className="hidden lg:block relative w-full mb-10 px-8">
          <div className="h-0.5 w-full bg-[#8b261e]/10 relative">
            <div
              ref={timelineBarRef}
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#8b261e]/20 via-[#8b261e] to-[#8b261e]/40 h-full w-full"
            />
          </div>
          {/* Step markers along the line */}
          <div className="absolute -top-1.5 left-0 right-0 flex justify-between px-16 pointer-events-none">
            <span className="w-3 h-3 rounded-full bg-[#8b261e] ring-4 ring-[#faf7f2]" />
            <span className="w-3 h-3 rounded-full bg-[#8b261e] ring-4 ring-[#faf7f2]" />
            <span className="w-3 h-3 rounded-full bg-[#8b261e] ring-4 ring-[#faf7f2]" />
            <span className="w-3 h-3 rounded-full bg-[#8b261e] ring-4 ring-[#faf7f2]" />
          </div>
        </div>

        {/* =========================================================================
            THE FOUR INTERACTIVE PROCESS CARDS (Mobile Horizontal Slider, Desktop 4-col Grid)
            ========================================================================= */}
        <div
          ref={cardsContainerRef}
          className={cn(
            // Mobile: Horizontal swipe carousel with snap, 1 card fully visible + peek of 2nd card
            "flex overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden gap-4 sm:gap-5 pb-4 pt-1",
            "-mx-4 px-4 sm:-mx-6 sm:px-6",
            // Desktop/Tablet: Responsive grid
            "md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-6 lg:gap-7 md:overflow-visible md:pb-0 md:mx-0 md:px-0"
          )}
        >
          {STEPS.map((step) => (
            <div
              key={step.step}
              className="snap-start shrink-0 w-[82vw] max-w-[320px] md:w-auto md:max-w-none flex flex-col h-full"
            >
              <ProcessCard data={step} />
            </div>
          ))}
        </div>

        {/* Mobile Swipe Guidance Indicator */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-3 text-[11px] font-semibold text-[#8b261e] tracking-wider uppercase">
          <span>Swipe to explore 4-step workflow</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>

        {/* =========================================================================
            BOTTOM STRIP: TIMELINE EXPECTATION & ACTION
            ========================================================================= */}
        <div className="mt-8 sm:mt-10 p-6 sm:p-8 rounded-3xl bg-white border border-[#8b261e]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8b261e]">
              <Clock className="w-4 h-4" />
              <span>Four Steps • Four Weeks</span>
            </div>
            <h4
              className="text-xl sm:text-2xl font-bold text-[#1e1614]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Ready to launch your next campaign?
            </h4>
            <p className="text-xs sm:text-sm text-[#524441]">
              No 3-month onboarding delays. We brief, script, shoot, and deploy within a month.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button href="#contact" size="lg" variant="primary" withArrow>
              Start Your 4-Week Sprint
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
