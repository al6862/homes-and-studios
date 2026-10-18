"use client";
import {
  AllArchitectureQueryResult,
} from "@/sanity.types";
import { client } from "@/sanity/lib/client";
import { architectureQuery } from "@/sanity/lib/queries";
import { AnimatePresence, motion } from "motion/react";
import { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useView } from "./view-context";
import { CustomPortableText } from "./CustomPortableText";

export default function ViewA({
  allArchitecture,
}: {
  allArchitecture: AllArchitectureQueryResult;
}) {
  const { activeProject, setActiveProject } = useView();
  const activeSlug = activeProject?.slug;

  const pathname = usePathname();
  const setNewData = async (slug: string) => {
    const archData = await client.fetch(architectureQuery, { slug });
    setActiveProject(archData);
    window.history.pushState({}, "", `/${archData?.slug}`);
  };

  const handleClick = async (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
  ) => {
    if (
      event.currentTarget.dataset.slug &&
      event.currentTarget.dataset.slug != activeSlug
    ) {
      setNewData(event.currentTarget.dataset.slug);
    }
  };

  useEffect(() => {
    if (pathname == "/") {
      setActiveProject(null);
    } else {
      const newSlug = pathname.split("/")[1];
      if (newSlug && newSlug != activeSlug) {
        setNewData(newSlug);
      }
    }
  }, [pathname]);

  return (
    <div className="px-5 md:grid grid-cols-2 gap-5">
      <div
        className={`${activeSlug ? `max-md:hidden` : ``} sticky bottom-0 self-start mt-auto max-md:mt-[0.8125rem]`}
      >
        {allArchitecture.map((architecture, i) => {
          const { title, slug, location } = architecture;
          const prevTitle = allArchitecture[i - 1]?.title;
          return (
            <div key={i} className="group">
              {((title && i == 0) ||
                (title && prevTitle && title[0] != prevTitle[0])) && (
                <div className="flex max-md:group-first:mt-0 mt-8 md:mt-5 after:content-[''] after:w-full after:border-b-[0.5px] after:border-dashed">
                  <p className="alphabet-break w-min">({title[0]})</p>
                </div>
              )}
              <div className="flex justify-between mt-4 md:mt-2">
                {title && (
                  <p
                    onClick={handleClick}
                    data-slug={slug}
                    className="title cursor-pointer"
                  >
                    {title}
                  </p>
                )}
                {location && <p className="location text-gray">{location}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {activeProject && (
          <motion.div
            key={activeProject.slug}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {activeProject.author && <p className="body">{activeProject.author}</p>}
            {activeProject.location && (
              <p className="body mt-8 md:mt-5">{activeProject.location}</p>
            )}
            {activeProject.descriptionProt && (
              <CustomPortableText
                className="body text-center mt-8 md:mt-5 space-y-8 md:space-y-5"
                value={activeProject.descriptionProt as PortableTextBlock[]}
              />
            )}
            {activeProject.gallery &&
              activeProject.gallery.map(
                (image, i) =>
                  image.assetPath && (
                    <Image
                      key={i}
                      src={image.assetPath}
                      alt=""
                      width={1440}
                      height={1440}
                      className="mt-8 md:mt-[3.475rem]"
                    />
                  ),
              )}
            {activeProject.section2 && (
              <CustomPortableText
                className="body text-center mt-8 md:mt-5 space-y-8 md:space-y-5"
                value={activeProject.section2 as PortableTextBlock[]}
              />
            )}
            {activeProject.imageCourtesy && (
              <p className="text-gray italic body mt-5 [&>*:not(:last-child)]:after:content-[',\00a0']">
                Images Courtesy Of{" "}
                {activeProject.imageCourtesy.map((source, i) => (
                  <span key={i}>
                    <a href={source.url}>{source.title}</a>
                  </span>
                ))}
              </p>
            )}
            {activeProject.footerButton && (
              <p className="body mt-5">
                <a href={activeProject.footerButton.url}>
                  {activeProject.footerButton.linkText}
                </a>
              </p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
