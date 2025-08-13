import { defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: 'navList',
      title: 'Navigation',
      type: 'array',
      of: [
        {
          type: 'link',
          options: {
            enableText: true,
          },
        },
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: "Footer" }),
  },
});
