import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    /* Meta */
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
    }),

    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
    }),

    /* Open graph */
    defineField({
      name: "openGraphTitle",
      title: "OpenGraph Title",
      type: "string",
    }),

    defineField({
      name: "openGraphDescription",
      title: "OpenGraph Description",
      type: "text",
      rows: 2,
    }),

    defineField({
      name: "openGraphImage",
      title: "OpenGraph Image",
      type: "image",
      description: "Recommended size is 1200x630. No larger than 1mb.",
    }),
  ],
});
