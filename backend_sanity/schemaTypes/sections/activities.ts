import {defineType, defineField} from 'sanity'
/*
title: string
description: string
 activities:{
 image: Image
    title: string
    description: string
    period: string
 }
*/

export const activitiesSection = defineType({
  name: 'activitiesSection',
  title: 'Activities Section',
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
      name: 'activities',
      title: 'Activities',
      type: 'array',
      of: [
        defineField({
          name: 'activity',
          title: 'Activity',
          type: 'object',
          fields: [
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
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
              name: 'period',
              title: 'Period',
              type: 'string',
            }),
          ],
        }),
      ],
    }),
  ],
})
