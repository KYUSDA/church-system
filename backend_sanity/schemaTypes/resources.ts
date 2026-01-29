import {defineField, defineType} from 'sanity'

export const resources = defineType({
  name: 'resources',
  title: 'Resources',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),

    // RESOURCE CONTENT (file | video | url)
    defineField({
      name: 'resource',
      title: 'Resource',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Resource Type',
          type: 'string',
          options: {
            list: [
              {title: 'File', value: 'file'},
              {title: 'Video', value: 'video'},
              {title: 'External Link', value: 'url'},
            ],
            layout: 'radio',
          },
          validation: (Rule) => Rule.required(),
        }),

        defineField({
          name: 'file',
          title: 'File',
          type: 'file',
          hidden: ({parent}) => parent?.type !== 'file',
        }),

        defineField({
          name: 'videoUrl',
          title: 'Video URL',
          type: 'url',
          hidden: ({parent}) => parent?.type !== 'video',
        }),

        defineField({
          name: 'link',
          title: 'External URL',
          type: 'url',
          hidden: ({parent}) => parent?.type !== 'url',
        }),
      ],
    }),

    // RESOURCE IMAGE (upload | url)
    defineField({
      name: 'image',
      title: 'Resource Image',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Image Source',
          type: 'string',
          options: {
            list: [
              {title: 'Upload Image', value: 'file'},
              {title: 'Image URL', value: 'url'},
            ],
            layout: 'radio',
          },
          initialValue: 'file',
        }),

        defineField({
          name: 'file',
          title: 'Image File',
          type: 'image',
          options: {hotspot: true},
          hidden: ({parent}) => parent?.type !== 'file',
        }),

        defineField({
          name: 'url',
          title: 'Image URL',
          type: 'url',
          hidden: ({parent}) => parent?.type !== 'url',
        }),
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
