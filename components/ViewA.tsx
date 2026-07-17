"use client"
import { AllArchitectureQueryResult, ArchitectureQueryResult } from "@/sanity.types";
import { client } from '@/sanity/lib/client';
import { architectureQuery } from "@/sanity/lib/queries";
import sanityLoader from "@/sanity/lib/sanityImageLoader";
import { AnimatePresence, motion } from "motion/react";
import { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CustomPortableText } from "./CustomPortableText";

export default function ViewA({ allArchitecture, slug, archData } : {allArchitecture: AllArchitectureQueryResult, slug?: string, archData?: ArchitectureQueryResult}) {
  const [activeSlug, setActiveSlug] = useState<string | undefined>(slug || undefined);
  const [activeData, setActiveData] = useState<ArchitectureQueryResult>(archData || null);
  const pathname = usePathname();
  const setNewData = async (slug: string) => {
    const archData = await client.fetch(architectureQuery, {slug});
    setActiveSlug(archData?.slug)
    setActiveData(archData);
    window.history.pushState({}, '', `/${archData?.slug}`)
  }

  const handleClick = async (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    if (event.currentTarget.dataset.slug && event.currentTarget.dataset.slug != activeSlug) {
      setNewData(event.currentTarget.dataset.slug);
    }
  }

  useEffect(() => {
    if (pathname == "/") {
      setActiveSlug(undefined);
      setActiveData(null);
    } else {
      const newSlug = pathname.split('/')[1]
      if (newSlug && newSlug != activeSlug) {
        setNewData(newSlug);
      }
    }
  }, [pathname])

  return (
    <div className="px-5 md:grid grid-cols-2 gap-5">
      <div className={`${activeSlug? `max-md:hidden` : ``} sticky bottom-0 self-start mt-auto max-md:mt-[0.8125rem]`}>
        {allArchitecture.map((architecture, i) => {
          const {title, slug, location} = architecture;
          const prevTitle = allArchitecture[i-1]?.title;
          return(
            <div key={i} className="group">
              {((title && i == 0) || (title && prevTitle && (title[0] != prevTitle[0]))) && 
                <div className="flex max-md:group-first:mt-0 mt-8 md:mt-5 after:content-[''] after:w-full after:border-b-[0.5px] after:border-dashed">
                  <p className="alphabet-break w-min">({title[0]})</p>
                </div>
              }
              <div className="flex justify-between mt-4 md:mt-2">
                {title && <p onClick={handleClick} data-slug={slug} className="title cursor-pointer">{title}</p>}
                {location && <p className="location text-gray">{location}</p>}
              </div>
            </div>
          )
        })}
      </div>
      <AnimatePresence>
        {activeData && 
          <motion.div
            key={activeData.slug}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {activeData.author && <p className="body">{activeData.author}</p>}
            {activeData.location && <p className="body mt-8 md:mt-5">{activeData.location}</p>}
            {activeData.descriptionProt && (
              <CustomPortableText className="body mt-8 md:mt-5" value={activeData.descriptionProt as PortableTextBlock[]} />
            )}
            {activeData.gallery && 
              activeData.gallery.map((image, i) => 
              image.assetPath &&
                <Image 
                  loader={sanityLoader}
                  key={i}
                  src={image.assetPath}
                  alt=""
                  width={1440}
                  height={1440}
                  className="mt-8 md:mt-[3.475rem]"
                />
              )
            }
            {activeData.section2 && (
              <CustomPortableText className="body mt-8 md:mt-5" value={activeData.section2 as PortableTextBlock[]} />
            )}
            {activeData.imageCourtesy && 
              <p className="text-gray italic body mt-5 [&>*:not(:last-child)]:after:content-[',\00a0']">Images Courtesy Of {activeData.imageCourtesy.map((source, i) => <span key={i}><a href={source.url}>{source.title}</a></span>)}</p>
            }
            {activeData.footerButton && 
              <p className="body mt-5"><a href={activeData.footerButton.url}>{activeData.footerButton.linkText}</a></p>
            }
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}