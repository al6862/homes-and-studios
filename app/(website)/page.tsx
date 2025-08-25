import ViewA from "@/components/ViewA";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allArchitectureQuery } from "@/sanity/lib/queries";

export default async function Page() {

  const [allArchitecture] = await Promise.all([sanityFetch({query: allArchitectureQuery})]);

  return (
    <div>
      <ViewA allArchitecture={allArchitecture} />
    </div>
  );
}
