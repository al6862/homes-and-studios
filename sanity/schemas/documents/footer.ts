import { defineArrayMember, defineField, defineType } from "sanity";

export const footer = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "newsletterContent",
      title: "Newsletter Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Caption", value: "caption" }],
        }),
      ],
    }),

    defineField({
      name: "footerContent",
      title: "Footer Content",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [{ title: "Caption", value: "caption" }],
        }),
      ],
    }),
  ],

  preview: {
    prepare: () => ({ title: "Footer" }),
  },
});
