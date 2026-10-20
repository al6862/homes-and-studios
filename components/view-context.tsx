"use client";

import { ArchitectureQueryResult } from "@/sanity.types";
import { createContext, useContext, useState } from "react";

export type View = "A" | "B" | "C";

// Where to return to when Back is pressed after a tap opened View C.
export type ReturnTo = { view: View; scrollY: number } | null;

type ViewContextType = {
  view: View;
  setView: (view: View) => void;
  activeProject: ArchitectureQueryResult;
  setActiveProject: (project: ArchitectureQueryResult) => void;
  viewsActive: boolean;
  setViewsActive: (active: boolean) => void;
  returnTo: ReturnTo;
  setReturnTo: (returnTo: ReturnTo) => void;
};

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>("A");
  const [activeProject, setActiveProject] =
    useState<ArchitectureQueryResult>(null);
  const [viewsActive, setViewsActive] = useState(false);
  const [returnTo, setReturnTo] = useState<ReturnTo>(null);

  return (
    <ViewContext.Provider
      value={{
        view,
        setView,
        activeProject,
        setActiveProject,
        viewsActive,
        setViewsActive,
        returnTo,
        setReturnTo,
      }}
    >
      {children}
    </ViewContext.Provider>
  );
}

export function useView() {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error("useView must be used within a ViewProvider");
  }
  return context;
}
