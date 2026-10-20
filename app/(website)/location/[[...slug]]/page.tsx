import ViewA from "@/components/ViewA";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allArchitectureQuery } from "@/sanity/lib/queries";

export default async function LocationPage() {
  const allArchitecture = await sanityFetch({ query: allArchitectureQuery });

  return (
    <ViewA
      allArchitecture={allArchitecture}
      groupBy="location"
      pathPrefix="/location"
    />
  );
}
