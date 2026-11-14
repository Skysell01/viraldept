"use client";

import React, { useRef, useState, useEffect, useSyncExternalStore } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Sparkles,
  Play,
  VolumeX,
  Layers,
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

interface ServiceItem {
  number: string;
  title: string;
  tagline: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
  colSpan: string; // Tailwind grid span
  variant?: "light" | "tinted" | "featured";
  aspectRatio?: "16:9" | "9:16" | "4:3";
  features?: string[];
}

const SERVICES: ServiceItem[] = [
  {
    number: "01",
    title: "Influencer Marketing",
    tagline: "Targeted Discovery & High-ROI Campaigns",
    description:
      "Connecting brands with the right influencers to create authentic brand awareness and meaningful engagement.",
    videoSrc: "/videos/services/influencer-marketing.mp4",
    posterSrc: "/images/video-posters/influencer-marketing-poster.webp",
    colSpan: "lg:col-span-7",
    variant: "featured",
    aspectRatio: "16:9",
    features: [
      "Vetted tier-1 creator sourcing & demographic matching",
      "High-engagement brief curation & story direction",
      "Full commercial usage rights & ROI performance analytics",
    ],
  },
  {
    number: "02",
    title: "UGC Content Creation",
    tagline: "Relatable & Native Reels",
    description:
      "Creating relatable, engaging user-generated-style content that feels natural and connects with audiences.",
    videoSrc: "/videos/services/ugc-content.mp4",
    posterSrc: "/images/video-posters/ugc-content-poster.webp",
    colSpan: "lg:col-span-5",
    variant: "light",
    aspectRatio: "9:16",
  },
  {
    number: "03",
    title: "Campaign Management",
    tagline: "Flawless Execution",
    description:
      "Managing creator outreach, briefs, negotiations, timelines, approvals, and campaign execution.",
    videoSrc: "/videos/services/campaign-management.mp4",
    posterSrc: "/images/video-posters/campaign-management-poster.webp",
    colSpan: "lg:col-span-4",
    variant: "light",
    aspectRatio: "9:16",
  },
  {
    number: "04",
    title: "Brand Collaborations",
    tagline: "Synergy & Authentic Placement",
    description:
      "Helping influencers discover relevant brands and helping brands build long-term creator partnerships.",
    videoSrc: "/videos/services/brand-collaboration.mp4",
    posterSrc: "/images/video-posters/brand-collaboration-poster.webp",
    colSpan: "lg:col-span-4",
    variant: "tinted",
    aspectRatio: "9:16",
  },
  {
    number: "05",
    title: "Content Strategy",
    tagline: "Storytelling & Retention",
    description:
      "Developing creative concepts and content strategies that align with brand objectives.",
    videoSrc: "/videos/services/content-strategy.mp4",
    posterSrc: "/images/video-posters/content-strategy-poster.webp",
    colSpan: "lg:col-span-4",
    variant: "light",
    aspectRatio: "9:16",
  },
];

/**
 * Service Card Component with Interactive Hover/Touch Video Preview
 */
