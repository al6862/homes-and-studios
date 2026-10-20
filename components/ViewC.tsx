"use client";

import { ArchitectureQueryResult } from "@/sanity.types";
import { useInView } from "motion/react";
import { toPlainText } from "next-sanity";
import Image from "next/image";
import { ReactNode, useEffect, useRef, useState } from "react";

type Project = NonNullable<ArchitectureQueryResult>;
type Section2Item = NonNullable<Project["section2"]>[number];
type ImageBlock = Exclude<Section2Item, { _type: "block" }>;
type ImageData = {
  assetPath: string | null;
  aspectRatio: number | null;
} | null;

const sizeClasses = {
  full: "w-full",
  large: "w-[73%] md:w-[62%] mx-auto",
  medium: "w-[73%] md:w-[55%] mx-auto",
  small: "w-[73%] md:w-[40%] mx-auto",
};

export default function ViewC({
  project,
}: {
  project: ArchitectureQueryResult;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  if (!project) return null;

  const hero = project.gallery?.[0];
  const blocks = (project.section2 ?? []).filter(
    (block): block is ImageBlock => block._type !== "block",
  );

  const captions: ReactNode[] = [
    <>
      <strong>{project.title}</strong>{" "}
      {project.descriptionProt && toPlainText(project.descriptionProt)}
    </>,
    ...blocks.map((block) => block.caption),
  ];

  let captionIndex = activeIndex;
  while (captionIndex > 0 && !captions[captionIndex]) captionIndex--;

  return (
    <div>
      {hero?.assetPath && (
        <InViewBlock
          index={0}
          onEnter={setActiveIndex}
          className="w-full md:w-[55%] mx-auto"
        >
          <ProjectImage image={hero} />
        </InViewBlock>
      )}

      {blocks.map((block, i) => {
        const index = i + 1;

        if (block._type === "imageGroup") {
          return (
            <div key={block._key} className="md:grid md:grid-cols-2">
              <InViewBlock
                index={index}
                onEnter={setActiveIndex}
                className="w-[73%] mx-auto md:w-full"
              >
                <ProjectImage image={block.image1} alt={block.alt1} />
              </InViewBlock>
              <InViewBlock index={index} onEnter={setActiveIndex}>
                <ProjectImage image={block.image2} alt={block.alt2} />
              </InViewBlock>
            </div>
          );
        }

        return (
          <InViewBlock
            key={block._key}
            index={index}
            onEnter={setActiveIndex}
            className={sizeClasses[block.size ?? "full"]}
          >
            <ProjectImage image={block.image} alt={block.alt} />
          </InViewBlock>
        );
      })}

      <div className="sticky bottom-0 h-0">
        <div className="absolute inset-x-0 bottom-0 bg-background px-5 py-3">
          <p className="body mx-auto text-center md:w-[48%]">
            {captions[captionIndex]}
          </p>
        </div>
      </div>
    </div>
  );
}

function InViewBlock({
  index,
  onEnter,
  className,
  children,
}: {
  index: number;
  onEnter: (index: number) => void;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
  useEffect(() => {
    if (isInView) onEnter(index);
  }, [isInView, index, onEnter]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function ProjectImage({ image, alt }: { image: ImageData; alt?: string }) {
  if (!image?.assetPath) return null;

  const ratio = image.aspectRatio ?? 1;
  return (
    <Image
      src={image.assetPath}
      alt={alt ?? ""}
      width={1440}
      height={Math.round(1440 / ratio)}
      className="w-full h-auto"
    />
  );
}
