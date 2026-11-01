import { SiteShell } from "@/components/site/site-shell";

/** Every marketing page, inside the site shell (header, main, footer, search). */
export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
