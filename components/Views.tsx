"use client";

import {
  AllArchitectureQueryResult,
  ArchitectureQueryResult,
} from "@/sanity.types";
import { useEffect } from "react";
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
  const { view, activeProject, setActiveProject } = useView();

  useEffect(() => {
    if (archData) setActiveProject(archData);
  }, [archData, setActiveProject]);

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
