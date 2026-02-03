import {defineType, defineField} from 'sanity'

export const themeArticle = defineType({
  name: 'themeArticle',
  title: 'Article',
  type: 'document',
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
      of: [{type: 'themeSection'}],
    }),

    defineField({
      name: 'closing',
      title: 'Closing Paragraph',
      type: 'text',
    }),

    defineField({
      name: 'coreValues',
      title: 'Core Values',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
