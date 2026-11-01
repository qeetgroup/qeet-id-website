import type { Metadata } from "next";
import { OrganizationJsonLd, WebSiteJsonLd } from "@/components/seo/structured-data";
import { HERO } from "@/config/home";
import { THEME_STORAGE_KEY } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Qeet ID — One Identity. Every Platform.",
    template: "%s | Qeet ID",
  },
  /* The home's approved hero (config/home.ts HERO), so every default says what the home says. */
  description: HERO.lede,
  metadataBase: new URL("https://id.qeet.in"),
  // NOTE: no site-wide `alternates.canonical` here — Next.js inherits it to
  // every child route, which would canonicalize the whole site to "/" and drop
  // inner pages from the index. Each page/route sets its own canonical instead.
  icons: {
    // Theme-adaptive favicon: dark artwork on light UI, light artwork on dark
    // UI. The .ico is the universal fallback for browsers without SVG support.
    icon: [
      {
        url: "/qeet-logo-on-light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/qeet-logo-on-dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  openGraph: {
    title: "Qeet ID — One Identity. Every Platform.",
    description: HERO.lede,
    type: "website",
    siteName: "Qeet ID",
    locale: "en_US",
    url: "https://id.qeet.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "Qeet ID — One Identity. Every Platform.",
    description: HERO.lede,
    site: "@qeetgroup",
    creator: "@qeetgroup",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  keywords: [
    "identity platform",
    "SSO",
    "single sign-on",
    "MFA",
    "passkeys",
    "RBAC",
    "identity and access management",
  ],
  authors: [{ name: "Qeet ID", url: "https://id.qeet.in" }],
  creator: "Qeet ID",
  publisher: "Qeet ID",
};

/*
 * The theme follows the visitor's system setting until they choose; the
 * switch remembers the choice (localStorage, THEME_STORAGE_KEY) and it wins
 * from then on. Runs before first paint, so neither theme flashes the other.
 * The theme is one attribute, `data-qx-color-scheme` on <html> — as on
 * qeet.in. Until someone chooses, a change to the system setting is followed
 * live. (An older stored "system" counts as no choice.)
 */
const themeInit = `(function(){try{var d=document.documentElement,m=matchMedia('(prefers-color-scheme: dark)');function s(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');return t==='light'||t==='dark'?t:null}catch(e){return null}}function a(dark){d.setAttribute('data-qx-color-scheme',dark?'dark':'light')}var t=s();a(t?t==='dark':m.matches);m.addEventListener&&m.addEventListener('change',function(e){if(!s())a(e.matches)})}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <head>
        {/* The theme, before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="font-sans">
        {/* Site-wide publisher + website schema. Emitted once in the root
            layout so it covers every route (marketing + any future surface). */}
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        {children}
      </body>
    </html>
  );
}
