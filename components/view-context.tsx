"use client";

import { ArchitectureQueryResult } from "@/sanity.types";
import { createContext, useContext, useState } from "react";

export type View = "A" | "B" | "C";

type ViewContextType = {
  view: View;
  setView: (view: View) => void;
  activeProject: ArchitectureQueryResult;
  setActiveProject: (project: ArchitectureQueryResult) => void;
};

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>("A");
  const [activeProject, setActiveProject] =
    useState<ArchitectureQueryResult>(null);

  return (
    <ViewContext.Provider
      value={{ view, setView, activeProject, setActiveProject }}
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
