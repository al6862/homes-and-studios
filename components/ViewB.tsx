"use client";

import { AllArchitectureQueryResult } from "@/sanity.types";
import Image from "next/image";

export default function ViewB({
  allArchitecture,
}: {
  allArchitecture: AllArchitectureQueryResult;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-[3.472vw] gap-y-[3.194vw] px-5">
      {allArchitecture.map((architecture, i) => {
        const { title, location, coverImage } = architecture;
        return (
          <div key={i} className="flex gap-[0.833vw] items-start">
            {coverImage?.assetPath && (
              <Image
                src={coverImage.assetPath}
                alt=""
                width={123}
                height={150}
                className="w-[10.417vw] h-[10.417vw] object-cover shrink-0"
              />
            )}
            <div className="flex-1">
              {title && (
                <p className="title" style={{ fontSize: "11px" }}>
                  {title}
                </p>
              )}
              {location && (
                <p className="location text-gray" style={{ fontSize: "9px" }}>
                  {location}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
