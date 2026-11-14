import { HERO_VIDEOS, PROCESS_VIDEOS, SERVICES_VIDEOS } from "./videos";

export interface ClientBrand {
  name: string;
  shortName: string;
  logo: string;
  industry?: string;
}

export const CLIENT_BRANDS: ClientBrand[] = [
  {
    name: "CRED",
    shortName: "CRED",
    logo: "/assets/brands/logo-cred.png",
    industry: "Fintech",
  },
  {
    name: "Sunfeast Yippee!",
    shortName: "Yippee!",
    logo: "/assets/brands/logo-yippee.png",
    industry: "FMCG",
  },
  {
    name: "Penguin Random House India",
    shortName: "Penguin",
    logo: "/assets/brands/logo-penguin.png",
    industry: "Publishing",
  },
  {
    name: "Case Crushers",
    shortName: "Case Crushers",
    logo: "/assets/brands/logo-casecrushers.png",
    industry: "Interactive Entertainment",
  },
  {
    name: "Orza",
    shortName: "Orza",
    logo: "/assets/brands/logo-orza.png",
    industry: "Luxury Home & Design",
  },
  {
    name: "Macherbs",
    shortName: "Macherbs",
    logo: "/assets/brands/logo-macherbs.png",
    industry: "Health & Wellness",
  },
];

export const BRAND_ASSETS = {
  logo: {
    text: "Viral Dept.",
    prefix: "Viral",
    suffix: "Dept.",
  },
  images: {
    hero: "/assets/images/hero-image.jpg",
    casecrushersCard: "/assets/images/casecrushers-card.png",
    casecrushersReels: "/assets/images/casecrushers-reels.png",
    reelInsights1: "/assets/images/reel-insights-1.png",
    reelInsights2: "/assets/images/reel-insights-2.png",
    reelInsights3: "/assets/images/reel-insights-3.png",
    unignorableBg: "/assets/images/unignorable-bg.png",
  },
  brands: CLIENT_BRANDS,
  videos: {
    hero: HERO_VIDEOS,
    process: PROCESS_VIDEOS,
    services: SERVICES_VIDEOS,
    rawMasterReel: "/videos/hero/viraldept-hero.mp4",
  },
} as const;

export * from "./videos";
