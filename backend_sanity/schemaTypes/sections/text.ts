import {defineType, defineField} from 'sanity'

export const themeArticle = defineType({
  name: 'themeArticle',
  title: 'Theme Article',
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

export const themesSection = defineType({
  name: 'themesSection',
  title: 'Themes Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'highlight',
      title: 'Highlighted Title Part',
      type: 'string',
      description: 'Optional highlighted text (blue part)',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
    }),

    defineField({
      name: 'readTime',
      title: 'Read Time',
      type: 'string',
      description: 'e.g. 5 min read',
    }),

    defineField({
      name: 'intro',
      title: 'Introduction',
      type: 'text',
    }),

    defineField({
      name: 'sections',
      title: 'Content Sections',
      type: 'array',
      of: [{type: 'themeArticle'}],
    }),

    defineField({
      name: 'closing',
      title: 'Closing Paragraph',
      type: 'text',
    }),
  ],
})
