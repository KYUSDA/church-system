import {defineField, defineType} from 'sanity'

export const calendar = defineType({
  name: 'calendar',
  title: 'Calendar Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          {title: 'Once', value: 'once'},
          {title: 'Weekly', value: 'weekly'},
        ],
        layout: 'radio',
      },
      initialValue: 'once',
    }),

    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:MM',
      },
    }),

    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:MM',
      },
    }),

    // Used ONLY when eventType === "weekly"
    defineField({
      name: 'days',
      title: 'Days of the Week',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Sunday', value: 'sunday'},
          {title: 'Monday', value: 'monday'},
          {title: 'Tuesday', value: 'tuesday'},
          {title: 'Wednesday', value: 'wednesday'},
          {title: 'Thursday', value: 'thursday'},
          {title: 'Friday', value: 'friday'},
          {title: 'Saturday', value: 'saturday'},
        ],
      },
      hidden: ({parent}) => parent?.eventType !== 'weekly',
      validation: (Rule) =>
        Rule.custom((days, ctx) => {
          const parent = ctx.parent as {eventType?: string}
          return parent?.eventType === 'weekly' && (!days || days.length === 0)
            ? 'Select at least one day'
            : true
        }),
    }),

    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
    }),

    defineField({
      name: 'verses',
      title: 'Verses',
      type: 'array',
      of: [{type: 'string'}],
    }),

    defineField({
      name: 'hymn',
      title: 'Hymn',
      type: 'string',
    }),

    defineField({
      name: 'isHighWeek',
      title: 'Is High Week',
      type: 'boolean',
    }),

    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
})
