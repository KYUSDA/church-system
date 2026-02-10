import {defineField, defineType} from 'sanity'
import {ArrayOfObjectsInputProps} from 'sanity'

interface SectionSchema {
  name: string
  [key: string]: any
}

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
      validation: (Rule) => Rule.min(2).max(9),
      of: [
        {type: 'heroSection'},
        {type: 'aboutSection'},
        {type: 'servicesSection'},
        {type: 'activitiesSection'},
        {type: 'leadersSection'},
        {type: 'themesSection'},
        {type: 'eventsSection'},
        {type: 'resourcesSection'},
        {type: 'imagesSection'},
        {type: 'videosSection'},
        {type: 'productsSection'},
      ],
      components: {
        input: (props: ArrayOfObjectsInputProps) => {
          const existingSectionTypes = props.value?.map((section: any) => section._type) || []

          // Filter out section types that are already added
          const availableSections = props.schemaType.of.filter(
            (schema: SectionSchema) => !existingSectionTypes.includes(schema.name),
          )

          return props.renderDefault({
            ...props,
            schemaType: {
              ...props.schemaType,
              of: availableSections,
            },
          })
        },
      },
    }),
  ],
})

export default departments
