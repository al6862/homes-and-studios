"use client"
import { AllArchitectureQueryResult, ArchitectureQueryResult } from "@/sanity.types";
import { client } from '@/sanity/lib/client';
import { architectureQuery } from "@/sanity/lib/queries";
import sanityLoader from "@/sanity/lib/sanityImageLoader";
import { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { useState } from "react";
import { CustomPortableText } from "./CustomPortableText";

export default function ViewA({ allArchitecture, slug, archData } : {allArchitecture: AllArchitectureQueryResult, slug?: string, archData?: ArchitectureQueryResult}) {
  const [activeSlug, setActiveSlug] = useState<string | undefined>(slug || undefined);
  const [activeData, setActiveData] = useState<ArchitectureQueryResult>(archData || null);

  const handleClick = async (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {
    if (event.currentTarget.dataset.slug != activeSlug) {
      const archData = await client.fetch(architectureQuery, {slug: event.currentTarget.dataset.slug});
      setActiveSlug(archData?.slug)
      setActiveData(archData);
      window.history.pushState({}, '', `/${archData?.slug}`)
    }
  }

  return (
    <div className="px-5 grid grid-cols-2 gap-5">
      <div className="sticky bottom-0 self-start mt-auto">
        {allArchitecture.map((architecture, i) => {
          const {title, slug, location} = architecture;
          const prevTitle = allArchitecture[i-1]?.title;
          return(
            <div key={i}>
              {((title && i == 0) || (title && prevTitle && (title[0] != prevTitle[0]))) && 
                <div className="flex mt-5 after:content-[''] after:w-full after:border-b-[0.5px] after:border-dashed">
                  <p className="alphabet-break w-min">({title[0]})</p>
                </div>
              }
              <div className="flex justify-between mt-2">
                {title && <p onClick={handleClick} data-slug={slug} className="title cursor-pointer">{title}</p>}
                {location && <p className="location text-gray">{location}</p>}
              </div>
            </div>
          )
        })}
      </div>
      {activeData && 
        <div>
          {activeData.author && <p className="body">{activeData.author}</p>}
          {activeData.location && <p className="body mt-5">{activeData.location}</p>}
          {activeData.descriptionProt && (
            <CustomPortableText className="body mt-5" value={activeData.descriptionProt as PortableTextBlock[]} />
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
                className="mt-[3.475rem]"
              />
            )
          }
          {activeData.section2 && (
            <CustomPortableText className="body mt-5" value={activeData.section2 as PortableTextBlock[]} />
          )}
          {activeData.imageCourtesy && 
            <p className="body mt-5 [&>*:not(:last-child)]:after:content-[',\00a0']">Images Courtesy Of {activeData.imageCourtesy.map((source, i) => <span key={i}><a href={source.url}>{source.title}</a></span>)}</p>
          }
          {activeData.footerButton && 
            <p className="body mt-5"><a href={activeData.footerButton.url}>{activeData.footerButton.linkText}</a></p>
          }
        </div>
      }
    </div>
  )
}