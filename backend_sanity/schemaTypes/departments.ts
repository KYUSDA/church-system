import {defineField, defineType} from 'sanity'

export const departments = defineType({
  name: 'departments',
  title: 'Departments',
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
      name: 'link',
      title: 'Link',
      type: 'string',
    }),
    defineField({
      name: 'imgUrl',
      title: 'ImageUrl',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [
        defineField({
          name: 'tag',
          title: 'Tag',
          type: 'string',
        }),
      ],
    }),
    // sections
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      validation: (Rule) => Rule.min(2).max(9), // Enforce 6-9 sections
      of: [
        {type: 'heroSection'},
        {type: 'aboutSection'},
        {type: 'servicesSection'},
        {type: 'activitiesSection'},
        {type: 'leadersSection'},
        {type: 'themeSection'},
        {type: 'eventsSection'},
        {type: 'resourcesSection'},
        {type: 'imagesSection'},
        {type: 'videosSection'},
        {type: 'productsSection'},
      ],
    }),
  ],
})

export default departments
