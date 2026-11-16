import type { Metadata, Viewport } from "next";
import { Space_Grotesk, DM_Sans, Fraunces } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8b261e",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.viraldept.in"),
  title: "Viral Dept. — Influencer Marketing, Done Properly",
  description:
    "Viral Dept is a boutique influencer agency for small and growing brands. We connect brands with creators who actually convert. Strategy, sourcing, execution, and reporting on numbers that matter.",
  keywords: [
    "Viral Dept",
    "Influencer Marketing Agency",
    "Creator Partnerships",
    "Content Strategy",
    "Campaign Management",
  ],
  authors: [{ name: "Viral Dept." }],
  openGraph: {
    title: "Viral Dept. — Influencer Marketing Agency",
    description: "We connect brands with creators who actually convert.",
    url: "https://www.viraldept.in",
    siteName: "Viral Dept.",
    images: [
      {
        url: "/assets/images/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "Viral Dept. Influencer Marketing",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable} ${fraunces.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col bg-[#faf7f2] text-[#1e1614] antialiased selection:bg-[#8b261e] selection:text-[#fff8f6]">
        {/* Meta Pixel Integration (Pixel ID: 1438410182687983) */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1438410182687983');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1438410182687983&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
