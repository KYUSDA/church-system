import {defineType, defineField} from 'sanity'
/*
    title: string
    description: string
    tag: string
    images:{
    url: string;
    altText: string;
    }
*/

export const imagesSection = defineType({
  name: 'imagesSection',
  title: 'Images Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
    }),
    defineField({
      name: 'tag',
      title: 'Tag',
      type: 'string',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineField({
          name: 'imageItem',
          title: 'Image Item',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'Image URL',
              type: 'string',
            }),
            defineField({
              name: 'altText',
              title: 'Alt Text',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
})
