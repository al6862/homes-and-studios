import { defineType } from "sanity";

export const architecture = defineType({
  name: 'architecture',
  title: 'Architecture',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'visitLink',
      title: 'Visit Link',
      type: 'url',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'descriptionProt',
      title: 'Description',
      type: 'simplePortableText',
    },
    {
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [
        {
          type: 'image',
        },
      ],
    },
    {
      name: 'descriptionProt2',
      title: 'Description 2',
      type: 'simplePortableText',
    },
    {
      name: 'section2',
      type: 'array',
      title: 'Section 2',
      of: [
        {
          type: 'block',
          marks: {
            annotations: [{ type: 'link' }],
          },
        },
        {
          type: 'imageObject',
        },
        {
          type: 'imageGroup',
        },
      ],
    },
    {
      name: 'imageCourtesy',
      title: 'Image Courtesy of',
      type: 'array',
      of: [
        {
          name: 'imageCourtesy',
          type: 'object',
          title: 'Image Courtesy of',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            {
              name: 'url',
              type: 'url',
              title: 'URL',
            },
          ],
        },
      ],
    },
    {
      name: 'footerButton',
      type: 'callToAction',
      title: 'Footer Button',
    },
    {
      title: 'Meta Title',
      name: 'metaTitle',
      type: 'string',
      description: 'Title used for search engines and browsers',
      validation: (Rule) =>
        Rule.max(50).warning(
          'Longer titles may be truncated by search engines'
        ),
    },
    {
      title: 'Meta Description',
      name: 'metaDesc',
      type: 'text',
      rows: 3,
      description: 'Description for search engines',
      validation: (Rule) =>
        Rule.max(150).warning(
          'Longer descriptions may be truncated by search engines'
        ),
    },
  ],
  preview: {
    select: {
      title: 'title',
      // subtitle: 'location',
    },
  },
});
