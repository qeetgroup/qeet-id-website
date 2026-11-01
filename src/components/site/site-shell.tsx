import { SearchPopup } from "@/components/search/search-popup";
import { SoftwareApplicationJsonLd } from "@/components/seo/structured-data";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

/**
 * The page around every page: skip link, header, main, footer and search.
 * The marketing layout and the root not-found page both render it, so a
 * missing page still has the site around it.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Organization + WebSite are emitted once in the root layout. */}
      <SoftwareApplicationJsonLd />
      <a href="#main" className="mk-skip">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <SearchPopup />
    </div>
  );
}
