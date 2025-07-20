import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";

import AlertBanner from "./alert-banner";

import { sanityFetch } from "sanity/lib/fetch";
import { siteSettingsQuery } from "sanity/lib/queries";

import type React from "react";


export async function generateMetadata(): Promise<Metadata> {
  const { SEO } =
    (await sanityFetch({
      query: siteSettingsQuery,
      // Metadata should never contain stega
      stega: false,
    })) || {};

  const title = SEO?.metaTitle || "Rhythm & Motion";
  const openGraphTitle = SEO?.openGraphTitle || "Rhythm & Motion";
  const description = SEO?.metaDescription || "";

  return {
    metadataBase: new URL("https://www.rhythmandmotion.com/"),
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description,
    openGraph: {
      title: {
        template: `%s | ${openGraphTitle}`,
        default: openGraphTitle,
      },
      description: SEO?.openGraphDescription,
      url: "https://www.rhythmandmotion.com/",
      siteName: title,
      images: [
        {
          url: SEO?.openGraphImage || "",
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <body>
      <main>
        <section className="min-h-screen">
          {isDraftMode && <AlertBanner />}
          {children}
        </section>
        {isDraftMode && <VisualEditing />}
        <SpeedInsights />
      </main>
    </body>
  );
}
