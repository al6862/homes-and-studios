export const simpleImageObject = {
  name: 'simpleImageObject',
  type: 'object',
  title: 'Image',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    },
    { name: 'alt', type: 'string', title: 'Alternative text' },
  ],
};
