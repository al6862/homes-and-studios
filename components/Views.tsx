import { AllArchitectureQueryResult } from "@/sanity.types";
import ViewA from "./ViewA";

export default function Views({allArchitecture} : {allArchitecture: AllArchitectureQueryResult}) {
  return (
    <div>
      <ViewA allArchitecture={allArchitecture} />
    </div>
  )
}