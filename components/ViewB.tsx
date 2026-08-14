"use client";

import { AllArchitectureQueryResult } from "@/sanity.types";
import Image from "next/image";

export default function ViewB({
  allArchitecture,
}: {
  allArchitecture: AllArchitectureQueryResult;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-x-[3.241vw] md:gap-y-[3.194vw] px-5">
      {allArchitecture.map((architecture, i) => {
        const { title, location, coverImage } = architecture;
        return (
          <div
            key={i}
            className="flex flex-col gap-[2.804vw] md:flex-row md:gap-[0.833vw] md:items-start"
          >
            {coverImage?.assetPath && (
              <Image
                src={coverImage.assetPath}
                alt=""
                width={400}
                height={489}
                className="w-full aspect-[184/225] object-cover md:w-[8.542vw] md:h-[10.417vw] md:aspect-auto md:shrink-0"
              />
            )}
            <div className="w-full md:flex-1 flex flex-col gap-[1.869vw] md:gap-[0.139vw]">
              {title && <p className="title viewb-title">{title}</p>}
              {location && (
                <p className="location text-gray viewb-location">{location}</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
