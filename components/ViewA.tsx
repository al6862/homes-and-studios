"use client"
import { AllArchitectureQueryResult } from "@/sanity.types";

export default function ViewA({allArchitecture} : {allArchitecture: AllArchitectureQueryResult}) {
  return (
    <div>
      {allArchitecture.map((architecture, i) => {
        const {title, location} = architecture;
        const prevTitle = allArchitecture[i-1]?.title;
        return(
          <div key={i}>
            {title && i == 0? <p>{title[0]}</p> : (title && prevTitle && (title[0] != prevTitle[0]) && <p>{title[0]}</p>)}
            {title && <p>{title}</p>}
            {location && <p>{location}</p>}
          </div>
        )
      })}
    </div>
  )
}