import {defineType, defineField} from 'sanity'

export const themeSection = defineType({
  name: 'themeSection',
  title: 'Theme Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'points',
      title: 'Bullet Points',
      type: 'array',
      of: [
        defineField({
          name: 'point',
          type: 'string',
        }),
      ],
    }),
  ],
})
