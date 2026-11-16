"use client";

import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Sparkles,
  Building2,
  Users,
  CheckCircle2,
  Mail,
  HelpCircle,
  Loader2,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

const FAQS: FaqItem[] = [
  {
    question: "How do you select the right creators for our brand?",
    answer:
      "We look beyond follower counts and vanity metrics. We analyze audience demographics, active engagement ratios, content style, comment sentiment, and previous conversion track records to ensure a natural, authentic brand fit.",
  },
  {
    question: "How long does a campaign typically take to launch?",
    answer:
      "Our sprint cycle takes approximately 4 weeks from initial discovery to live posting. This includes creator briefing, agreement negotiations, sample product deliveries, review drafts, and scheduled publication.",
  },
  {
    question: "Do we have complete approval over content before it goes live?",
    answer:
      "Yes, 100%. We provide a structured approval workflow where your team reviews the initial creative concept, creator shortlist, script hooks, and final video drafts before anything is posted publicly.",
  },
  {
    question: "What platforms do you focus on?",
    answer:
      "We specialize in short-form video where attention is highest: Instagram Reels, YouTube Shorts, and TikTok. We also manage dedicated YouTube long-form integration for high-consideration consumer products.",
  },
  {
    question: "How do you track and report campaign ROI?",
    answer:
      "Every campaign includes comprehensive post-campaign reporting tracking verified reach, cost per thousand impressions (CPM), engagement rates, saves, profile visits, and UTM link tracking for direct conversions.",
  },
];

