/**
 * Centralized Video Asset System for Viral Dept.
 *
 * Configured for high-performance creative agency experience:
 * - Web-optimized H.264 MP4 with faststart flags
 * - Pre-rendered WebP poster images for instantaneous first paint
 * - Responsive 16:9 landscape & 9:16 mobile portrait variants
 * - Reduced motion & lazy load compatibility
 */

export interface VideoAsset {
  id: string;
  title: string;
  description: string;
  category: "hero" | "process" | "services";
  aspectRatio: "16:9" | "9:16";
  duration: number; // approximate duration in seconds
  src: {
    desktop?: string;
    mobile?: string;
    default: string;
  };
  poster: string;
  fallbackImage: string;
  playback: {
    autoPlay: boolean;
    muted: boolean;
    loop: boolean;
    playsInline: boolean;
  };
}

export const HERO_VIDEOS = {
  desktop: {
    src: "/videos/hero/viraldept-hero.mp4",
    poster: "/videos/hero/viraldept-hero-poster.webp",
    aspectRatio: "16:9" as const,
    width: 1280,
    height: 720,
  },
  mobile: {
    src: "/videos/hero/viraldept-hero.mp4",
    poster: "/videos/hero/viraldept-hero-poster.webp",
    aspectRatio: "16:9" as const,
    width: 1280,
    height: 720,
  },
} as const;

export const PROCESS_VIDEOS: Record<string, VideoAsset> = {
  discover: {
    id: "process-discover",
    title: "Discovery & Creative Planning",
    description: "Brainstorming creative angles, identifying audience tone, and mapping creator hooks.",
    category: "process",
    aspectRatio: "9:16",
    duration: 5,
    src: {
      default: "/videos/process/discover.mp4",
    },
    poster: "/images/video-posters/discover-poster.webp",
    fallbackImage: "/assets/images/hero-image.jpg",
    playback: {
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
    },
  },
  match: {
    id: "process-match",
    title: "Creator Sourcing & Matching",
    description: "Vetting top creators whose aesthetics and audience demographics naturally match the brand.",
    category: "process",
    aspectRatio: "9:16",
    duration: 5,
    src: {
      default: "/videos/process/match.mp4",
    },
    poster: "/images/video-posters/match-poster.webp",
    fallbackImage: "/assets/images/casecrushers-card.png",
    playback: {
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
    },
  },
  create: {
    id: "process-create",
    title: "Production & Content Filming",
    description: "Managing briefs, shooting high-retention Reels, product unboxing, and native storytelling.",
    category: "process",
    aspectRatio: "9:16",
    duration: 6,
    src: {
      default: "/videos/process/create.mp4",
    },
    poster: "/images/video-posters/create-poster.webp",
    fallbackImage: "/assets/images/casecrushers-reels.png",
    playback: {
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
    },
  },
  amplify: {
    id: "process-amplify",
    title: "Distribution & Viral Amplify",
    description: "Tracking real-time reach, engagement multipliers, and conversion reporting.",
    category: "process",
    aspectRatio: "9:16",
    duration: 6,
    src: {
      default: "/videos/process/amplify.mp4",
    },
    poster: "/images/video-posters/amplify-poster.webp",
    fallbackImage: "/assets/images/reel-insights-1.png",
    playback: {
      autoPlay: true,
      muted: true,
      loop: true,
      playsInline: true,
    },
  },
};

export const SERVICES_VIDEOS: Record<string, VideoAsset> = {
  influencerMarketing: {
    id: "service-influencer-marketing",
    title: "Influencer Marketing",
    description: "End-to-end influencer campaigns that drive authentic discovery and high-converting reach.",
    category: "services",
    aspectRatio: "9:16",
    duration: 5,
    src: {
      default: "/videos/services/influencer-marketing.mp4",
    },
    poster: "/images/video-posters/influencer-marketing-poster.webp",
    fallbackImage: "/assets/images/hero-image.jpg",
    playback: {
      autoPlay: false, // Below-the-fold videos default to lazy/hover play
      muted: true,
      loop: true,
      playsInline: true,
    },
  },
  ugcContent: {
    id: "service-ugc-content",
    title: "UGC Content Creation",
    description: "Authentic, relatable creator-led product reviews, unboxings, and high-retention video ads.",
    category: "services",
    aspectRatio: "9:16",
    duration: 5,
    src: {
      default: "/videos/services/ugc-content.mp4",
    },
    poster: "/images/video-posters/ugc-content-poster.webp",
    fallbackImage: "/assets/images/casecrushers-reels.png",
    playback: {
      autoPlay: false,
      muted: true,
      loop: true,
      playsInline: true,
    },
  },
  campaignManagement: {
    id: "service-campaign-management",
    title: "Campaign Management",
    description: "Precision management from contract negotiation to deliverables, timelines, and QA.",
    category: "services",
    aspectRatio: "9:16",
    duration: 5,
    src: {
      default: "/videos/services/campaign-management.mp4",
    },
    poster: "/images/video-posters/campaign-management-poster.webp",
    fallbackImage: "/assets/images/casecrushers-card.png",
    playback: {
      autoPlay: false,
      muted: true,
      loop: true,
      playsInline: true,
    },
  },
  brandCollaboration: {
    id: "service-brand-collaboration",
    title: "Brand Collaborations",
    description: "Cultivating organic brand synergies with top-tier digital creators that convert viewers into loyal customers.",
    category: "services",
    aspectRatio: "9:16",
    duration: 5,
    src: {
      default: "/videos/services/brand-collaboration.mp4",
    },
    poster: "/images/video-posters/brand-collaboration-poster.webp",
    fallbackImage: "/assets/images/unignorable-bg.png",
    playback: {
      autoPlay: false,
      muted: true,
      loop: true,
      playsInline: true,
    },
  },
  contentStrategy: {
    id: "service-content-strategy",
    title: "Content Strategy",
    description: "Data-driven creative blueprints designed to capture attention in the first 3 seconds.",
    category: "services",
    aspectRatio: "9:16",
    duration: 5,
    src: {
      default: "/videos/services/content-strategy.mp4",
    },
    poster: "/images/video-posters/content-strategy-poster.webp",
    fallbackImage: "/assets/images/reel-insights-2.png",
    playback: {
      autoPlay: false,
      muted: true,
      loop: true,
      playsInline: true,
    },
  },
  creatorPartnerships: {
    id: "service-creator-partnerships",
    title: "Creator Partnerships",
    description: "Long-term ambassador programs that build compound brand equity across Instagram and YouTube.",
    category: "services",
    aspectRatio: "9:16",
    duration: 5,
    src: {
      default: "/videos/services/creator-partnerships.mp4",
    },
    poster: "/images/video-posters/creator-partnerships-poster.webp",
    fallbackImage: "/assets/images/reel-insights-3.png",
    playback: {
      autoPlay: false,
      muted: true,
      loop: true,
      playsInline: true,
    },
  },
};

export const ALL_VIDEO_ASSETS = {
  hero: HERO_VIDEOS,
  process: PROCESS_VIDEOS,
  services: SERVICES_VIDEOS,
} as const;

