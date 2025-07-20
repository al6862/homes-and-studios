"use client";
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/(sanity)/studio/[[...tool]]/page.tsx` route
 */
import { visionTool } from "@sanity/vision";
import { PluginOptions, defineConfig } from "sanity";
// import {
//   presentationTool,
//   defineDocuments,
//   defineLocations,
//   type DocumentLocation,
// } from "sanity/presentation";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import { singletonPlugin, structure } from "@/sanity/lib/structure";
import { schema } from "@/sanity/schemas";
import { linkField } from "sanity-plugin-link-field";
// import { resolveHref } from "@/sanity/lib/utils";

// const homeLocation = {
//   title: "Home",
//   href: "/",
// } satisfies DocumentLocation;

export default defineConfig({
  basePath: studioUrl,
  projectId,
  dataset,
  schema,
  plugins: [
    linkField({
      linkableSchemaTypes: ["page", "homepage"],
    }),
    // presentationTool({
    //   resolve: {
    //     mainDocuments: defineDocuments([
    //       {
    //         route: "/posts/:slug",
    //         filter: `_type == "post" && slug.current == $slug`,
    //       },
    //     ]),
    //     locations: {
    //       settings: defineLocations({
    //         locations: [homeLocation],
    //         message: "This document is used on all pages",
    //         tone: "caution",
    //       }),
    //       post: defineLocations({
    //         select: {
    //           title: "title",
    //           slug: "slug.current",
    //         },
    //         resolve: (doc) => ({
    //           locations: [
    //             {
    //               title: doc?.title || "Untitled",
    //               href: resolveHref("post", doc?.slug)!,
    //             },
    //             homeLocation,
    //           ],
    //         }),
    //       }),
    //     },
    //   },
    //   previewUrl: { previewMode: { enable: "/api/draft-mode/enable" } },
    // }),
    structureTool({ structure }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    process.env.NODE_ENV === "development" &&
      visionTool({ defaultApiVersion: apiVersion }),
  ].filter(Boolean) as PluginOptions[],
});
