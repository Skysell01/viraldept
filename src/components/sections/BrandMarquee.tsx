"use client";

import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CLIENT_BRANDS, ClientBrand } from "@/constants/assets";
import { cn } from "@/lib/utils";

/**
 * Direct Brand Logo Item Component (No Card)
 * Displays the authentic client logo directly with larger dimensions and smooth hover interaction.
 */
function BrandLogoItem({ brand }: { brand: ClientBrand }) {
  return (
    <div
      className={cn(
        "group relative flex items-center justify-center shrink-0 select-none px-2 sm:px-6 md:px-8 py-1.5 sm:py-2",
        "transition-transform duration-300 hover:scale-105"
      )}
    >
      <div className="relative h-10 sm:h-14 md:h-18 w-28 sm:w-44 md:w-52 flex items-center justify-center">
        <Image
          src={brand.logo}
          alt={brand.name}
          fill
          className="object-contain transition-all duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 120px, (max-width: 1024px) 180px, 220px"
        />
      </div>

      {brand.industry && (
        <span className="sr-only">{brand.name} ({brand.industry})</span>
      )}
    </div>
  );
}

/**
 * Phase 3 — Infinite Brand Logo Marquee
 * Displays authentic client brands in a continuous, smooth, infinite horizontal loop.
 */
export function BrandMarquee() {
  // Duplicate array 3 times to ensure a mathematically seamless, glitch-free loop across any viewport width (up to ultra-wide 4K)
  const marqueeItems = [...CLIENT_BRANDS, ...CLIENT_BRANDS, ...CLIENT_BRANDS];

  return (
    <section
      id="brands"
      className="relative w-full pt-6 sm:pt-8 md:pt-10 pb-5 sm:pb-7 md:pb-8 bg-[#faf7f2] border-b border-[#8b261e]/10 overflow-hidden"
    >
      <Container size="default">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#f4ece3] border border-[#8b261e]/15 text-[10px] sm:text-[11px] font-semibold tracking-widest text-[#8b261e] uppercase">
            Proven Agency Partnerships
          </div>
          <p className="text-xs sm:text-sm text-[#524441] leading-relaxed">
            Brands we&apos;ve had the pleasure of creating impact with.
          </p>
        </div>
      </Container>

      {/* Marquee Outer Container with left & right gradient fade masks */}
      <div className="relative w-full overflow-hidden marquee-mask py-2 sm:py-3">
        {/* Left and Right edge fade overlays for browsers that don't support mask-image */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 bg-gradient-to-r from-[#faf7f2] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 md:w-32 bg-gradient-to-l from-[#faf7f2] to-transparent z-10" />

        {/* Scrolling Track (duplicated twice inside for -50% translateX loop) */}
        <div className="animate-marquee-track flex items-center gap-2 sm:gap-6 md:gap-8">
          {marqueeItems.map((brand, idx) => (
            <BrandLogoItem key={`${brand.name}-${idx}`} brand={brand} />
          ))}
          {/* Second identical batch to complete the 100% -> 50% loop */}
          {marqueeItems.map((brand, idx) => (
            <BrandLogoItem key={`${brand.name}-duplicate-${idx}`} brand={brand} />
          ))}
        </div>
      </div>

      {/* Bottom subtle trust metric strip */}
      <Container size="default" className="mt-3 sm:mt-5">
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-x-3 gap-y-1.5 sm:gap-6 md:gap-8 text-[10px] sm:text-xs font-medium text-[#796a66] max-w-sm sm:max-w-none mx-auto">
          <span className="flex items-center justify-center sm:justify-start gap-1.5">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#8b261e] shrink-0" />
            <span>100% Vetted Creators</span>
          </span>
          <span className="flex items-center justify-center sm:justify-start gap-1.5">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#8b261e] shrink-0" />
            <span>Zero Fake Followers</span>
          </span>
          <span className="col-span-2 sm:col-span-1 flex items-center justify-center sm:justify-start gap-1.5">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#8b261e] shrink-0" />
            <span>Guaranteed Deliverables</span>
          </span>
        </div>
      </Container>
    </section>
  );
}
