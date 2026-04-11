import {defineType, defineField} from 'sanity'
/*
    title: string
    videos: {
        url: string
        tag: string
    }
*/

export const videosSection = defineType({
  name: 'videosSection',
  title: 'Videos Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        defineField({
          name: 'video',
          title: 'Video',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'Video URL',
              type: 'string',
            }),
            defineField({
              name: 'tag',
              title: 'Tag',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
})
