import React from "react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/brand/Logo";
import { NAV_ITEMS, SOCIAL_LINKS } from "@/constants/navigation";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full bg-[#f4ece3] border-t border-[#8b261e]/10 pt-10 sm:pt-12 pb-8 mt-auto">
      <Container size="default">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 pb-8 sm:pb-10 border-b border-[#8b261e]/10">
          <div className="md:col-span-2 space-y-4">
            <Logo size="lg" href="#top" />
            <p className="text-sm text-[#524441] max-w-sm leading-relaxed">
              Influencer marketing for brands that want to grow up, not sell out. We source creators, negotiate deals, run campaigns, and report on the numbers that matter.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8b261e] mb-4">
              Explore
            </p>
            <ul className="space-y-2.5 text-sm text-[#524441]">
              {NAV_ITEMS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-[#8b261e] transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#8b261e] mb-4">
              Connect
            </p>
            <div className="flex gap-2.5 mb-4">
              {SOCIAL_LINKS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full border border-[#8b261e]/30 text-[#8b261e] flex items-center justify-center text-xs font-bold hover:bg-[#8b261e] hover:text-[#fff8f6] hover:scale-105 active:scale-95 transition-all duration-200"
                  aria-label={item.label}
                >
                  {item.shortCode}
                </a>
              ))}
            </div>
            <p className="text-xs text-[#796a66]">
              hello@viraldept.in
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-[#796a66] gap-4">
          <span>© {currentYear} Viral Dept Ltd. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#8b261e] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#8b261e] transition-colors">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
