import { DEFAULT_DASHBOARD_URL, DEFAULT_DOCS_URL } from "@/lib/links";

// Container images (the qeet-id-deploy test kit) run one build in several local
// environments, but these pages are static and NEXT_PUBLIC_* is fixed at build
// time. So the image links to /go/console/... and /go/docs/... (Dockerfile), and
// /go resolves them against CONSOLE_URL / DOCS_URL when the container starts.
// Vercel builds leave NEXT_PUBLIC_* unset and link directly; production never
// routes through here.
const TARGETS = {
  console: { env: "CONSOLE_URL", fallback: DEFAULT_DASHBOARD_URL },
  docs: { env: "DOCS_URL", fallback: DEFAULT_DOCS_URL },
} as const;

/** The absolute URL /go/<app>/<path><search> forwards to, or null for an unknown app. */
export function goTarget(
  app: string,
  path: readonly string[],
  search: string,
  env: Record<string, string | undefined>,
): string | null {
  if (app !== "console" && app !== "docs") return null;
  const { env: key, fallback } = TARGETS[app];
  const origin = (env[key] || fallback).replace(/\/+$/, "");
  return `${origin}/${path.map(encodeURIComponent).join("/")}${search}`;
}
