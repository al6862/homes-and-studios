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
import { useEffect, useState } from "react";
import { useView } from "./view-context";
import { CustomPortableText } from "./CustomPortableText";
import { isMobile, useOpenInViewC } from "./useOpenInViewC";

type Architecture = AllArchitectureQueryResult[number];

// "Nyack, New York, USA" -> "USA"
const getCountry = (location: string) =>
  location.split(",").pop()?.trim() ?? "";

export default function ViewA({
  allArchitecture,
  groupBy = "title",
  pathPrefix = "",
}: {
  allArchitecture: AllArchitectureQueryResult;
  groupBy?: "title" | "location";
  pathPrefix?: string;
}) {
  const { activeProject, setActiveProject } = useView();
  const activeSlug = activeProject?.slug;
  const pathname = usePathname();
  const collapsible = groupBy === "location";

  const getGroup = (architecture: Architecture) =>
    groupBy === "location"
      ? getCountry(architecture.location)
      : (architecture.title?.[0] ?? "");

  const sorted =
    groupBy === "location"
      ? [...allArchitecture].sort(
          (a, b) =>
            getCountry(a.location).localeCompare(getCountry(b.location)) ||
            (a.title ?? "").localeCompare(b.title ?? ""),
        )
      : allArchitecture;

  const groups: { name: string; projects: Architecture[] }[] = [];
  for (const architecture of sorted) {
    const name = getGroup(architecture);
    const last = groups[groups.length - 1];
    if (last?.name === name) last.projects.push(architecture);
    else groups.push({ name, projects: [architecture] });
  }

  const [openGroups, setOpenGroups] = useState<string[]>(
    groups[0] ? [groups[0].name] : [],
  );

  const toggleGroup = (name: string) =>
    setOpenGroups((open) =>
      open.includes(name) ? open.filter((n) => n !== name) : [...open, name],
    );

  const selectProject = async (slug: string, updateUrl: boolean) => {
    const archData = await client.fetch(architectureQuery, { slug });
    if (!archData) return;
    setActiveProject(archData);
    if (updateUrl) {
      window.history.pushState({}, "", `${pathPrefix}/${archData.slug}`);
    }
  };

  const openInViewC = useOpenInViewC();

  const handleClick = (
    event: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
  ) => {
    const slug = event.currentTarget.dataset.slug;
    if (!slug) return;
    // On mobile, projects open in View C instead of the detail column.
    if (isMobile()) {
      openInViewC(slug);
      return;
    }
    if (slug != activeSlug) selectProject(slug, true);
  };

  useEffect(() => {
    const newSlug = pathname.slice(pathPrefix.length).split("/")[1];
    if (!newSlug) {
      setActiveProject(null);
    } else if (isMobile() && pathPrefix) {
      // A Location project link opened directly on mobile goes to View C.
      openInViewC(newSlug, { replace: true });
    } else if (newSlug != activeSlug) {
      selectProject(newSlug, false);
    }
  }, [pathname]);

  return (
    <div className="px-5 md:grid grid-cols-2 gap-5">
      <div
        className={`self-start max-md:mt-[0.8125rem] ${collapsible ? "" : "sticky bottom-0 mt-auto"}`}
      >
        {groups.map((group) => {
          const isOpen = !collapsible || openGroups.includes(group.name);
          return (
            <div key={group.name} className="group">
              <div
                onClick={collapsible ? () => toggleGroup(group.name) : undefined}
                className={`flex max-md:group-first:mt-0 mt-8 md:mt-5 after:content-[''] after:w-full after:border-b-[0.5px] after:border-dashed ${collapsible ? "cursor-pointer" : ""}`}
              >
                <p className="alphabet-break whitespace-nowrap">
                  ({group.name})
                </p>
              </div>
              {isOpen &&
                group.projects.map(({ title, slug, location }) => (
                  <div key={slug} className="flex justify-between mt-4 md:mt-2">
                    {title && (
                      <p
                        onClick={handleClick}
                        data-slug={slug}
                        className="title cursor-pointer"
                        style={{
                          fontWeight: slug === activeSlug ? 500 : undefined,
                        }}
                      >
                        {title}
                      </p>
                    )}
                    {location && (
                      <p className="location text-gray">{location}</p>
                    )}
                  </div>
                ))}
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {activeProject && (
          <motion.div
            key={activeProject.slug}
            className="max-md:hidden"
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
