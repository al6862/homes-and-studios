export const imageObject = {
  name: 'imageObject',
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
    { name: 'caption', type: 'string', title: 'Caption text' },
    {
      title: 'Align',
      name: 'align',
      type: 'string',
      options: {
        list: [
          { value: 'left', title: 'Left' },
          { value: 'center', title: 'Center' },
          { value: 'right', title: 'Right' },
        ],
      },
    },
    {
      title: 'Size',
      name: 'size',
      type: 'string',
      options: {
        list: [
          { value: 'full', title: 'Full' },
          { value: 'large', title: 'Large' },
          { value: 'medium', title: 'Medium' },
          { value: 'small', title: 'Small' },
        ],
      },
    },
  ],
};
