import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { BrandMarquee } from "@/components/sections/BrandMarquee";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { StickyCTA } from "@/components/ui/StickyCTA";
import { Container } from "@/components/ui/Container";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[#faf7f2] selection:bg-[#8b261e] selection:text-[#fff8f6]">
      {/* Responsive Fixed / Blur Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Phase 2 Cinematic Video Hero Section */}
        <Hero />

        {/* Phase 3 Infinite Brand Marquee */}
        <BrandMarquee />

        {/* Phase 4 Case Crushers Campaign Case Study (#case-study) */}
        <CaseStudy />

        {/* Phase 6 What We Do / Our Services Section (#services) */}
        <ServicesSection />

        {/* Phase 5 How Do We Operate / Our Process Section (#process) */}
        <ProcessSection />

        {/* Value Proposition / Quick Overview Strip */}
        <section className="py-8 sm:py-10 md:py-12 bg-[#faf7f2] border-b border-[#8b261e]/10">
          <Container size="default">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#8b261e]/10 shadow-[0_4px_20px_-4px_rgba(139,38,30,0.05)] space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#fbf0ec] text-[#8b261e] flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1e1614]" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                  Curated Creators Only
                </h3>
                <p className="text-sm text-[#524441] leading-relaxed">
                  We hand-pick and vet creators based on real audience engagement and conversion track record, not inflated vanity metrics.
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#8b261e]/10 shadow-[0_4px_20px_-4px_rgba(139,38,30,0.05)] space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#fbf0ec] text-[#8b261e] flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1e1614]" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                  Fast 4-Week Execution
                </h3>
                <p className="text-sm text-[#524441] leading-relaxed">
                  From discovery call and creator contracts to video filming and live deployment in approximately four weeks.
                </p>
              </div>

              <div className="p-6 sm:p-7 rounded-2xl bg-white border border-[#8b261e]/10 shadow-[0_4px_20px_-4px_rgba(139,38,30,0.05)] space-y-3">
                <div className="w-10 h-10 rounded-full bg-[#fbf0ec] text-[#8b261e] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#1e1614]" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
                  Verified Performance ROI
                </h3>
                <p className="text-sm text-[#524441] leading-relaxed">
                  Clear, transparent dashboard reporting on cost per view, CTR, save rate, and sales conversions that move business needles.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Phase 8 Closing CTA: FAQ (#faq), Dual Brand/Influencer Contact (#contact) */}
        <ClosingCTA />
      </main>

      {/* Floating Sticky CTA on both Mobile & Desktop */}
      <StickyCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}
