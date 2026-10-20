// import ViewA from "@/components/ViewA";
import Views from "@/components/Views";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allArchitectureQuery } from "@/sanity/lib/queries";

export default async function Page() {
  const [allArchitecture] = await Promise.all([
    sanityFetch({ query: allArchitectureQuery }),
  ]);

  return (
    <div>
      {/* <ViewA allArchitecture={allArchitecture} /> */}
      <Views allArchitecture={allArchitecture} />
    </div>
  );
}
