export default function sanityLoader({
  src,
  width,
  quality,
}: {
  src: any;
  width: any;
  quality: any;
}) {
  const url = new URL(`https://cdn.sanity.io/${src}`);

  url.searchParams.set("auto", "format");
  url.searchParams.set("fit", "max");
  url.searchParams.set("w", width.toString());

  if (quality) {
    url.searchParams.set("q", quality.toString());
  }

  return url.href;
}