function ServiceCard({
  service,
  reducedMotion,
}: {
  service: ServiceItem;
  reducedMotion: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (reducedMotion) return;
    const v = videoRef.current;
    if (v) {
      v.defaultMuted = true;
      v.muted = true;
      const playPromise = v.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (service.number === "01") return;
    const v = videoRef.current;
    if (v) {
      v.pause();
      setIsPlaying(false);
    }
  };

  // On touch devices, play when card is tapped or in view
  const handleTouch = () => {
    if (reducedMotion) return;
    const v = videoRef.current;
    if (!v) return;
    v.defaultMuted = true;
    v.muted = true;
    if (isPlaying) {
      if (service.number !== "01") {
        v.pause();
        setIsPlaying(false);
      }
    } else {
      v.play()
        .then(() => setIsPlaying(true))
        .catch(() => {});
    }
  };

  // Autoplay video on mobile when card scrolls into viewport
  useEffect(() => {
    if (reducedMotion || !cardRef.current || !videoRef.current) return;

    const card = cardRef.current;
    const video = videoRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isMobile = window.innerWidth <= 1024 || "ontouchstart" in window;
          if (entry.isIntersecting) {
            if (isMobile || service.number === "01") {
              video.defaultMuted = true;
              video.muted = true;
              video
                .play()
                .then(() => setIsPlaying(true))
                .catch(() => {});
            }
          } else {
            if (isMobile) {
              video.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: 0.3,
      }
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, [reducedMotion, service.number]);

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleTouch}
      className={cn(
        "service-card group relative rounded-3xl p-6 sm:p-8 transition-all duration-300 select-none",
        "flex flex-col justify-between overflow-hidden cursor-pointer",
        service.variant === "tinted"
          ? "bg-[#faf0ea] border border-[#8b261e]/20 hover:border-[#8b261e]/40 shadow-sm hover:shadow-lg"
          : service.variant === "featured"
          ? "bg-white border border-[#8b261e]/15 shadow-sm hover:shadow-xl hover:border-[#8b261e]/30"
          : "bg-white border border-[#8b261e]/10 shadow-[0_2px_12px_rgba(30,22,20,0.03)] hover:shadow-lg hover:border-[#8b261e]/25",
        "hover:-translate-y-1.5",
        service.colSpan
      )}
    >
      <div className="space-y-5 sm:space-y-6">
        {/* Top Header: Number + Action Arrow */}
        <div className="flex items-center justify-between">
          <span
            className="text-3xl sm:text-4xl font-black text-[#1e1614]/25 group-hover:text-[#8b261e] transition-colors duration-300"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            {service.number}
          </span>

          <div className="w-10 h-10 rounded-full border border-[#8b261e]/20 text-[#8b261e] flex items-center justify-center transition-all duration-300 group-hover:bg-[#8b261e] group-hover:text-[#fff8f6] group-hover:scale-105">
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>

        {/* Video Window & Content Details */}
        <div className="space-y-5">
          {/* Video Window: Landscape for Card 01, portrait for cards 02-05 */}
          <div
            className={cn(
              "relative rounded-2xl overflow-hidden bg-[#120b0a] border border-[#8b261e]/10 shadow-inner w-full",
              service.aspectRatio === "16:9"
                ? "aspect-[16/9] sm:aspect-[16/10]"
                : "aspect-[9/12] sm:aspect-[9/11]"
            )}
          >
              <div
                className={cn(
                  "absolute inset-0 transition-opacity duration-500 z-10",
                  isPlaying ? "opacity-0 pointer-events-none" : "opacity-100"
                )}
              >
                <Image
                  src={service.posterSrc}
                  alt={`${service.title} reel preview`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {!reducedMotion && (
                <video
                  ref={videoRef}
                  src={service.videoSrc}
                  poster={service.posterSrc}
                  autoPlay={service.number === "01"}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  onPlay={() => setIsPlaying(true)}
                  onPlaying={() => setIsPlaying(true)}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}

              <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold tracking-wide uppercase pointer-events-none">
                <Play className="w-2.5 h-2.5 text-[#e57368] fill-current" />
                <span>{isPlaying ? "Playing" : service.number === "01" ? "Creator Reel" : "Hover to play"}</span>
              </div>

              <div className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-black/40 backdrop-blur-sm text-white/70 pointer-events-none">
                <VolumeX className="w-3 h-3" />
              </div>
            </div>

            {/* Content Details Underneath the Video */}
            <div className="space-y-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#8b261e]">
                {service.tagline}
              </span>
              <h3
                className="text-2xl sm:text-3xl font-bold text-[#1e1614] group-hover:text-[#8b261e] transition-colors leading-tight"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                {service.title}
              </h3>
              <p className="text-sm sm:text-base text-[#524441] leading-relaxed">
                {service.description}
              </p>

              {service.features && service.features.length > 0 && (
                <ul className="space-y-2 py-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2.5 text-xs text-[#524441]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#8b261e] shrink-0" />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
  );
}

/**
 * Phase 6 — What We Do / Our Services Section
 * Video-first creative agency portfolio grid showcasing 6 core influencer marketing services
 */
export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  useEffect(() => {
    if (typeof window === "undefined" || reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Reveal section header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
            },
          }
        );
      }

      // 2. Staggered card entrance
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll(".service-card");
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 45,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
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
      id="services"
      className="relative w-full pt-10 sm:pt-14 md:pt-16 pb-12 sm:pb-16 md:pb-20 bg-[#faf7f2] border-b border-[#8b261e]/10 overflow-hidden"
    >
      <Container size="default">
        {/* =========================================================================
            SECTION HEADER
            ========================================================================= */}
        <div ref={headerRef} className="max-w-3xl mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#f4ece3] border border-[#8b261e]/15 text-xs font-semibold tracking-wider text-[#8b261e] uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>WHAT WE DO</span>
          </div>

          <h2
            className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1e1614] leading-[1.08]"
            style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
          >
            Good content gets attention.{" "}
            <span className="text-[#8b261e] underline decoration-[#8b261e]/30 underline-offset-8">
              Great strategy makes it count.
            </span>
          </h2>

          <p className="text-base sm:text-xl text-[#524441] leading-relaxed max-w-2xl">
            From finding the right voices to creating campaigns people remember, we take care of the entire influencer marketing journey.
          </p>
        </div>

        {/* =========================================================================
            CREATIVE ASYMMETRICAL PORTFOLIO GRID
            ========================================================================= */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8"
        >
          {SERVICES.map((service) => (
            <ServiceCard
              key={service.number}
              service={service}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* =========================================================================
            BOTTOM STRIP: CUSTOM SCOPES & CONSULTATION
            ========================================================================= */}
        <div className="mt-8 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-white border border-[#8b261e]/15 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8b261e]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Full-Stack Influencer Agency</span>
            </div>
            <h4
              className="text-xl sm:text-2xl font-bold text-[#1e1614]"
              style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
            >
              Need a bespoke campaign bundle?
            </h4>
            <p className="text-xs sm:text-sm text-[#524441] leading-relaxed">
              We tailor multi-creator packages covering everything from high-volume UGC asset production to viral influencer takeovers.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Button href="#contact" size="lg" variant="primary" withArrow>
              Request Campaign Proposal
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
