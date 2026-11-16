"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const contactSection = document.getElementById("contact");

      // Show after scrolling past 350px
      const pastThreshold = scrollY > 350;

      // Hide if contact form is in viewport
      let isOverContact = false;
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        // If top of contact section is near viewport bottom or already inside
        if (rect.top <= window.innerHeight * 0.75 && rect.bottom >= 0) {
          isOverContact = true;
        }
      }

      setIsVisible(pastThreshold && !isOverContact);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById("contact-brand") || document.getElementById("contact");
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      if (typeof window !== "undefined") {
        window.location.hash = "#contact-brand";
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.92 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-40"
        >
          <a
            href="#contact-brand"
            onClick={handleClick}
            className="group relative flex items-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#8b261e] text-[#fff8f6] font-semibold text-xs sm:text-sm tracking-wide shadow-[0_12px_32px_rgba(139,38,30,0.45)] hover:shadow-[0_16px_40px_rgba(139,38,30,0.6)] hover:bg-[#731e17] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20 select-none cursor-pointer"
            aria-label="Book a strategy call"
          >
            {/* Ambient Pulsing Glow Dot */}
            <span className="relative flex h-2 sm:h-2.5 w-2 sm:w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f5c6c0] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 sm:h-2.5 w-2 sm:w-2.5 bg-[#fbf0ec]" />
            </span>

            {/* Sparkle Icon */}
            <Sparkles className="w-3.5 h-3.5 text-[#f5c6c0] shrink-0" />

            {/* Text */}
            <span className="font-bold tracking-tight" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
              Book a Strategy Call
            </span>

            {/* Action Arrow */}
            <span className="w-5 h-5 rounded-full bg-white/15 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight className="w-3 h-3 text-[#fff8f6]" />
            </span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

