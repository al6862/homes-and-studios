import { CustomPortableText } from "@/components/CustomPortableText";
import Views from "@/components/Views";
import { sanityFetch } from "@/sanity/lib/fetch";
import {
  allArchitectureQuery,
  architectureQuery,
  pageQuery,
} from "@/sanity/lib/queries";
import { PortableTextBlock } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pageData = await sanityFetch({ query: pageQuery, params: { slug } });
  if (!pageData) {
    const [archData, allArchitecture] = await Promise.all([
      sanityFetch({ query: architectureQuery, params: { slug } }),
      sanityFetch({ query: allArchitectureQuery }),
    ]);

    if (!archData) notFound();

    return (
      <Views
        allArchitecture={allArchitecture}
        // slug={slug}
        archData={archData}
      />
    );
  }

  const { desktopImage, mobileImage, content } = pageData;

  return (
    <div className="md:px-5 md:flex md:gap-5">
      {desktopImage?.image?.assetPath && (
        <Image
          className={`md:w-[78%] object-cover${mobileImage?.image?.assetPath && " max-md:hidden"}`}
          src={desktopImage.image?.assetPath}
          alt={desktopImage.alt || ""}
          width={2200}
          height={2200}
        />
      )}
      {mobileImage?.image?.assetPath && (
        <Image
          className="md:hidden object-cover"
          src={mobileImage.image?.assetPath}
          alt={mobileImage.alt || ""}
          width={1536}
          height={1536}
        />
      )}
      {content && (
        <CustomPortableText
          className="body text-left space-y-8 max-md:p-5"
          value={content as PortableTextBlock[]}
        />
      )}
    </div>
  );
}
