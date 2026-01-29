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

    // Used ONLY when eventType === "once"
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      hidden: ({parent}) => parent?.eventType !== 'once',
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
      name: 'time',
      title: 'Time',
      type: 'string',
      description: '24h format (HH:MM)',
      validation: (Rule) => Rule.regex(/^([01]\d|2[0-3]):([0-5]\d)$/),
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
