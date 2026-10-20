"use client";

import { client } from "@/sanity/lib/client";
import { architectureQuery } from "@/sanity/lib/queries";
import { useRouter } from "next/navigation";
import { useView } from "./view-context";

// Matches Tailwind's `max-md:` breakpoint (below 768px).
export const isMobile = () => window.matchMedia("(max-width: 767px)").matches;

export function useOpenInViewC() {
  const { view, setView, setActiveProject, viewsActive, setReturnTo } =
    useView();
  const router = useRouter();

  return async (slug: string, { replace = false } = {}) => {
    const archData = await client.fetch(architectureQuery, { slug });
    if (!archData) return;

    const href = `/${archData.slug}`;
    // Remember the list/grid we left so Back can return to it (see Views).
    // Location doesn't need this: it uses a real navigation, so Back works.
    if (viewsActive) setReturnTo({ view, scrollY: window.scrollY });
    setActiveProject(archData);
    setView("C");
    window.scrollTo(0, 0);

    // Pages without the views (e.g. Location) need a real navigation to
    // reach them; on the home page the views are already showing.
    if (!viewsActive) {
      if (replace) router.replace(href);
      else router.push(href);
    } else if (window.location.pathname !== href) {
      window.history.pushState({}, "", href);
    }
  };
}
