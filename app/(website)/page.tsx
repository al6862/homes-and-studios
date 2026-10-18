// import ViewA from "@/components/ViewA";
import Views from "@/components/Views";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allArchitectureQuery, architectureQuery } from "@/sanity/lib/queries";

export default async function Page() {
  const allArchitecture = await sanityFetch({ query: allArchitectureQuery });
  const defaultProject = allArchitecture[0]
    ? await sanityFetch({
        query: architectureQuery,
        params: { slug: allArchitecture[0].slug },
      })
    : null;

  return (
    <Views allArchitecture={allArchitecture} defaultProject={defaultProject} />
  );
}
