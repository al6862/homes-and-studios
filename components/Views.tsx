"use client";

import { AllArchitectureQueryResult } from "@/sanity.types";
import { useView } from "./view-context";
import ViewA from "./ViewA";
import ViewB from "./ViewB";

export default function Views({
  allArchitecture,
}: {
  allArchitecture: AllArchitectureQueryResult;
}) {
  const { view } = useView();

  return (
    <div>
      {/* <ViewA allArchitecture={allArchitecture} /> */}
      {view === "A" ? (
        <ViewA allArchitecture={allArchitecture} />
      ) : (
        <ViewB allArchitecture={allArchitecture} />
      )}
    </div>
  );
}
