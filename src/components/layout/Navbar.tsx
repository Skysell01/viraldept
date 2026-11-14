"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Building2, Users } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { NAV_ITEMS, MOBILE_NAV_ITEMS, SOCIAL_LINKS } from "@/constants/navigation";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close menu on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-[#faf7f2]/92 backdrop-blur-md border-b border-[#8b261e]/10 shadow-[0_4px_24px_-4px_rgba(30,22,20,0.06)] py-3.5"
          : "bg-[#120b0a]/30 backdrop-blur-md border-b border-white/10 py-5"
      )}
    >
      <Container size="default">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo
              size="md"
              href="#top"
              variant={isScrolled ? "brand" : "white"}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-200 relative group py-1",
                  isScrolled
                    ? "text-[#1e1614]/80 hover:text-[#8b261e]"
                    : "text-white/80 hover:text-white"
                )}
              >
                <span>{item.label}</span>
                <span
                  className={cn(
                    "absolute bottom-0 left-0 w-0 h-[1.5px] transition-all duration-200 group-hover:w-full",
                    isScrolled ? "bg-[#8b261e]" : "bg-white"
                  )}
                />
              </a>
            ))}
          </nav>

          {/* Desktop Right Actions: Social links */}
          <div className="hidden md:flex items-center gap-2">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.shortCode}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "w-8 h-8 rounded-full border flex items-center justify-center text-xs font-semibold transition-all duration-200",
                  isScrolled
                    ? "border-[#8b261e]/25 text-[#8b261e] hover:bg-[#8b261e] hover:text-[#fff8f6] hover:border-[#8b261e]"
                    : "border-white/25 text-white hover:bg-white hover:text-[#120b0a] hover:border-white"
                )}
                aria-label={social.label}
              >
                {social.shortCode}
              </a>
            ))}
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "p-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2",
                isScrolled
                  ? "text-[#1e1614] hover:bg-[#8b261e]/10 focus-visible:ring-[#8b261e]"
                  : "text-white hover:bg-white/10 focus-visible:ring-white"
              )}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className={cn("w-6 h-6", isScrolled ? "text-[#8b261e]" : "text-white")} />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="md:hidden border-b border-[#8b261e]/10 bg-[#faf7f2]/98 backdrop-blur-xl overflow-hidden text-[#1e1614]"
          >
            <Container size="default" className="py-6 space-y-6">
              {/* 1 to 4: Navigation Links in Specified Sequence */}
              <div className="flex flex-col space-y-2">
                {MOBILE_NAV_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-between py-2.5 text-base font-semibold text-[#1e1614] hover:text-[#8b261e] border-b border-[#8b261e]/10 transition-colors"
                      style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                    >
                      <span className="capitalize">{item.label}</span>
                      <ArrowRight className="w-4 h-4 text-[#8b261e]/60" />
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* CTAs in Specified Sequence: CTA1 (Brand) then CTA2 (Influencer) */}
              <div className="pt-2 space-y-3">
                {/* CTA 1: Are you brand - book a call */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <a
                    href="#contact-brand"
                    onClick={() => {
                      setIsOpen(false);
                      if (typeof window !== "undefined") {
                        window.location.hash = "#contact-brand";
                      }
                    }}
                    className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-[#8b261e] text-[#fff8f6] font-semibold text-sm shadow-md shadow-[#8b261e]/20 hover:bg-[#721f18] transition-all group cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Building2 className="w-4 h-4 text-[#fff8f6]" />
                      <span>Are you brand? Book a call</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#fff8f6]/80 transition-transform group-hover:translate-x-1" />
                  </a>
                </motion.div>

                {/* CTA 2: Are you influencer - book a call */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.26 }}
                >
                  <a
                    href="#contact-influencer"
                    onClick={() => {
                      setIsOpen(false);
                      if (typeof window !== "undefined") {
                        window.location.hash = "#contact-influencer";
                      }
                    }}
                    className="flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-[#fbf0ec] border border-[#8b261e]/25 text-[#8b261e] font-semibold text-sm hover:bg-[#8b261e] hover:text-[#fff8f6] hover:border-[#8b261e] transition-all group cursor-pointer"
                  >
                    <span className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-[#8b261e] group-hover:text-[#fff8f6] transition-colors" />
                      <span>Are you influencer? Book a call</span>
                    </span>
                    <ArrowRight className="w-4 h-4 text-[#8b261e]/70 group-hover:text-[#fff8f6] transition-all group-hover:translate-x-1" />
                  </a>
                </motion.div>

                {/* Social links */}
                <div className="flex items-center justify-between pt-3">
                  <span className="text-xs font-medium text-[#796a66]">Follow Viral Dept:</span>
                  <div className="flex items-center gap-2">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.shortCode}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 rounded-full border border-[#8b261e]/25 text-xs font-semibold text-[#8b261e] hover:bg-[#8b261e] hover:text-[#fff8f6] transition-colors"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