export function ClosingCTA() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"brand" | "influencer">("brand");
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Sync active tab with URL hash when navigating from navbar or CTAs
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined") {
        const hash = window.location.hash;
        if (hash === "#contact-brand") {
          setActiveTab("brand");
        } else if (hash === "#contact-influencer") {
          setActiveTab("influencer");
        }
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    handleOrWebsite: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      type: activeTab, // "brand" or "influencer"
      name: formData.name,
      email: formData.email,
      handleOrWebsite: formData.handleOrWebsite,
      budget: formData.budget,
      message: formData.message,
      submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    };

    // Google Apps Script Webhook URL (configured via environment variable or direct hook)
    const webhookUrl =
      process.env.NEXT_PUBLIC_GOOGLE_SHEET_WEBHOOK ||
      "https://script.google.com/macros/s/AKfycbyJAH-XedJTAwe8SKQWZ-RI_xh-NzUHf-Q9koKawNgnlmLUCF0Z0lmjC7ufFWPRfSry/exec";

    try {
      // Primary: Secure same-origin Next.js API proxy to avoid browser CORS / redirect issues
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Proxy error status " + res.status);
      }

      const data = await res.json();
      console.log("Lead successfully submitted:", data);

      // Track Lead event in Meta Pixel
      if (typeof window !== "undefined" && typeof (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq === "function") {
        (window as unknown as { fbq: (...args: unknown[]) => void }).fbq("track", "Lead", {
          content_name: activeTab === "brand" ? "Brand Inquiry" : "Creator Application",
          content_category: activeTab,
          currency: "INR",
        });
      }

      setFormData({ name: "", email: "", handleOrWebsite: "", budget: "", message: "" });
      setFormSubmitted(true);
    } catch (err) {
      console.error("Primary proxy error, attempting direct webhook fallback:", err);

      // Secondary Fallback: Direct Webhook invocation using text/plain (avoids CORS preflight)
      try {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify(payload),
        });
        console.log("Fallback lead submitted to webhook");

        // Track Lead event in Meta Pixel
        if (typeof window !== "undefined" && typeof (window as unknown as { fbq?: (...args: unknown[]) => void }).fbq === "function") {
          (window as unknown as { fbq: (...args: unknown[]) => void }).fbq("track", "Lead", {
            content_name: activeTab === "brand" ? "Brand Inquiry" : "Creator Application",
            content_category: activeTab,
            currency: "INR",
          });
        }

        setFormData({ name: "", email: "", handleOrWebsite: "", budget: "", message: "" });
        setFormSubmitted(true);
      } catch (fallbackErr) {
        console.error("Fallback error:", fallbackErr);
        setSubmitError(
          "There was a temporary issue sending your inquiry. Please try again or reach out to hello@viraldept.in"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#faf7f2]">
      {/* =========================================================================
          FAQ ACCORDION SECTION (#faq)
          ========================================================================= */}
      <section id="faq" className="py-10 sm:py-14 md:py-16 border-b border-[#8b261e]/10 bg-[#f8f4ee]">
        <Container size="default">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ece3] border border-[#8b261e]/15 text-[11px] font-semibold tracking-widest text-[#8b261e] uppercase">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>FREQUENTLY ASKED QUESTIONS</span>
              </div>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1e1614]"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Everything you need to know.
              </h2>
              <p className="text-sm sm:text-base text-[#524441]">
                Clear answers on how we run campaigns, pick creators, and deliver numbers.
              </p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.question}
                    className="rounded-2xl bg-white border border-[#8b261e]/10 overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 cursor-pointer focus-visible:outline-none focus-visible:bg-[#fbf0ec]/40"
                      aria-expanded={isOpen}
                    >
                      <span
                        className="text-base sm:text-lg font-bold text-[#1e1614]"
                        style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                      >
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={cn(
                          "w-5 h-5 text-[#8b261e] shrink-0 transition-transform duration-300",
                          isOpen ? "rotate-180" : ""
                        )}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 pt-1 text-sm text-[#524441] leading-relaxed border-t border-[#8b261e]/5">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* =========================================================================
          CLOSING ENQUIRY & CONTACT SECTION (#contact, #contact-brand, #contact-influencer)
          ========================================================================= */}
      <section id="contact" className="py-12 sm:py-16 md:py-20 bg-[#181110] text-white relative overflow-hidden">
        {/* Subtle Brand Ambient Atmospheric Background Glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[#8b261e]/25 blur-[160px]" />

        <Container size="default" className="relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center space-y-3 mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-semibold tracking-wider text-[#f5c6c0] uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>LET&apos;S CONNECT</span>
              </div>
              <h2
                className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight"
                style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
              >
                Ready to make your brand{" "}
                <span className="text-[#e57368] underline decoration-[#8b261e] underline-offset-8">
                  unignorable?
                </span>
              </h2>
              <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto leading-relaxed">
                Tell us about your brand or creator profile. We will review your goals and schedule a discovery call within 24 hours.
              </p>
            </div>

            {/* Interactive Tab Switcher: Brand vs Influencer */}
            <div className="flex justify-center mb-6 sm:mb-8">
              <div className="inline-flex p-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15">
                <button
                  type="button"
                  onClick={() => setActiveTab("brand")}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
                    activeTab === "brand"
                      ? "bg-[#8b261e] text-white shadow-md"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  <Building2 className="w-4 h-4" />
                  <span>I&apos;m a Brand</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("influencer")}
                  className={cn(
                    "flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer",
                    activeTab === "influencer"
                      ? "bg-[#8b261e] text-white shadow-md"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  <Users className="w-4 h-4" />
                  <span>I&apos;m an Influencer</span>
                </button>
              </div>
            </div>

            {/* Target Anchors for Direct Navigation */}
            <div id="contact-brand" className="scroll-mt-28" />
            <div id="contact-influencer" className="scroll-mt-28" />

            {/* Interactive Enquiry Form Container */}
            <div className="rounded-3xl p-8 sm:p-12 bg-white/5 backdrop-blur-xl border border-white/15 shadow-2xl">
              {formSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#8b261e]/30 text-[#e57368] flex items-center justify-center mx-auto border border-[#8b261e]/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3
                    className="text-2xl sm:text-3xl font-bold text-white"
                    style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}
                  >
                    Thank you! We received your request.
                  </h3>
                  <p className="text-white/70 max-w-md mx-auto text-sm">
                    Our partnerships team will review your submission and reach out within 24 hours with our discovery blueprint.
                  </p>
                  <div className="pt-4">
                    <Button
                      onClick={() => setFormSubmitted(false)}
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10"
                    >
                      Send Another Inquiry
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                        {activeTab === "brand" ? "Your Name / Title" : "Creator Name"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={activeTab === "brand" ? "Jane Doe, Marketing Director" : "Jane Doe"}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#e57368] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#e57368] text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                        {activeTab === "brand" ? "Brand Website / Instagram" : "Instagram / TikTok Handle"}
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.handleOrWebsite}
                        onChange={(e) => setFormData({ ...formData, handleOrWebsite: e.target.value })}
                        placeholder={activeTab === "brand" ? "brand.com or @brand" : "@creatorhandle"}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#e57368] text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                        {activeTab === "brand" ? "Estimated Budget Range" : "Follower Count / Niche"}
                      </label>
                      <input
                        type="text"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        placeholder={activeTab === "brand" ? "₹1 Lakh - ₹5 Lakhs+ / Sprint" : "50K+ / Lifestyle & Food"}
                        className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#e57368] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-white/70 mb-2">
                      Campaign Goals &amp; Timeline
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={
                        activeTab === "brand"
                          ? "Tell us about your upcoming launch, target demographic, and key objectives..."
                          : "Tell us about your content style, audience demographics, and previous brand collaborations..."
                      }
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#e57368] text-sm resize-none"
                    />
                  </div>

                  {submitError && (
                    <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/30 text-red-200 text-xs">
                      {submitError}
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-white/50">
                      We protect your privacy. Zero spam guaranteed.
                    </p>

                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8"
                      withArrow={!isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>Submitting...</span>
                        </span>
                      ) : activeTab === "brand" ? (
                        "Submit Campaign Inquiry"
                      ) : (
                        "Apply to Creator Roster"
                      )}
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Quick Contact & WhatsApp Pill */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
              <a
                href="mailto:hello@viraldept.in"
                className="flex items-center gap-2 hover:text-[#e57368] transition-colors"
              >
                <Mail className="w-4 h-4 text-[#e57368]" />
                <span>hello@viraldept.in</span>
              </a>
              <span>•</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Average Response Time: &lt; 2 Hours</span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
