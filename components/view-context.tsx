"use client";

import { createContext, useContext, useState } from "react";

export type View = "A" | "B" | "C";

type ViewContextType = {
  view: View;
  setView: (view: View) => void;
};

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export function ViewProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<View>("A");

  return (
    <ViewContext.Provider value={{ view, setView }}>
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
