import { DocumentIcon as icon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 150,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "desktopImage",
      title: "Desktop Image",
      description: "If no mobile image, desktop image used on mobile instead.",
      type: "simpleImageObject",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mobileImage",
      title: "Mobile Image",
      type: "simpleImageObject",
    }),
    defineField({
      name: 'content',
      type: 'array',
      title: 'Content',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [{ type: 'link' }],
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: "title",
    },

    prepare({ title }) {
      return { title };
    },
  },
});
