import type { NextRequest } from "next/server";

import { goTarget } from "@/lib/go";

// Runtime links for container images — see src/lib/go.ts.
export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  ctx: { params: Promise<{ app: string; path?: string[] }> },
) {
  // <Link> clicks and prefetches arrive as RSC fetches. A cross-origin redirect
  // inside fetch() would fail CORS, so answer them with no body: the router then
  // falls back to a normal browser navigation, which follows the redirect below.
  if (request.headers.has("rsc")) return new Response(null, { status: 204 });

  const { app, path = [] } = await ctx.params;
  const target = goTarget(app, path, request.nextUrl.search, process.env);
  if (!target) return new Response("Not found", { status: 404 });
  return Response.redirect(target, 307);
}
