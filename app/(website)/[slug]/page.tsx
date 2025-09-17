import ViewA from "@/components/ViewA";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allArchitectureQuery, architectureQuery } from "@/sanity/lib/queries";

export default async function Page({ params } : { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [allArchitecture, archData] = await Promise.all([sanityFetch({query: allArchitectureQuery}), sanityFetch({query: architectureQuery, params: {slug}})]);

  return (
    <div>
      <ViewA allArchitecture={allArchitecture} slug={slug} archData={archData} />
    </div>
  );
}
