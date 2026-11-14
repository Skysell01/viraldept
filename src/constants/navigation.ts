export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Brands", href: "#brands" },
  { label: "Real Results", href: "#case-study" },
  { label: "How We Operate", href: "#process" },
  { label: "What We Do", href: "#services" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export const MOBILE_NAV_ITEMS: NavItem[] = [
  { label: "Brand we worked with", href: "#brands" },
  { label: "Real results", href: "#case-study" },
  { label: "How do we operate", href: "#process" },
  { label: "What all we do", href: "#services" },
];

export const NAV_CTA = {
  label: "Book a Strategy Call",
  shortLabel: "Book a call",
  href: "#contact",
};

export const SOCIAL_LINKS = [
  { label: "Instagram", shortCode: "IG", href: "https://instagram.com" },
  { label: "LinkedIn", shortCode: "LI", href: "https://linkedin.com" },
];

