import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_HOSTS = new Set(["malbec.ventures", "www.malbec.ventures"]);
const LP_HOSTS = new Set(["malbec.online", "www.malbec.online"]);
const PUBLIC_ORIGIN = "https://www.malbec.ventures";

/** LP paths reachable without a session. */
const OPEN_LP_PATHS = ["/lp/login", "/lp/auth"];

export async function proxy(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").split(":")[0].toLowerCase();
  const { pathname } = request.nextUrl;
  const isLpPath = pathname === "/lp" || pathname.startsWith("/lp/");

  // The public domain never serves LP or admin pages.
  if (PUBLIC_HOSTS.has(host) && isLpPath) {
    return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  }

  // The LP domain serves only the LP site; anything else belongs to the public site.
  if (LP_HOSTS.has(host) && !isLpPath) {
    if (pathname === "/") return NextResponse.redirect(new URL("/lp", request.url));
    if (pathname.startsWith("/dd/")) return NextResponse.redirect(new URL(pathname, PUBLIC_ORIGIN));
    return NextResponse.redirect(new URL(pathname + request.nextUrl.search, PUBLIC_ORIGIN));
  }

  if (!isLpPath) return NextResponse.next();

  // ---- LP paths: refresh the session and require one before anything is served.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  const preview = process.env.NODE_ENV === "development" && process.env.LP_PREVIEW === "1";
  const open = OPEN_LP_PATHS.some((p) => pathname === p || pathname.startsWith(p + "/"));

  let response = NextResponse.next({ request });
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("Cache-Control", "private, no-store");
  if (preview) return response;

  if (!url || !key) {
    return open ? response : NextResponse.redirect(new URL("/lp/login", request.url));
  }

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: (list) => {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
        response.headers.set("Cache-Control", "private, no-store");
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
      },
    },
  });
  const { data: { user } } = await supabase.auth.getUser();

  if (!user && !open) {
    const login = new URL("/lp/login", request.url);
    const redirect = NextResponse.redirect(login);
    redirect.headers.set("Cache-Control", "private, no-store");
    return redirect;
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|brand/|portfolio/|icon|opengraph-image|sitemap.xml|robots.txt).*)"],
};
