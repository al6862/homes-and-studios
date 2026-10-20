"use client";

import {
  AllArchitectureQueryResult,
  ArchitectureQueryResult,
} from "@/sanity.types";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { isMobile } from "./useOpenInViewC";
import { useView } from "./view-context";
import ViewA from "./ViewA";
import ViewB from "./ViewB";
import ViewC from "./ViewC";

export default function Views({
  allArchitecture,
  defaultProject,
  archData,
}: {
  allArchitecture: AllArchitectureQueryResult;
  defaultProject?: ArchitectureQueryResult;
  archData?: ArchitectureQueryResult;
}) {
  const {
    view,
    setView,
    activeProject,
    setActiveProject,
    setViewsActive,
    returnTo,
    setReturnTo,
  } = useView();
  const pathname = usePathname();
  const pendingScroll = useRef<number | null>(null);

  // Back from a tapped-open View C: return to the list/grid we came from.
  useEffect(() => {
    if (pathname !== "/" || !returnTo) return;
    pendingScroll.current = returnTo.scrollY;
    setActiveProject(null);
    setView(returnTo.view);
    setReturnTo(null);
  }, [pathname]);

  // Restore the scroll position once that view has rendered.
  useEffect(() => {
    if (pendingScroll.current === null) return;
    window.scrollTo(0, pendingScroll.current);
    pendingScroll.current = null;
  }, [view]);

  useEffect(() => {
    // Already selected means we got here by clicking, not by loading the URL.
    if (!archData || activeProject?.slug === archData.slug) return;
    setActiveProject(archData);
    // On mobile a project URL opens in View C, since View A is list-only there.
    if (isMobile()) setView("C");
  }, [archData, setActiveProject]);

  useEffect(() => {
    setViewsActive(true);
    return () => setViewsActive(false);
  }, [setViewsActive]);

  return (
    <div>
      {view === "A" && <ViewA allArchitecture={allArchitecture} />}
      {view === "B" && <ViewB allArchitecture={allArchitecture} />}
      {view === "C" && (
        <ViewC project={activeProject ?? defaultProject ?? null} />
      )}
    </div>
  );
}
